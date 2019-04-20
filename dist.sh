#!/bin/bash
rm -rf dist/ 
mkdir ./dist && rsync -r --exclude ./dist ./* dist
