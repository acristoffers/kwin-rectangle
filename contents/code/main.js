const divisions = {
  FOURTHS: {
    NW: 1,
    NE: 2,
    SW: 3,
    SE: 4,
    FIRST: 30,
    SECOND: 31,
    THIRD: 32,
    FOURTH: 34,
  },
  THIRDS: {
    LEFT: 5,
    CENTER: 6,
    RIGHT: 7,
    TWO_LEFT: 8,
    TWO_RIGHT: 9,
  },
  SIXTHS: {
    NW: 10,
    N: 11,
    NE: 12,
    SW: 13,
    S: 14,
    SE: 15,
  },
  HALVES: {
    LEFT: 16,
    CENTER: 17,
    RIGHT: 18,
    TOP: 22,
    BOTTOM: 23,
  },
  CENTER: 19,
  MAX: {
    ALL: 20,
    HEIGHT: 24,
    WIDTH: 25,
  },
  MOVE: {
    LEFT: 26,
    TOP: 27,
    RIGHT: 28,
    BOTTOM: 29,
  },
  MAX_SPACED: 21,
  CENTERED_QUARTER: 35,
}

function manage(division) {
  if (!workspace.activeClient.normalWindow && !workspace.activeClient.utility) {
    return
  }

  const area = workspace.clientArea(
    KWin.PlacementArea,
    workspace.activeScreen,
    workspace.currentDesktop
  )
  const geometry = workspace.activeClient.frameGeometry
  const ip = readConfig('InnerPadding', 8)
  const op = readConfig('OuterPadding', 8)

  let nw = geometry.width
  let nh = geometry.height
  let nx = geometry.x
  let ny = geometry.y

  switch (division) {
    case divisions.FOURTHS.NW:
      nw = (area.width - 2 * op - ip) / 2
      nh = (area.height - 2 * op - ip) / 2
      nx = op
      ny = op
      break
    case divisions.FOURTHS.NE:
      nw = (area.width - 2 * op - ip) / 2
      nh = (area.height - 2 * op - ip) / 2
      nx = op + ip + nw
      ny = op
      break
    case divisions.FOURTHS.SW:
      nw = (area.width - 2 * op - ip) / 2
      nh = (area.height - 2 * op - ip) / 2
      nx = op
      ny = op + ip + nh
      break
    case divisions.FOURTHS.SE:
      nw = (area.width - 2 * op - ip) / 2
      nh = (area.height - 2 * op - ip) / 2
      nx = op + ip + nw
      ny = op + ip + nh
      break
    case divisions.THIRDS.LEFT:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = area.height - 2 * op
      nx = op
      ny = op
      break
    case divisions.THIRDS.CENTER:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = area.height - 2 * op
      nx = op + nw + ip
      ny = op
      break
    case divisions.THIRDS.RIGHT:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = area.height - 2 * op
      nx = op + 2 * nw + 2 * ip
      ny = op
      break
    case divisions.THIRDS.TWO_LEFT:
      nw = (2 * (area.width - 2 * op - 2 * ip)) / 3 + ip
      nh = area.height - 2 * op
      nx = op
      ny = op
      break
    case divisions.THIRDS.TWO_RIGHT:
      nw = (2 * (area.width - 2 * op - 2 * ip)) / 3 + ip
      nh = area.height - 2 * op
      nx = area.width - nw - op
      ny = op
      break
    case divisions.SIXTHS.NW:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = (area.height - 2 * op - ip) / 2
      nx = op
      ny = op
      break
    case divisions.SIXTHS.N:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = (area.height - 2 * op - ip) / 2
      nx = op + ip + nw
      ny = op
      break
    case divisions.SIXTHS.NE:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = (area.height - 2 * op - ip) / 2
      nx = op + 2 * ip + 2 * nw
      ny = op
      break
    case divisions.SIXTHS.SW:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = (area.height - 2 * op - ip) / 2
      nx = op
      ny = op + ip + nh
      break
    case divisions.SIXTHS.S:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = (area.height - 2 * op - ip) / 2
      nx = op + ip + nw
      ny = op + ip + nh
      break
    case divisions.SIXTHS.SE:
      nw = (area.width - 2 * op - 2 * ip) / 3
      nh = (area.height - 2 * op - ip) / 2
      nx = op + 2 * ip + 2 * nw
      ny = op + ip + nh
      break
    case divisions.HALVES.LEFT:
      nw = (area.width - 2 * op - ip) / 2
      nh = area.height - 2 * op
      nx = op
      ny = op
      break
    case divisions.HALVES.RIGHT:
      nw = (area.width - 2 * op - ip) / 2
      nh = area.height - 2 * op
      nx = nw + op + ip
      ny = op
      break
    case divisions.HALVES.CENTER:
      nw = (area.width - 2 * op - ip) / 2
      nh = area.height - 2 * op
      nx = (area.width - nw) / 2
      ny = op
      break
    case divisions.HALVES.TOP:
      nw = area.width - 2 * op
      nh = (area.height - 2 * op - ip) / 2
      nx = op
      ny = op
      break
    case divisions.HALVES.BOTTOM:
      nw = area.width - 2 * op
      nh = (area.height - 2 * op - ip) / 2
      nx = op
      ny = nh + op + ip
      break
    case divisions.CENTER:
      nw = geometry.width
      nh = geometry.height
      nx = (area.width - nw) / 2
      ny = (area.height - nh) / 2
      break
    case divisions.MAX.ALL:
      nw = area.width - 2 * op
      nh = area.height - 2 * op
      nx = op
      ny = op
      break
    case divisions.MAX_SPACED:
      nw = ((area.width - ip - 2 * op) * 9) / 10
      nh = ((area.height - ip - 2 * op) * 9) / 10
      nx = (area.width - nw) / 2
      ny = (area.height - nh) / 2
      break
    case divisions.MAX.HEIGHT:
      nw = geometry.width
      nh = area.height - 2 * op
      nx = geometry.x
      ny = op
      break
    case divisions.MAX.WIDTH:
      nw = area.width - 2 * op
      nh = geometry.height
      nx = op
      ny = geometry.y
      break
    case divisions.MOVE.LEFT:
      nw = geometry.width
      nh = geometry.height
      nx = op
      ny = (area.height - 2 * op - nh) / 2
      break
    case divisions.MOVE.RIGHT:
      nw = geometry.width
      nh = geometry.height
      nx = area.width - op - nw
      ny = (area.height - 2 * op - nh) / 2
      break
    case divisions.MOVE.TOP:
      nw = geometry.width
      nh = geometry.height
      nx = (area.width - 2 * op - nw) / 2
      ny = op
      break
    case divisions.MOVE.BOTTOM:
      nw = geometry.width
      nh = geometry.height
      nx = (area.width - 2 * op - nw) / 2
      ny = area.height - op - nh
      break
    case divisions.FOURTHS.FIRST:
      nw = (area.width - 2 * op - 3 * ip) / 4
      nh = area.height - 2 * op
      nx = op
      ny = op
      break
    case divisions.FOURTHS.SECOND:
      nw = (area.width - 2 * op - 3 * ip) / 4
      nh = area.height - 2 * op
      nx = op + ip + nw
      ny = op
      break
    case divisions.FOURTHS.THIRD:
      nw = (area.width - 2 * op - 3 * ip) / 4
      nh = area.height - 2 * op
      nx = op + 2 * ip + 2 * nw
      ny = op
      break
    case divisions.FOURTHS.FOURTH:
      nw = (area.width - 2 * op - 3 * ip) / 4
      nh = area.height - 2 * op
      nx = op + 3 * ip + 3 * nw
      ny = op
      break
    case divisions.CENTERED_QUARTER:
      nw = (area.width - 2 * op - ip) / 2
      nh = (area.height - 2 * op - ip) / 2
      nx = (area.width - nw) / 2
      ny = (area.height - nh) / 2
      break
  }

  saveGeometry(workspace.activeClient)

  workspace.activeClient.geometry = {
    x: Math.round(nx + area.x),
    y: Math.round(ny + area.y),
    width: Math.round(nw),
    height: Math.round(nh),
  }
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

function shortcut(text, shortcut, placement) {
  text = 'Rectangle: ' + text
  shortcut = 'Ctrl+Meta+' + shortcut
  registerShortcut(text, text, shortcut, () => manage(placement))
}

shortcut('Quarter: Top Left', 'U', divisions.FOURTHS.NW)
shortcut('Quarter: Top Right', 'I', divisions.FOURTHS.NE)
shortcut('Quarter: Bottom Left', 'J', divisions.FOURTHS.SW)
shortcut('Quarter: Bottom Right', 'K', divisions.FOURTHS.SE)

shortcut('Fourth: First', 'V', divisions.FOURTHS.FIRST)
shortcut('Fourth: Second', 'B', divisions.FOURTHS.SECOND)
shortcut('Fourth: Third', 'N', divisions.FOURTHS.THIRD)
shortcut('Fourth: Fourth', 'M', divisions.FOURTHS.FOURTH)

shortcut('Thirds: First', 'D', divisions.THIRDS.LEFT)
shortcut('Thirds: Second', 'F', divisions.THIRDS.CENTER)
shortcut('Thirds: Third', 'G', divisions.THIRDS.RIGHT)

shortcut('Two Thirds: First', 'E', divisions.THIRDS.TWO_LEFT)
shortcut('Two Thirds: Second', 'T', divisions.THIRDS.TWO_RIGHT)

shortcut('Sixth: Top Left', 'Shift+U', divisions.SIXTHS.NW)
shortcut('Sixth: Top Center', 'Shift+I', divisions.SIXTHS.N)
shortcut('Sixth: Top Right', 'Shift+O', divisions.SIXTHS.NE)
shortcut('Sixth: Bottom Left', 'Shift+J', divisions.SIXTHS.SW)
shortcut('Sixth: Bottom Center', 'Shift+K', divisions.SIXTHS.S)
shortcut('Sixth: Bottom Right', 'Shift+L', divisions.SIXTHS.SE)

shortcut('Halves: Left', 'Left', divisions.HALVES.LEFT)
shortcut('Halves: Center', 'Shift+C', divisions.HALVES.CENTER)
shortcut('Halves: Right', 'Right', divisions.HALVES.RIGHT)
shortcut('Halves: Top', 'Up', divisions.HALVES.TOP)
shortcut('Halves: Bottom', 'Down', divisions.HALVES.BOTTOM)

shortcut('Move: Left', 'Alt+Left', divisions.MOVE.LEFT)
shortcut('Move: Right', 'Alt+Right', divisions.MOVE.RIGHT)
shortcut('Move: Top', 'Alt+Up', divisions.MOVE.TOP)
shortcut('Move: Bottom', 'Alt+Down', divisions.MOVE.BOTTOM)

shortcut('Maximize Height', 'Shift+Alt+Up', divisions.MAX.HEIGHT)
shortcut('Maximize Width', 'Shift+Alt+Right', divisions.MAX.WIDTH)

shortcut('Center', 'C', divisions.CENTER)
shortcut('Maximized', 'Return', divisions.MAX.ALL)
shortcut('Almost Maximized', 'Shift+Return', divisions.MAX_SPACED)
shortcut('Centered Quarter', 'Alt+C', divisions.CENTERED_QUARTER)

function registerClient(client) {
  if (!client.normalWindow) {
    return
  }
  client.clientStartUserMovedResized.connect(restoreGeometry)
}

function unregisterClient(client) {
  if (!client.normalWindow) {
    return
  }
  client.clientStepUserMovedResized.disconnect(restoreGeometry)
}
