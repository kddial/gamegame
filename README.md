# gamegame project

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

```
nvm use v14
./railway-build.sh

./railway-start.sh
```
