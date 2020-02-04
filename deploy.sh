#!/bin/bash
stage=$(<stage)

git pull
(cd client && yarn --frozen-lockfile && yarn build)
(cd widget-docs && yarn --frozen-lockfile && yarn build)
(cd server && yarn --frozen-lockfile && yarn build && pm2 restart "tt-mobile-${stage}")
