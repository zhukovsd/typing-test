#!/usr/bin/env bash

# browser-sync start --server build --files build/* --port 3000 --reload-delay 100 &

ARTIFACT_PATH=./out/artifacts/typing_test_war_exploded/

# watch Javascript files
sh ./frontend/watchify-artifact.sh &
# watch pug files
sh ./frontend/watch-pug-artifact.sh &

# uncomment this block if need to watch static css files
while true; do
    # watch static css files ("cp -u" copies file only when it's changed)
    cp -u ./frontend/app/*.css ${ARTIFACT_PATH};

    sleep 2;
done &

browser-sync start --proxy http://localhost:8080 --files ${ARTIFACT_PATH}* --port 3000 --reload-delay 100 &

wait