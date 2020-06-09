#!/bin/bash

function bench {
  hyperfine --warmup 1 "./bench.sh 20 < ../data/Tokyo_Edgelist.csv"
}

function measure {
  local lang=$1
  echo "Testing $lang..."
  pushd $lang > /dev/null
  make clean > /dev/null && make > /dev/null
  bench
  popd > /dev/null
}
set -e

if [ -n "$1" ]; then
  measure $1
else 
  for lang in cpp go rust javascript julia kotlin; do
    measure $lang
  done
fi
