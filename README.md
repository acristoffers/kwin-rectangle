A kwin script to mimic macOS's Rectangle tiling options in Plasma.

It allows manual tiling with the following shortcuts (configurable in settings):

- Quarter: Top Left: `Super+Ctrl+U`
- Quarter: Top Right: `Super+Ctrl+I`
- Quarter: Bottom Left: `Super+Ctrl+J`
- Quarter: Bottom Right: `Super+Ctrl+K`
- Fourth: First: `Super+Ctrl+V`
- Fourth: Second: `Super+Ctrl+B`
- Fourth: Third: `Super+Ctrl+N`
- Fourth: Fourth: `Super+Ctrl+M`
- Thirds: First: `Super+Ctrl+D`
- Thirds: Second: `Super+Ctrl+F`
- Thirds: Third: `Super+Ctrl+G`
- Sixth: Top Left: `Super+Ctrl+Shift+U`
- Sixth: Top Center: `Super+Ctrl+Shift+I`
- Sixth: Top Right: `Super+Ctrl+Shift+O`
- Sixth: Bottom Left: `Super+Ctrl+Shift+J`
- Sixth: Bottom Center: `Super+Ctrl+Shift+K`
- Sixth: Bottom Right: `Super+Ctrl+Shift+L`
- Ninth: Top Left: `Super+Ctrl+Alt+U`
- Ninth: Top Center: `Super+Ctrl+Alt+I`
- Ninth: Top Right: `Super+Ctrl+Alt+O`
- Ninth: Middle Left: `Super+Ctrl+Alt+J`
- Ninth: Middle Center: `Super+Ctrl+Alt+K`
- Ninth: Middle Right: `Super+Ctrl+Alt+L`
- Ninth: Bottom Left: `Super+Ctrl+Alt+N`
- Ninth: Bottom Center: `Super+Ctrl+Alt+M`
- Ninth: Bottom Right: `Super+Ctrl+Alt+,`
- Halves: Center (Vertical): `Super+Ctrl+Shift+C`
- Halves: Center (Horizontal): `Super+Ctrl+Shift+V`
- Halves: Left: `Super+Ctrl+Left`
- Halves: Right: `Super+Ctrl+Right`
- Halves: Top: `Super+Ctrl+Up`
- Halves: Bottom: `Super+Ctrl+Down`
- Two Thirds: First: `Super+Ctrl+E`
- Two Thirds: Second: `Super+Ctrl+T`
- Two Thirds: Center: `Super+Ctrl+R`
- Center: `Super+Ctrl+C`
- Maximized: `Super+Ctrl+Return`
- Centered Quarter: `Super+Ctrl+Alt+C`
- Almost Maximized: `Super+Ctrl+Shift+Return`
- Maximize Height: `Super+Ctrl+Shift+Alt+Up`
- Maximize Width: `Super+Ctrl+Shift+Alt+Right`
- Move: Left: `Super+Ctrl+Alt+4`
- Move: Right: `Super+Ctrl+Alt+6`
- Move: Top: `Super+Ctrl+Alt+8`
- Move: Bottom: `Super+Ctrl+Alt+2`
- Move: Top Left: `Super+Ctrl+Alt+7`
- Move: Top Right: `Super+Ctrl+Alt+9`
- Move: Bottom Left: `Super+Ctrl+Alt+1`
- Move: Bottom Right: `Super+Ctrl+Alt+3`

# Multi-monitor Quirk

Kwin, by default, has a focus-follows-mouse policy, meaning that the tilling operation will
happen on the monitor where the mouse is, and not where the window is. To change this behaviour,
go to
`System Settings` -> `Window Management` -> `Window Behaviour` -> `Focus` -> `Multiscreen behaviour`
and deselect the `Active screen follows mouse` toggle.

# Installation

Run `./install.sh`

Activate the plugin from "System Settings" -> "Window management" -> "KWin Scripts".

Check if there were no shortcut conflict by going to "System Settings" ->
"Shortcuts" -> "Global Keyboard Shortcuts" -> "KWin" and searching for
"Rectangle".

# Uninstallation

Run `./uninstall.sh`
