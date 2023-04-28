A kwin script to mimic macOS's Rectangle tiling options in Plasma.

It allows manual tiling with the following shortcuts (configurable in settings):

- Quarter: (1) Top Left: `Super+Ctrl+U`
- Quarter: (2) Top Right: `Super+Ctrl+I`
- Quarter: (3) Bottom Left: `Super+Ctrl+J`
- Quarter: (4) Bottom Right: `Super+Ctrl+K`
- Quarter: (5) Centered: `Super+Ctrl+Alt+C`
- Fourth: (1) First: `Super+Ctrl+V`
- Fourth: (2) Second: `Super+Ctrl+B`
- Fourth: (3) Third: `Super+Ctrl+N`
- Fourth: (4) Fourth: `Super+Ctrl+M`
- Third: (1) First: `Super+Ctrl+D`
- Third: (2) Second: `Super+Ctrl+F`
- Third: (3) Third: `Super+Ctrl+G`
- Sixth: (1) Top Left: `Super+Ctrl+Shift+U`
- Sixth: (2) Top Center: `Super+Ctrl+Shift+I`
- Sixth: (3) Top Right: `Super+Ctrl+Shift+O`
- Sixth: (4) Bottom Left: `Super+Ctrl+Shift+J`
- Sixth: (5) Bottom Center: `Super+Ctrl+Shift+K`
- Sixth: (6) Bottom Right: `Super+Ctrl+Shift+L`
- Ninth: (1) Top Left: `Super+Ctrl+Alt+U`
- Ninth: (2) Top Center: `Super+Ctrl+Alt+I`
- Ninth: (3) Top Right: `Super+Ctrl+Alt+O`
- Ninth: (4) Middle Left: `Super+Ctrl+Alt+J`
- Ninth: (5) Middle Center: `Super+Ctrl+Alt+K`
- Ninth: (6) Middle Right: `Super+Ctrl+Alt+L`
- Ninth: (7) Bottom Left: `Super+Ctrl+Alt+N`
- Ninth: (8) Bottom Center: `Super+Ctrl+Alt+M`
- Ninth: (9) Bottom Right: `Super+Ctrl+Alt+,`
- Half: (1) Center (Vertical): `Super+Ctrl+Shift+C`
- Half: (1) Center (Horizontal): `Super+Ctrl+Shift+V`
- Half: (2) Left: `Super+Ctrl+Left`
- Half: (2) Right: `Super+Ctrl+Right`
- Half: (3) Top: `Super+Ctrl+Up`
- Half: (3) Bottom: `Super+Ctrl+Down`
- Two Thirds: (1) Left: `Super+Ctrl+E`
- Two Thirds: (2) Center: `Super+Ctrl+R`
- Two Thirds: (3) Right: `Super+Ctrl+T`
- Center: `Super+Ctrl+C`
- Maximize: `Super+Ctrl+Return`
- Maximize: Almost: `Super+Ctrl+Shift+Return`
- Maximize: Height: `Super+Ctrl+Shift+Alt+Up`
- Maximize: Width: `Super+Ctrl+Shift+Alt+Right`
- Stretch: (1) Top: `Super+Ctrl+Alt+Up`
- Stretch: (1) Bottom: `Super+Ctrl+Alt+Down`
- Stretch: (2) Left: `Super+Ctrl+Alt+Left`
- Stretch: (2) Right: `Super+Ctrl+Alt+Right`
- Stretch: Step: (1) Bottom Left: `Super+Ctrl+1`
- Stretch: Step: (2) Bottom: `Super+Ctrl+2`
- Stretch: Step: (3) Bottom Right: `Super+Ctrl+3`
- Stretch: Step: (4) Left: `Super+Ctrl+4`
- Stretch: Step: (5) Right: `Super+Ctrl+6`
- Stretch: Step: (6) Top Left: `Super+Ctrl+7`
- Stretch: Step: (7) Top: `Super+Ctrl+8`
- Stretch: Step: (8) Top Right: `Super+Ctrl+9`
- Move: (1) Bottom Left: `Super+Ctrl+Alt+1`
- Move: (2) Bottom: `Super+Ctrl+Alt+2`
- Move: (3) Bottom Right: `Super+Ctrl+Alt+3`
- Move: (4) Left: `Super+Ctrl+Alt+4`
- Move: (5) Right: `Super+Ctrl+Alt+6`
- Move: (6) Top Left: `Super+Ctrl+Alt+7`
- Move: (7) Top: `Super+Ctrl+Alt+8`
- Move: (8) Top Right: `Super+Ctrl+Alt+9`

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

Run `./install.sh`

Activate the plugin from "System Settings" -> "Window management" -> "KWin Scripts".

Check if there were no shortcut conflict by going to "System Settings" ->
"Shortcuts" -> "Global Keyboard Shortcuts" -> "KWin" and searching for
"Rectangle".

# Uninstallation

Run `./uninstall.sh`
