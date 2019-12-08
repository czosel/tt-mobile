#!/bin/bash
stage=$(<stage)

git pull
(cd client && npm i && npm run build)
(cd server && npm i && npm run build && pm2 restart "click-tt-${stage}")
