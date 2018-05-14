#!/usr/bin/env bash

# npm install

if [ "${CI}" = "true" ]; then
   echo "executing inject-commit-data-into-index-pug.sh"
   sh ./inject-commit-data-into-index-pug.sh
fi

mkdir -p ./build/
cp ./app/*.html ./build/
cp ./app/*.css ./build/

./node_modules/.bin/pug app -o ./build -P
./node_modules/.bin/browserify app/js/app.js -t [babelify] --debug -o build/app.js