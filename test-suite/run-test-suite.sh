#!/bin/bash

set +e

K6_PARAMS=${1:-""}

npm run build

k6 run \
  --compatibility-mode=base \
  $K6_PARAMS \
  compiledCode/multipleScenarios.js