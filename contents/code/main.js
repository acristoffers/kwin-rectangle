const divisions = {
  FOURTHS: {
    NW: 1,
    NE: 2,
    SW: 3,
    SE: 4,
  },
  THIRDS: {
    LEFT:      5,
    CENTER:    6,
    RIGHT:     7,
    TWO_LEFT:  8,
    TWO_RIGHT: 9
  },
  SIXTHS: {
    NW: 10,
    N:  11,
    NE: 12,
    SW: 13,
    S:  14,
    SE: 15
  },
  CENTER:     16,
  MAX:        17,
  MAX_SPACED: 18,
};

function move(x, y, w, h) {
  const geometry                       = workspace.activeClient.frameGeometry;
  geometry.x                           = x;
  geometry.y                           = y;
  geometry.width                       = w;
  geometry.height                      = h;
  workspace.activeClient.frameGeometry = geometry;
}

function manage(division) {
  if (!workspace.activeClient.normalWindow && !workspace.activeClient.utility) {
    return;
  }

  const area     = workspace.clientArea(KWin.PlacementArea, workspace.activeScreen, workspace.currentDesktop);
  const geometry = workspace.activeClient.frameGeometry;
  const ip       = readConfig("InnerPadding", 8);
  const op       = readConfig("OuterPadding", 8);

  let nw, nh, nx, ny;

  switch (division) {
    case divisions.FOURTHS.NW:
      nw = (area.width - 2*op - ip) / 2;
      nh = (area.height - 2*op - ip) / 2;
      nx = op;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.FOURTHS.NE:
      nw = (area.width - 2*op - ip) / 2;
      nh = (area.height - 2*op - ip) / 2;
      nx = op + ip + nw;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.FOURTHS.SW:
      nw = (area.width - 2*op - ip) / 2;
      nh = (area.height - 2*op - ip) / 2;
      nx = op;
      ny = op + ip + nh;
      move(nx,ny,nw,nh);
      break;
    case divisions.FOURTHS.SE:
      nw = (area.width - 2*op - ip) / 2;
      nh = (area.height - 2*op - ip) / 2;
      nx = op + ip + nw;
      ny = op + ip + nh;
      move(nx,ny,nw,nh);
      break;
    case divisions.THIRDS.LEFT:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = area.height - 2*op;
      nx = op;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.THIRDS.CENTER:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = area.height - 2*op;
      nx = op + nw + ip;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.THIRDS.RIGHT:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = area.height - 2*op;
      nx = op + 2*nw + 2*ip;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.THIRDS.TWO_LEFT:
      nw = 2 * (area.width - 2*op - 2*ip) / 3 + ip;
      nh = area.height - 2*op;
      nx = op;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.THIRDS.TWO_RIGHT:
      nw = 2 * (area.width - 2*op - 2*ip) / 3 + ip;
      nh = area.height - 2*op;
      nx = area.width - nw - op;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.SIXTHS.NW:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = (area.height - 2*op - ip) / 2;
      nx = op;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.SIXTHS.N:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = (area.height - 2*op - ip) / 2;
      nx = op + ip + nw;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.SIXTHS.NE:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = (area.height - 2*op - ip) / 2;
      nx = op + 2*ip + 2*nw;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.SIXTHS.SW:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = (area.height - 2*op - ip) / 2;
      nx = op;
      ny = op + ip + nh;
      move(nx,ny,nw,nh);
      break;
    case divisions.SIXTHS.S:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = (area.height - 2*op - ip) / 2;
      nx = op + ip + nw;
      ny = op + ip + nh;
      move(nx,ny,nw,nh);
      break;
    case divisions.SIXTHS.SE:
      nw = (area.width - 2*op - 2*ip) / 3;
      nh = (area.height - 2*op - ip) / 2;
      nx = op + 2*ip + 2*nw;
      ny = op + ip + nh;
      move(nx,ny,nw,nh);
      break;
    case divisions.CENTER:
      nw = geometry.width;
      nh = geometry.height;
      nx = (area.width - nw) / 2;
      ny = (area.height - nh) / 2;
      move(nx,ny,nw,nh);
      break;
    case divisions.MAX:
      nw = area.width - ip - 2*op;
      nh = area.height - ip - 2*op;
      nx = op;
      ny = op;
      move(nx,ny,nw,nh);
      break;
    case divisions.MAX_SPACED:
      nw = (area.width - ip - 2*op) * 9/10;
      nh = (area.height - ip - 2*op) * 9/10;
      nx = (area.width - nw) / 2;
      ny = (area.height - nh) / 2;
      move(nx,ny,nw,nh);
      break;
  }
}

function shortcut(text, defaultShortcut, func) {
  registerShortcut(text, text, defaultShortcut, func);
}

shortcut("Rectangle: Quarter: Top Left",     "Ctrl+Meta+U", function () { manage(divisions.FOURTHS.NW); });
shortcut("Rectangle: Quarter: Top Right",    "Ctrl+Meta+I", function () { manage(divisions.FOURTHS.NE); });
shortcut("Rectangle: Quarter: Botton Left",  "Ctrl+Meta+J", function () { manage(divisions.FOURTHS.SW); });
shortcut("Rectangle: Quarter: Botton Right", "Ctrl+Meta+K", function () { manage(divisions.FOURTHS.SE); });

shortcut("Rectangle: Thirds: First",  "Ctrl+Meta+D", function () { manage(divisions.THIRDS.LEFT); });
shortcut("Rectangle: Thirds: Second", "Ctrl+Meta+F", function () { manage(divisions.THIRDS.CENTER); });
shortcut("Rectangle: Thirds: Third",  "Ctrl+Meta+G", function () { manage(divisions.THIRDS.RIGHT); });

shortcut("Rectangle: Two Thirds: First",  "Ctrl+Meta+E", function () { manage(divisions.THIRDS.TWO_LEFT); });
shortcut("Rectangle: Two Thirds: Second",  "Ctrl+Meta+T", function () { manage(divisions.THIRDS.TWO_RIGHT); });

shortcut("Rectangle: Sixth: Top Left",      "Ctrl+Meta+Shift+U", function () { manage(divisions.SIXTHS.NW); });
shortcut("Rectangle: Sixth: Top Center",    "Ctrl+Meta+Shift+I", function () { manage(divisions.SIXTHS.N); });
shortcut("Rectangle: Sixth: Top Right",     "Ctrl+Meta+Shift+O", function () { manage(divisions.SIXTHS.NE); });
shortcut("Rectangle: Sixth: Bottom Left",   "Ctrl+Meta+Shift+J", function () { manage(divisions.SIXTHS.SW); });
shortcut("Rectangle: Sixth: Bottom Center", "Ctrl+Meta+Shift+K", function () { manage(divisions.SIXTHS.S); });
shortcut("Rectangle: Sixth: Bottom Right",  "Ctrl+Meta+Shift+L", function () { manage(divisions.SIXTHS.SE); });

shortcut("Rectangle: Center",           "Ctrl+Meta+C",            function () { manage(divisions.CENTER); });
shortcut("Rectangle: Maximized",        "Ctrl+Meta+Return",       function () { manage(divisions.MAX); });
shortcut("Rectangle: Almost Maximized", "Ctrl+Meta+Shift+Return", function () { manage(divisions.MAX_SPACED); });
