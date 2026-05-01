#!/usr/bin/env bash

set -euo pipefail

QDBUS_CMD=""
if command -v qdbus >/dev/null 2>&1; then
    QDBUS_CMD="qdbus"
elif command -v qdbus6 >/dev/null 2>&1; then
    QDBUS_CMD="qdbus6"
fi

if [[ -n "$QDBUS_CMD" ]]; then
    "$QDBUS_CMD" org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript kwin-rectangle || true
fi

kpackagetool6 -t KWin/Script -r kwin-rectangle || true
kpackagetool6 -t KWin/Script -i .

if [[ -n "$QDBUS_CMD" ]]; then
    "$QDBUS_CMD" org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript \
        ~/.local/share/kwin/scripts/kwin-rectangle kwin-rectangle
    "$QDBUS_CMD" org.kde.KWin /KWin org.kde.KWin.reconfigure
    "$QDBUS_CMD" org.kde.KWin /Scripting org.kde.kwin.Scripting.start
else
    echo "Warning: qdbus/qdbus6 not found. Package installed but not reloaded in this session."
fi
