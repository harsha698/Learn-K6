#!/bin/bash

set +e

K6_PARAMS=${1:-""}

k6 run \
  --compatibility-mode=base \
  $K6_PARAMS \
  compiledCode/test2.js