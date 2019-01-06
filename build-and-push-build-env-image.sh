#!/bin/bash -e

docker image build -f Dockerfile.build -t zhukovsd/typing-test-build-env:latest .

# assume that the current docker client logged in to docker hub as zhukovsd
docker image push zhukovsd/typing-test-build-env:latest