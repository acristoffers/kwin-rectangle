A kwin script to mimic macOS's Rectangle tiling options in Plasma.

It allows manual tiling with the following shortcuts (configurable in settings):

- Quarter: Top Left: `Ctrl+Meta+U`
- Quarter: Top Right: `Ctrl+Meta+I`
- Quarter: Bottom Left: `Ctrl+Meta+J`
- Quarter: Bottom Right: `Ctrl+Meta+K`
- Fourth: First: `Ctrl+Meta+V`
- Fourth: Second: `Ctrl+Meta+B`
- Fourth: Third: `Ctrl+Meta+N`
- Fourth: Fourth: `Ctrl+Meta+M`
- Thirds: First: `Ctrl+Meta+D`
- Thirds: Second: `Ctrl+Meta+F`
- Thirds: Third: `Ctrl+Meta+G`
- Two Thirds: First: `Ctrl+Meta+E`
- Two Thirds: Second: `Ctrl+Meta+T`
- Sixth: Top Left: `Ctrl+Meta+Shift+U`
- Sixth: Top Center: `Ctrl+Meta+Shift+I`
- Sixth: Top Right: `Ctrl+Meta+Shift+O`
- Sixth: Bottom Left: `Ctrl+Meta+Shift+J`
- Sixth: Bottom Center: `Ctrl+Meta+Shift+K`
- Sixth: Bottom Right: `Ctrl+Meta+Shift+L`
- Halves: Left: `Ctrl+Meta+Left`
- Halves: Center: `Ctrl+Meta+Shift+C`
- Halves: Right: `Ctrl+Meta+Right`
- Halves: Top: `Ctrl+Meta+Up`
- Halves: Bottom: `Ctrl+Meta+Down`
- Move: Left: `Ctrl+Meta+Alt+Left`
- Move: Right: `Ctrl+Meta+Alt+Right`
- Move: Top: `Ctrl+Meta+Alt+Up`
- Move: Bottom: `Ctrl+Meta+Alt+Down`
- Maximize Height: `Ctrl+Meta+Shift+Alt+Up`
- Maximize Width: `Ctrl+Meta+Shift+Alt+Right`
- Center: `Ctrl+Meta+C`
- Maximized: `Ctrl+Meta+Return`
- Almost Maximized: `Ctrl+Meta+Shift+Return`
- Centered Quarter: `Ctrl+Meta+Alt+C`

# Installation

Run `./install.sh`

Activate the plugin from "System Settings" -> "Window management" -> "KWin Scripts".

Check if there were no shortcut conflict by going to "System Settings" ->
"Shortcuts" -> "Global Keyboard Shortcuts" -> "KWin" and searching for
"Rectangle".

Installing with this script is preferred, as it will create the necessary
symlink. If you install with the kwinscript file, you may not see the settings
button to change inner and outer padding.

# Uninstallation

Run `./uninstall.sh`
