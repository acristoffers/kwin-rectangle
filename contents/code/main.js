let windowProperties = {};

function screenSize() {
    let workarea = workspace.clientArea(
        KWin.PlacementArea,
        workspace.activeWindow,
    )
    const ms = margins();
    workarea.x += ms.left;
    workarea.y += ms.top;
    workarea.width -= ms.left + ms.right;
    workarea.height -= ms.top + ms.bottom;
    return workarea;
}

function paddings() {
    return {
        inner: readConfig('InnerPadding', 8),
        outer: readConfig('OuterPadding', 8),
    }
}

function margins() {
    return {
        left: readConfig('MarginLeft', 0),
        top: readConfig('MarginTop', 0),
        right: readConfig('MarginRight', 0),
        bottom: readConfig('MarginBottom', 0),
    }
}

function geometryForGrid(index, rowSpan, colSpan, rows, cols) {
    if (index >= rows * cols || index < 0) {
        return workspace.activeWindow.frameGeometry
    }

    const screen = screenSize()
    const pad = paddings()

    const availW = screen.width - (cols - 1) * pad.inner - 2 * pad.outer
    const availH = screen.height - (rows - 1) * pad.inner - 2 * pad.outer
    const singleWinW = availW / cols
    const singleWinH = availH / rows
    const winW = colSpan * singleWinW + (colSpan - 1) * pad.inner
    const winH = rowSpan * singleWinH + (rowSpan - 1) * pad.inner

    const winJ = index % cols
    const winI = (index - winJ) / cols
    const winX = screen.x + pad.outer + winJ * (singleWinW + pad.inner)
    const winY = screen.y + pad.outer + winI * (singleWinH + pad.inner)

    return {
        width: Math.round(winW),
        height: Math.round(winH),
        x: Math.round(winX),
        y: Math.round(winY),
    }
}

function center(geometry) {
    const screen = screenSize()
    return {
        width: geometry.width,
        height: geometry.height,
        x: screen.x + Math.round((screen.width - geometry.width) / 2),
        y: screen.y + Math.round((screen.height - geometry.height) / 2),
    }
}

/* 
 * - rs and cs are row and col span, how many cells in the grid will be
 * taken by the window.
 * - r and c are the size of the grid.
 * - Index is the zero-index of the square in the grid.
 * For example, if index=2, rs=1, cs=1, r=2, c=2, then
 * you get the first column and second row:
 * |--0--|--1--|
 * |##2##|--3--|
 * If index=2, rs=1, cs=2, r=2, c=2, then
 * you get the first column and second row and will occupy two cells:
 * |--0--|--1--|
 * |##2##|##3##|
 * Negative indexes have special meanings:
 * -1: Just center the window
 * -2: Resize and center
 * -3: Maximize window's width
 * -4: Maximize window's height
 * -5: Move window in rs,cs direction
 * -6: Stretch (resizes to make window touch screen side)
 * -7: Increases window span (rs and cs)
 */
function manage(index, rs, cs, r, c) {
    // Do not modify the geometry of a desktop window. It probably needs to
    // be fullscreen to display desktop wallpaper and icons.
    if (workspace.activeWindow.desktopWindow) {
        return;
    }

    // KWin 6.0 changed the way that change signals work, so we need to grab a copy
    // of the geometry and save it after snapping rather than before like we used to.
    const prevGeometry = {
        width: workspace.activeWindow.frameGeometry.width,
        height: workspace.activeWindow.frameGeometry.height,
    }

    // The object that comes from workspace.activeWindow.frameGeometry is weird and
    // won't update the size in many cases. It's better to create a new one so
    // KWin can detect the changes properly
    let geometry = {
        width: workspace.activeWindow.frameGeometry.width,
        height: workspace.activeWindow.frameGeometry.height,
        x: workspace.activeWindow.frameGeometry.x,
        y: workspace.activeWindow.frameGeometry.y,
    }

    let rectangleArgs = windowProperties?.[workspace.activeWindow.internalId]?.args

    if (index >= 0) {
        geometry = geometryForGrid(index, rs, cs, r, c)
    } else if (index == -1) {
        geometry = center(geometry)
    } else if (index == -2) {
        geometry = geometryForGrid(1, rs, cs, r, c)
        geometry = center(geometry)
        rectangleArgs = [0, rs, cs, r, c]
    } else if (index == -3) {
        const full = geometryForGrid(0, 1, 1, 1, 1)
        geometry.x = full.x
        geometry.width = full.width
    } else if (index == -4) {
        const full = geometryForGrid(0, 1, 1, 1, 1)
        geometry.y = full.y
        geometry.height = full.height
    } else if (index == -5 && rectangleArgs != null) {
        ;[idx, prs, pcs, pr, pc] = rectangleArgs
        let j = idx % pc
        let i = (idx - j) / pc
        j = Math.min(pc - pcs, Math.max(0, j + rs))
        i = Math.min(pr - prs, Math.max(0, i + cs))
        idx = i * pc + j
        geometry = geometryForGrid(idx, prs, pcs, pr, pc)
        rectangleArgs = [idx, prs, pcs, pr, pc]
    } else if (index == -6) {
        const screen = screenSize()
        const pad = paddings()
        switch (rs) {
            case 0:
                geometry.height += geometry.y - pad.outer
                geometry.y = pad.outer
                break
            case 1:
                geometry.height = screen.height - pad.outer - geometry.y
                break
            case 2:
                geometry.width += geometry.x - pad.outer
                geometry.x = pad.outer
                break
            case 3:
                geometry.width = screen.width - pad.outer - geometry.x
                break
        }
    } else if (index == -7 && rectangleArgs != null) {
        ;[idx, prs, pcs, pr, pc] = rectangleArgs
        let j = idx % pc
        let i = (idx - j) / pc
        let newj = Math.min(pc - pcs, Math.max(0, j + rs))
        let newi = Math.min(pr - prs, Math.max(0, i + cs))
        // Adds colum/row if necessary
        pcs += j != newj ? 1 : 0
        prs += i != newi ? 1 : 0
        // Moves only if newi/newj is smaller (only towards top-left)
        newj = j < newj ? j : newj
        newi = i < newi ? i : newi
        idx = newi * pc + newj
        geometry = geometryForGrid(idx, prs, pcs, pr, pc)
        rectangleArgs = [idx, prs, pcs, pr, pc]
    }

    if (index >= 0) {
        rectangleArgs = [index, rs, cs, r, c]
    }

    workspace.activeWindow.setMaximize(false, false)
    workspace.activeWindow.frameGeometry = geometry

    saveGeometry(workspace.activeWindow, geometry, prevGeometry, rectangleArgs)
}

