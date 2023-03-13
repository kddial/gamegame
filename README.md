# dev and build

Note: need to be on node.js v14 to use @clusterws/cws npm package on server.

# To run dev locally

```
// on server
nvm use v14
cd server
yarn install
yarn start

go to http://localhost:2000


ALSO in a new terminal to watch for client side changes,
cd client
yarn start
```

```
// on client only
cd client
yarn install
yarn start

open a new terminal tab
serve .      (this is a global npm package)

go to http://localhost:5000
```

# To build for deployment

```
nvm use v14
cd server
yarn build     // this will also build client code

cd dist
node index.js  // this will serve client code as static files
```

To deploy on digital ocean, ssh into the machine, and run the deploy script.
It will pull the latest, build client and server code, close and delete the currently running server using `pm2`, and start a new server with the name `app`.

```
./deploy.sh
```

# project

I want Gamegame to be an online virtual hangout joint, for casual chit chat. Allow you to talk to people based on spatial distance (2d in this case).

Backend is a nodejs server which holds websocket connections with each client (browser). backend is in typescript.
In directory `/server`.

Front end is html canvas that renders the player and handles the physics and collisions. frontend is in typescript.
In directory `/client` which is served as static files from the server.

# credits

Player sprite is from https://rvros.itch.io/animated-pixel-hero
