#!/bin/bash
stage=$(<stage)

git pull
(cd client && yarn && yarn build)
(cd widget-docs && yarn && yarn build)
(cd server && yarn && yarn build && pm2 restart "tt-mobile-${stage}")
