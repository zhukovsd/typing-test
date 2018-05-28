#!/usr/bin/env bash

echo "Running inject-commit-data-into-index-pug.sh..."

# set current directory to ./frontend explicitly, because this script gets executed from a root project dir
cd "${0%/*}"

BRANCH_NAME=`git rev-parse --abbrev-ref HEAD`
COMMIT_HASH=`git rev-parse --verify HEAD | cut -c1-6`
DATETIME=$(date)

# echo ${COMMIT_HASH}
# echo ${DATETIME}
# echo ${BRANCH_NAME}

# https://stackoverflow.com/questions/2777579/how-to-output-only-captured-groups-with-sed
# https://askubuntu.com/questions/76808/how-do-i-use-variables-in-a-sed-command
sed -E -i "s!(<\!-- Built from ).*(@).*( at ).*( -->)!\1$BRANCH_NAME\2$COMMIT_HASH\3$DATETIME\4!" ./app/index.pug
