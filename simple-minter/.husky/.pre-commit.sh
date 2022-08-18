#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
cd ./simple-minter && npx lint-staged 