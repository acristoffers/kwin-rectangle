function screenSize() {
  return workspace.clientArea(
    KWin.PlacementArea,
    workspace.activeScreen,
    workspace.currentDesktop
  )
}

function paddings() {
  return {
    inner: readConfig('InnerPadding', 8),
    outer: readConfig('OuterPadding', 8),
  }
}

function geometryForGrid(index, rowSpan, colSpan, rows, cols) {
  if (index >= rows * cols || index < 0) {
    return workspace.activeClient.geometry
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
    x: Math.round((screen.width - geometry.width) / 2),
    y: Math.round((screen.height - geometry.height) / 2),
  }
}

function manage(index, rs, cs, r, c) {
  /*
   * Index is the zero-index of the square in the grid.
   * For example, if index=2, r=2, c=2, then
   * you get the first column and second row:
   * |--0--|--1--|
   * |##2##|--3--|
   * Negative indexes have special meanings:
   * -1: Just center the window
   * -2: Resize and center
   * -3: Maximize window's width
   * -4: Maximize window's height
   * -5: Move window in rs,cs direction
   * -6: Stretch (resizes to make window touch screen side)
   * -7: Increases window span (rs and cs)
   */
  if (!workspace.activeClient.normalWindow && !workspace.activeClient.utility) {
    return
  }

  saveGeometry(workspace.activeClient)

  // The object that comes from workspace.activeClient.geometry is weird and
  // won't update the size in many cases. It's better to create a new one so
  // KWin can detect the changes properly
  let geometry = {
    width: workspace.activeClient.geometry.width,
    height: workspace.activeClient.geometry.height,
    x: workspace.activeClient.geometry.x,
    y: workspace.activeClient.geometry.y,
  }

  if (index >= 0) {
    geometry = geometryForGrid(index, rs, cs, r, c)
  } else if (index == -1) {
    geometry = center(geometry)
  } else if (index == -2) {
    geometry = geometryForGrid(1, rs, cs, r, c)
    geometry = center(geometry)
    workspace.activeClient.rectangleArgs = [0, rs, cs, r, c]
  } else if (index == -3) {
    const full = geometryForGrid(0, 1, 1, 1, 1)
    geometry.x = full.x
    geometry.width = full.width
  } else if (index == -4) {
    const full = geometryForGrid(0, 1, 1, 1, 1)
    geometry.y = full.y
    geometry.height = full.height
  } else if (index == -5 && workspace.activeClient.rectangleArgs != null) {
    ;[idx, prs, pcs, pr, pc] = workspace.activeClient.rectangleArgs
    let j = idx % pc
    let i = (idx - j) / pc
    j = Math.min(pc - pcs, Math.max(0, j + rs))
    i = Math.min(pr - prs, Math.max(0, i + cs))
    idx = i * pc + j
    geometry = geometryForGrid(idx, prs, pcs, pr, pc)
    workspace.activeClient.rectangleArgs = [idx, prs, pcs, pr, pc]
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
  } else if (index == -7 && workspace.activeClient.rectangleArgs != null) {
    ;[idx, prs, pcs, pr, pc] = workspace.activeClient.rectangleArgs
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
    workspace.activeClient.rectangleArgs = [idx, prs, pcs, pr, pc]
  }

  if (index >= 0) {
    workspace.activeClient.rectangleArgs = [index, rs, cs, r, c]
  }

  workspace.activeClient.setMaximize(false, false)
  workspace.activeClient.geometry = geometry
}

function saveGeometry(client) {
  const geometry = {
    width: client.geometry.width,
    height: client.geometry.height,
  }
  client.clientStepUserMovedResized.connect(restoreGeometry)
  client.prev_geometry = geometry
  client.snapped = true
}

function restoreGeometry(client) {
  if (!client.snapped || !client.prev_geometry) {
    return
  }

  client.geometry = client.prev_geometry

  delete client.prev_geometry
  delete client.snapped

  client.clientStepUserMovedResized.disconnect(restoreGeometry)
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
