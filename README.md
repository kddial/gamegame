# Gamegame

<img width="110" alt="gamegame-preview b002f343" src="https://user-images.githubusercontent.com/2696834/226998336-fd65891e-3995-44ff-ae63-5cdf18b8b399.png">

- try it out! at https://gamegame-production.up.railway.app/
- works on both desktop and mobile

# Video

https://user-images.githubusercontent.com/2696834/226998370-3c0d9db5-6d3b-4af9-8dbd-d625328935f7.mov

# Description

Built gamegame to jump around with friends with chat. Jump quest is heavily inspired by Maplestory.

Backend is a typescript nodejs server which holds websocket connections with each client (browser).
In directory `/server`.

Frontend is html canvas that renders the player and handles the physics and collisions.
In directory `/client` which is served as static files from the server.

# credits

Player sprite is from https://rvros.itch.io/animated-pixel-hero

# dev and build

Note: need to be on node.js v14 to use @clusterws/cws npm package on server.

# To run dev locally

```
// on server
nvm use v14
cd server
yarn install
yarn dev

go to http://localhost:2000


ALSO in a new terminal to watch for client side changes,
cd client
yarn dev
```

```
// to run client only without a server
cd client
yarn install
yarn dev

open a new terminal tab
serve .      (this is a global npm package)

go to http://localhost:3000
```

# To build for deployment

Using https://railway.app for hosting node.js server with websockets.

```
nvm use v14
./railway-build.sh    // build command


./railway-start.sh    // start command
```
