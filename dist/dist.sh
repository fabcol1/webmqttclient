#!/bin/bash
rm -rf dist/ 
mkdir ./dist && rsync -ar --exclude=dist/ ./* dist
