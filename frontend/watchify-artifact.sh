#!/usr/bin/env bash

# set current directory to ./frontend explicitly, because this script gets executed from a root project dir
cd "${0%/*}"

watchify app/js/app.js -t [babelify] --debug -o ./../target/typing-test-1.0-SNAPSHOT/app.js -v