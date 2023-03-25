#!/usr/bin/env bash

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript kwin-rectangle || true

plasmapkg2 -t kwinscript -r kwin-rectangle || true
plasmapkg2 -t kwinscript -i .

qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript \
    ~/.local/share/kwin/scripts/kwin-rectangle kwin-rectangle
qdbus org.kde.KWin /KWin org.kde.KWin.reconfigure
qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.start
