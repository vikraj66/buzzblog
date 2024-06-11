#!/bin/bash

set -a
source /usr/src/app/server/.env
set +a

set -a
source /usr/src/app/client/.env
set +a

cd /usr/src/app/server
npm run start &

cd /usr/src/app/client
npm run start &

wait -n

exit $?
