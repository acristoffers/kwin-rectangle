#!/usr/bin/env bash

kpackagetool6 -t KWin/Script -r kwin-rectangle
qdbus org.kde.kglobalaccel /component/kwin cleanUp
