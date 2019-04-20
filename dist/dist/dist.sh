#!/bin/bash
rm -rf dist/ 
mkdir ./dist && rsync -ar --exclude=dist/ ./* dist && find ./css -name "*.scss" -type f -delete && find ./css -type d -empty -delete