function saveGeometry(client, newGeometry, prevGeometry, rectangleArgs) {
    client.frameGeometryChanged.connect((geo) => restoreGeometry(client, geo))

    if (typeof windowProperties[client.internalId] !== 'object') {
        windowProperties[client.internalId] = {}
    }

    if (!windowProperties[client.internalId].snapped) {
        windowProperties[client.internalId].prev_geometry = prevGeometry
    }

    windowProperties[client.internalId].snapped_geometry = newGeometry
    windowProperties[client.internalId].snapped = true

    if (rectangleArgs) {
        windowProperties[workspace.activeWindow.internalId].args = rectangleArgs
    }
}

function restoreGeometry(client, geo) {
    props = windowProperties[client.internalId]
    if (!props || !props.snapped || !props.prev_geometry || !props.snapped_geometry) {
        return
    }

    // the frameGeometryChanged signal is not fired immediately after the frameGeometry is set
    if (props.prev_geometry.width == geo.width && props.prev_geometry.height == geo.height) {
        return
    }

    // we don't want to delete the properties if the window is resnapped
    if (
        props.snapped_geometry.width == client.frameGeometry.width &&
        props.snapped_geometry.height == client.frameGeometry.height &&
        props.snapped_geometry.x == client.frameGeometry.x &&
        props.snapped_geometry.y == client.frameGeometry.y
    ) {
        return
    }

    if (geo.width == client.frameGeometry.width && geo.height == client.frameGeometry.height) {
        const geometry = {
            width: props.prev_geometry.width,
            height: props.prev_geometry.height,
            x: client.frameGeometry.x,
            y: client.frameGeometry.y,
        }

        client.setMaximize(false, false)
        client.frameGeometry = geometry
    }

    delete windowProperties[client.internalId]

    client.frameGeometryChanged.disconnect(restoreGeometry)
}

function shortcut(text, shortcut, i, rs, cs, r, c) {
    text = 'Rectangle: ' + text
    shortcut = 'Ctrl+Meta+' + shortcut
    registerShortcut(text, text, shortcut, () => manage(i, rs, cs, r, c))
}

shortcut('Quarter: (1) Top Left', 'U', 0, 1, 1, 2, 2)
shortcut('Quarter: (2) Top Right', 'I', 1, 1, 1, 2, 2)
shortcut('Quarter: (3) Bottom Left', 'J', 2, 1, 1, 2, 2)
shortcut('Quarter: (4) Bottom Right', 'K', 3, 1, 1, 2, 2)
shortcut('Quarter: (5) Centered', 'Alt+C', -2, 1, 1, 2, 2)

shortcut('Fourth: (1) First', 'V', 0, 1, 1, 1, 4)
shortcut('Fourth: (2) Second', 'B', 1, 1, 1, 1, 4)
shortcut('Fourth: (3) Third', 'N', 2, 1, 1, 1, 4)
shortcut('Fourth: (4) Fourth', 'M', 3, 1, 1, 1, 4)

shortcut('Three Fourths: (1) Left', 'Shift+N', 0, 1, 3, 1, 4)
shortcut('Three Fourths: (2) Right', 'Shift+M', 1, 1, 3, 1, 4)

shortcut('Third: (1) First', 'D', 0, 1, 1, 1, 3)
shortcut('Third: (2) Second', 'F', 1, 1, 1, 1, 3)
shortcut('Third: (3) Third', 'G', 2, 1, 1, 1, 3)

