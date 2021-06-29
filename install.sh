#!/usr/bin/env bash

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript kwin-rectangle || true

plasmapkg2 -t kwinscript -r kwin-rectangle || true
plasmapkg2 -t kwinscript -i .

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript \
    ~/.local/share/kwin/scripts/kwin-rectangle kwin-rectangle
qdbus org.kde.KWin /KWin org.kde.KWin.reconfigure
qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.start

if [ ! -f "/usr/share/kservices5/kwin-rectangle.desktop" ]; then
    echo "I will now create a symlink on a system folder."
    echo "Without it you will not see the plugin's settings button."
    echo "The plugin is already installed. If you do not mind the default settings, you can cancel"
    echo "the symlink creation."
    sudo ln -s "${PWD}/metadata.desktop" /usr/share/kservices5/kwin-rectangle.desktop
fi
