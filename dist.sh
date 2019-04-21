#!/bin/bash
rm -rf dist/ 
mkdir ./dist && rsync -r --exclude dist/ --exclude *.sh --exclude *.md ./* dist
