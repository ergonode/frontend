#!/usr/bin/env bash

set -eo pipefail

if health="$(curl -I "http://127.0.0.1:3000" 2>/dev/null | head -n 1|cut -d$' ' -f2)"; then
	if [ "$health" = '200' ]; then
		exit 0
	fi
	echo >&2 "unexpected health status: $health"
fi

exit 1
