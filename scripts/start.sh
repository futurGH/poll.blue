#!/bin/ash

set -euxo pipefail

nginx -g "daemon off;" &
deno run -A --allow-env app/main.ts &
wait -n
exit $?
