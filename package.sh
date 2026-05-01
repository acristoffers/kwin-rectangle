#!/usr/bin/env bash

set -euo pipefail

if command -v zip >/dev/null 2>&1; then
	zip kwin-rectangle.kwinscript contents/code/main.js contents/config/main.xml \
	contents/ui/config.ui metadata.json LICENSE
elif command -v bsdtar >/dev/null 2>&1; then
	bsdtar -a -cf kwin-rectangle.kwinscript contents/code/main.js contents/config/main.xml \
	contents/ui/config.ui metadata.json LICENSE
else
	echo "Error: neither zip nor bsdtar is available to build kwin-rectangle.kwinscript" >&2
	exit 1
fi
