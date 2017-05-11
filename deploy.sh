#!/bin/bash
# git pull is not in here yet because config mgmt isnt done yet
(cd tt-client && npm i && npm run build)
(cd server && npm i && npm run build && pm2 restart click-tt)
