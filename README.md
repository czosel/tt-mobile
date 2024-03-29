# TT-mobile

This repository includes an unofficial mobile client for [click-TT](http://click-tt.ch/). It consists of

* a client powered by [Preact](preactjs.com)
* a server/webscraper powered by [Osmosis](https://github.com/rchipka/node-osmosis)

You can [view the app here](https://tt-mobile.ch).

## Development

First, clone the repository:

```shell
git clone git@github.com:czosel/tt-mobile.git
cd tt-mobile
echo UPLOAD_PASSWORD=your-password > ./server/.env
echo PREACT_APP_API=http://localhost:3020 > ./client/.env
echo PREACT_APP_DOCS=http://localhost:8080 >> ./client/.env
```

### Docker

With docker and docker-compose installed, run
```shell
docker-compose up -d
```

### Local installation

Alternatively, install and run the server and client locally:

```shell
# server
cd server
yarn && yarn start

# client
cd client
yarn && yarn start
```
