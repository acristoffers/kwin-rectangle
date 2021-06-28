#!/usr/bin/env bash

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript kwin-rectangle

plasmapkg2 -t kwinscript -r kwin-rectangle || true
plasmapkg2 -t kwinscript -i .

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript ~/.local/share/kwin/scripts/kwin-rectangle kwin-rectangle

# I have no idea why these seem to be necessary (Kubuntu 16.04)
qdbus org.kde.KWin /KWin org.kde.KWin.reconfigure
qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.start

echo "I will now create a symlink on a system folder. Without it you will not see the preferences button."
echo "The plugin is already installed locally, you can not install the symlink if you do not mind the default settings."
sudo ln -s "${PWD}/metadata.desktop" /usr/share/kservices5/kwin-rectangle.desktop
