#!/usr/bin/env bash

npm install

mkdir -p ./build/
cp ./app/*.html ./build/
cp ./app/*.css ./build/

./node_modules/.bin/pug app -o ./build -P
./node_modules/.bin/browserify app/js/app.js -t [babelify] --debug -o build/app.js