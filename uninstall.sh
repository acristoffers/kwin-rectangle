#!/usr/bin/env bash

plasmapkg2 -t kwinscript -r kwin-rectangle
qdbus org.kde.kglobalaccel /component/kwin cleanUp
