#!/usr/bin/env bash

# set current directory to ./frontend explicitly, because this script gets executed from a root project dir
cd "${0%/*}"

./node_modules/.bin/pug app -o ./../target/typing-test-1.0-SNAPSHOT/ -P --watch