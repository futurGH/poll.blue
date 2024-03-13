#!/bin/ash

set -euxo pipefail

nginx -g "daemon off;" &
deno run -A --allow-env --unsafely-ignore-certificate-errors app/main.ts &
wait -n
exit $?
