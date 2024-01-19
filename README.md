# Rectangle

A kwin script to mimic macOS's [Rectangle](https://rectangleapp.com/) tiling options in Plasma.

It allows manual tiling with the following shortcuts (configurable in settings):

- Quarter: Top Left: `Super+Ctrl+U`
- Quarter: Top Right: `Super+Ctrl+I`
- Quarter: Bottom Left: `Super+Ctrl+J`
- Quarter: Bottom Right: `Super+Ctrl+K`
- Quarter: Centered: `Super+Ctrl+Alt+C`
- Fourth: First: `Super+Ctrl+V`
- Fourth: Second: `Super+Ctrl+B`
- Fourth: Third: `Super+Ctrl+N`
- Fourth: Fourth: `Super+Ctrl+M`
- Three Fourths: First: `Super+Ctrl+Shift+N`
- Three Fourths: Second: `Super+Ctrl+Shift+M`
- Third: First: `Super+Ctrl+D`
- Third: Second: `Super+Ctrl+F`
- Third: Third: `Super+Ctrl+G`
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
- Half: Center (Vertical): `Super+Ctrl+Shift+C`
- Half: Center (Horizontal): `Super+Ctrl+Shift+V`
- Half: Left: `Super+Ctrl+Left`
- Half: Right: `Super+Ctrl+Right`
- Half: Top: `Super+Ctrl+Up`
- Half: Bottom: `Super+Ctrl+Down`
- Two Thirds: Left: `Super+Ctrl+E`
- Two Thirds: Center: `Super+Ctrl+R`
- Two Thirds: Right: `Super+Ctrl+T`
- Center: `Super+Ctrl+C`
- Maximize: `Super+Ctrl+Return`
- Maximize: Almost: `Super+Ctrl+Shift+Return`
- Maximize: Height: `Super+Ctrl+Shift+Alt+Up`
- Maximize: Width: `Super+Ctrl+Shift+Alt+Right`
- Stretch: Top: `Super+Ctrl+Alt+Up`
- Stretch: Bottom: `Super+Ctrl+Alt+Down`
- Stretch: Left: `Super+Ctrl+Alt+Left`
- Stretch: Right: `Super+Ctrl+Alt+Right`
- Stretch: Step: Bottom Left: `Super+Ctrl+1`
- Stretch: Step: Bottom: `Super+Ctrl+2`
- Stretch: Step: Bottom Right: `Super+Ctrl+3`
- Stretch: Step: Left: `Super+Ctrl+4`
- Stretch: Step: Right: `Super+Ctrl+6`
- Stretch: Step: Top Left: `Super+Ctrl+7`
- Stretch: Step: Top: `Super+Ctrl+8`
- Stretch: Step: Top Right: `Super+Ctrl+9`
- Move: Bottom Left: `Super+Ctrl+Alt+1`
- Move: Bottom: `Super+Ctrl+Alt+2`
- Move: Bottom Right: `Super+Ctrl+Alt+3`
- Move: Left: `Super+Ctrl+Alt+4`
- Move: Right: `Super+Ctrl+Alt+6`
- Move: Top Left: `Super+Ctrl+Alt+7`
- Move: Top: `Super+Ctrl+Alt+8`
- Move: Top Right: `Super+Ctrl+Alt+9`

# Multi-monitor Quirk

Kwin, by default, has a focus-follows-mouse policy, meaning that the tilling operation will
happen on the monitor where the mouse is, and not where the window is. To change this behaviour,
go to
`System Settings` -> `Window Management` -> `Window Behaviour` -> `Focus` -> `Multiscreen behaviour`
and deselect the `Active screen follows mouse` toggle.

# Shortcut Sets

The default shortcut mimics Rectangle's shortcuts, so if you are familiar with
it, you will be at home here.

If, however, you prefer to use the numberpad for this, there is an
[numeric set](numeric.kksrc) you can import into Plasma instead. To import it
open `System Settings` and go to `Shortcuts` and click the `Import Scheme` button
on the bottom-right of the window. To go back to the default settings you can
import the [default set](default.kksrc).

# Animations

This script does not deal with animations, however, the Geometry Change effect
(https://store.kde.org/p/2026302) will animate the transitions triggered by
kwin-rectangle.

# Installation

## Automatic

The extension is available directly in System Settings (Get More button) and at https://store.kde.org/p/1545864.

## Manual

Run `./install.sh`

Activate the plugin from "System Settings" -> "Window management" -> "KWin Scripts".

Check if there were no shortcut conflict by going to "System Settings" ->
"Shortcuts" -> "Global Keyboard Shortcuts" -> "KWin" and searching for
"Rectangle".

# Uninstallation

Run `./uninstall.sh`