shortcut('Sixth: (1) Top Left', 'Shift+U', 0, 1, 1, 2, 3)
shortcut('Sixth: (2) Top Center', 'Shift+I', 1, 1, 1, 2, 3)
shortcut('Sixth: (3) Top Right', 'Shift+O', 2, 1, 1, 2, 3)
shortcut('Sixth: (4) Bottom Left', 'Shift+J', 3, 1, 1, 2, 3)
shortcut('Sixth: (5) Bottom Center', 'Shift+K', 4, 1, 1, 2, 3)
shortcut('Sixth: (6) Bottom Right', 'Shift+L', 5, 1, 1, 2, 3)

shortcut('Ninth: (1) Top Left', 'Alt+U', 0, 1, 1, 3, 3)
shortcut('Ninth: (2) Top Center', 'Alt+I', 1, 1, 1, 3, 3)
shortcut('Ninth: (3) Top Right', 'Alt+O', 2, 1, 1, 3, 3)
shortcut('Ninth: (4) Middle Left', 'Alt+J', 3, 1, 1, 3, 3)
shortcut('Ninth: (5) Middle Center', 'Alt+K', 4, 1, 1, 3, 3)
shortcut('Ninth: (6) Middle Right', 'Alt+L', 5, 1, 1, 3, 3)
shortcut('Ninth: (7) Bottom Left', 'Alt+N', 6, 1, 1, 3, 3)
shortcut('Ninth: (8) Bottom Center', 'Alt+M', 7, 1, 1, 3, 3)
shortcut('Ninth: (9) Bottom Right', 'Alt+,', 8, 1, 1, 3, 3)

shortcut('Half: (1) Center (Vertical)', 'Shift+C', -2, 1, 1, 1, 2)
shortcut('Half: (1) Center (Horizontal)', 'Shift+V', -2, 1, 1, 2, 1)
shortcut('Half: (2) Left', 'Left', 0, 1, 1, 1, 2)
shortcut('Half: (2) Right', 'Right', 1, 1, 1, 1, 2)
shortcut('Half: (3) Top', 'Up', 0, 1, 1, 2, 1)
shortcut('Half: (3) Bottom', 'Down', 1, 1, 1, 2, 1)

shortcut('Two Thirds: (1) Left', 'E', 0, 1, 2, 1, 3)
shortcut('Two Thirds: (2) Center', 'R', -2, 1, 2, 1, 3)
shortcut('Two Thirds: (3) Right', 'T', 1, 1, 2, 1, 3)

shortcut('Center', 'C', -1, 1, 1, 1, 1)
shortcut('Maximize', 'Return', 0, 1, 1, 1, 1)
shortcut('Maximize: Almost', 'Shift+Return', 33, 30, 30, 32, 32)
shortcut('Maximize: Height', 'Shift+Alt+Up', -4, 0, 0, 0, 0)
shortcut('Maximize: Width', 'Shift+Alt+Right', -3, 0, 0, 0, 0)

shortcut('Stretch: (1) Top', 'Alt+Up', -6, 0, 0, 0, 0)
shortcut('Stretch: (1) Bottom', 'Alt+Down', -6, 1, 0, 0, 0)
shortcut('Stretch: (2) Left', 'Alt+Left', -6, 2, 0, 0, 0)
shortcut('Stretch: (2) Right', 'Alt+Right', -6, 3, 0, 0, 0)
shortcut('Stretch: Step: (1) Bottom Left', '1', -7, -1, 1, 1, 1)
shortcut('Stretch: Step: (2) Bottom', '2', -7, 0, 1, 1, 1)
shortcut('Stretch: Step: (3) Bottom Right', '3', -7, 1, 1, 1, 1)
shortcut('Stretch: Step: (4) Left', '4', -7, -1, 0, 1, 1)
shortcut('Stretch: Step: (5) Right', '6', -7, 1, 0, 1, 1)
shortcut('Stretch: Step: (6) Top Left', '7', -7, -1, -1, 1, 1)
shortcut('Stretch: Step: (7) Top', '8', -7, 0, -1, 1, 1)
shortcut('Stretch: Step: (8) Top Right', '9', -7, 1, -1, 1, 1)

shortcut('Move: (1) Bottom Left', 'Alt+1', -5, -1, 1, 1, 1)
shortcut('Move: (2) Bottom', 'Alt+2', -5, 0, 1, 1, 1)
shortcut('Move: (3) Bottom Right', 'Alt+3', -5, 1, 1, 1, 1)
shortcut('Move: (4) Left', 'Alt+4', -5, -1, 0, 1, 1)
shortcut('Move: (5) Right', 'Alt+6', -5, 1, 0, 1, 1)
shortcut('Move: (6) Top Left', 'Alt+7', -5, -1, -1, 1, 1)
shortcut('Move: (7) Top', 'Alt+8', -5, 0, -1, 1, 1)
shortcut('Move: (8) Top Right', 'Alt+9', -5, 1, -1, 1, 1)
