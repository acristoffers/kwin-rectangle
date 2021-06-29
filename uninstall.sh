#!/usr/bin/env bash

plasmapkg2 -t kwinscript -r kwin-rectangle
qdbus org.kde.kglobalaccel /component/kwin cleanUp

if [ ! -f "/usr/share/kservices5/kwin-rectangle.desktop" ]; then
    echo "I will now remove a symlink on a system folder, since it is no longer needed."
    sudo rm /usr/share/kservices5/kwin-rectangle.desktop
fi
