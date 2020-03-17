#!/bin/bash

VERSION=$(cat package.json | grep -oP '(?<="version": ")[^"]*')

docker build -t terrabrasilis/file-delivery:v$VERSION -f Dockerfile .

docker push terrabrasilis/file-delivery:v$VERSION
