#!/bin/bash
git stash
git pull
git stash apply
(cd tt-client && npm i && npm run build)
(cd server && npm i && npm run build && pm2 restart click-tt)
