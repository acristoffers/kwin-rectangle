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
  } else if (index == -2) {
    geometry = geometryForGrid(1, rs, cs, r, c)
  } else if (index == -3) {
    const full = geometryForGrid(0, 1, 1, 1, 1)
    geometry.x = full.x
    geometry.width = full.width
  } else if (index == -4) {
    const full = geometryForGrid(0, 1, 1, 1, 1)
    geometry.y = full.y
    geometry.height = full.height
  } else if (index == -5) {
    if (workspace.activeClient.rectangleArgs != null) {
      ;[index, prs, pcs, pr, pc] = workspace.activeClient.rectangleArgs
      let j = index % pc
      let i = (index - j) / pc
      j = Math.min(pc - pcs, Math.max(0, j + rs))
      i = Math.min(pr - prs, Math.max(0, i + cs))
      index = i * pc + j
      geometry = geometryForGrid(index, prs, pcs, pr, pc)
      workspace.activeClient.rectangleArgs = [index, prs, pcs, pr, pc]
      index = -5
    }
  }

  if (index == -1 || index == -2) {
    geometry = center(geometry)
  }

  if (index != -5) {
    workspace.activeClient.rectangleArgs = [index, rs, cs, r, c]
  }

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

shortcut('Quarter: Top Left', 'U', 0, 1, 1, 2, 2)
shortcut('Quarter: Top Right', 'I', 1, 1, 1, 2, 2)
shortcut('Quarter: Bottom Left', 'J', 2, 1, 1, 2, 2)
shortcut('Quarter: Bottom Right', 'K', 3, 1, 1, 2, 2)

shortcut('Fourth: First', 'V', 0, 1, 1, 1, 4)
shortcut('Fourth: Second', 'B', 1, 1, 1, 1, 4)
shortcut('Fourth: Third', 'N', 2, 1, 1, 1, 4)
shortcut('Fourth: Fourth', 'M', 3, 1, 1, 1, 4)

shortcut('Thirds: First', 'D', 0, 1, 1, 1, 3)
shortcut('Thirds: Second', 'F', 1, 1, 1, 1, 3)
shortcut('Thirds: Third', 'G', 2, 1, 1, 1, 3)

shortcut('Sixth: Top Left', 'Shift+U', 0, 1, 1, 2, 3)
shortcut('Sixth: Top Center', 'Shift+I', 1, 1, 1, 2, 3)
shortcut('Sixth: Top Right', 'Shift+O', 2, 1, 1, 2, 3)
shortcut('Sixth: Bottom Left', 'Shift+J', 3, 1, 1, 2, 3)
shortcut('Sixth: Bottom Center', 'Shift+K', 4, 1, 1, 2, 3)
shortcut('Sixth: Bottom Right', 'Shift+L', 5, 1, 1, 2, 3)

shortcut('Ninth: Top Left', 'Alt+U', 0, 1, 1, 3, 3)
shortcut('Ninth: Top Center', 'Alt+I', 1, 1, 1, 3, 3)
shortcut('Ninth: Top Right', 'Alt+O', 2, 1, 1, 3, 3)
shortcut('Ninth: Middle Left', 'Alt+J', 3, 1, 1, 3, 3)
shortcut('Ninth: Middle Center', 'Alt+K', 4, 1, 1, 3, 3)
shortcut('Ninth: Middle Right', 'Alt+L', 5, 1, 1, 3, 3)
shortcut('Ninth: Bottom Left', 'Alt+N', 6, 1, 1, 3, 3)
shortcut('Ninth: Bottom Center', 'Alt+M', 7, 1, 1, 3, 3)
shortcut('Ninth: Bottom Right', 'Alt+,', 8, 1, 1, 3, 3)

shortcut('Halves: Center (Vertical)', 'Shift+C', -2, 1, 1, 1, 2)
shortcut('Halves: Center (Horizontal)', 'Shift+V', -2, 1, 1, 2, 1)
shortcut('Halves: Left', 'Left', 0, 1, 1, 1, 2)
shortcut('Halves: Right', 'Right', 1, 1, 1, 1, 2)
shortcut('Halves: Top', 'Up', 0, 1, 1, 2, 1)
shortcut('Halves: Bottom', 'Down', 1, 1, 1, 2, 1)

shortcut('Two Thirds: First', 'E', 0, 1, 2, 1, 3)
shortcut('Two Thirds: Second', 'T', 1, 1, 2, 1, 3)
shortcut('Two Thirds: Center', 'R', -2, 1, 2, 1, 3)

shortcut('Center', 'C', -1, 1, 1, 1, 1)
shortcut('Maximized', 'Return', 0, 1, 1, 1, 1)
shortcut('Centered Quarter', 'Alt+C', -2, 1, 1, 2, 2)
shortcut('Almost Maximized', 'Shift+Return', 33, 30, 30, 32, 32)

shortcut('Maximize Height', 'Shift+Alt+Up', -4, 0, 0, 0, 0)
shortcut('Maximize Width', 'Shift+Alt+Right', -3, 0, 0, 0, 0)

shortcut('Move: Left', 'Alt+4', -5, -1, 0, 1, 1)
shortcut('Move: Right', 'Alt+6', -5, 1, 0, 1, 1)
shortcut('Move: Top', 'Alt+8', -5, 0, -1, 1, 1)
shortcut('Move: Bottom', 'Alt+2', -5, 0, 1, 1, 1)
shortcut('Move: Top Left', 'Alt+7', -5, -1, -1, 1, 1)
shortcut('Move: Top Right', 'Alt+9', -5, 1, -1, 1, 1)
shortcut('Move: Bottom Left', 'Alt+1', -5, -1, 1, 1, 1)
shortcut('Move: Bottom Right', 'Alt+3', -5, 1, 1, 1, 1)
