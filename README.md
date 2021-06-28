A kwin script to mimic macOS's Rectangle tiling options in Plasma.

It allows manual tiling with the following shortcuts (configurable in settings):

- `Ctrl+Meta+U`: Quarter: Top Left
- `Ctrl+Meta+I`: Quarter: Top Right
- `Ctrl+Meta+J`: Quarter: Botton Left
- `Ctrl+Meta+K`: Quarter: Botton Right

- `Ctrl+Meta+D`: Thirds: First
- `Ctrl+Meta+F`: Thirds: Second
- `Ctrl+Meta+G`: Thirds: Third

- `Ctrl+Meta+E`: Two Thirds: First
- `Ctrl+Meta+T`: Two Thirds: Second

- `Ctrl+Meta+Shift+U`: Sixth: Top Left
- `Ctrl+Meta+Shift+I`: Sixth: Top Center
- `Ctrl+Meta+Shift+O`: Sixth: Top Right
- `Ctrl+Meta+Shift+J`: Sixth: Bottom Left
- `Ctrl+Meta+Shift+K`: Sixth: Bottom Center
- `Ctrl+Meta+Shift+L`: Sixth: Bottom Right

- `Ctrl+Meta+C`: Center
- `Ctrl+Meta+Return`: Maximized
- `Ctrl+Meta+Shift+Return`: Almost Maximized

# Installation

Run `./install.sh`

Activate the plugin from "System Settings" -> "Window management" -> "KWin Scripts".

Check if there were no shortcut conflict by going to  "System Settings" ->
"Shortcuts" -> "Global Keyboard Shortcuts" -> "KWin" and searching for
"Rectangle".

Installing with this script is preferred, as it will create the necessary
symlink. If you install with the kwinscript file, you may not see the settings
button to change inner and outer padding.

# Uninstallation

Uninstall the package with `plasmapkg2 -t kwinscript -r kwin-rectangle`.
Remove the shortcuts with `qdbus org.kde.kglobalaccel /component/kwin cleanUp`.
