#!/bin/bash
rm -rf dist/ 
mkdir ../dist &&
cp -r ./* ../dist/ &&
mv ../dist . &&
rm ./dist/dist.sh && 
cd ./dist/css/scss/ &&
rm -rf *.scss 


