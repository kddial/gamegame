import PlatformSprite from './platform-sprite.js';
import PlayerSprite, { OtherPlayersSprite } from './player-sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';
import Platform from './platform.js';
import Platforms from './platforms.js';
import Portals from './portals.js';
import PortalSprite from './portal-sprite.js';
import ClientSocket from './client-socket.js';
import CONSTANTS from './constants.js';
import ImageLoader from './image-loader.js';

const imageLoaderInstance = new ImageLoader(init);
const canvasInstance = new Canvas();
const clientSocketInstance = new ClientSocket();
const playerInstance = new Player(clientSocketInstance);
const platformSpriteInstance = new PlatformSprite(
  canvasInstance.ctx,
  imageLoaderInstance,
);
const playerSpriteInstance = new PlayerSprite(
  canvasInstance.ctx,
  imageLoaderInstance,
);
const otherPlayersSpriteInstance = new OtherPlayersSprite(
  canvasInstance.ctx,
  imageLoaderInstance,
);
const platformsInstance = new Platforms();
const keyPressInstance = new KeyPress(playerInstance);

debugger;
const portalSpriteInstance = new PortalSprite(
  canvasInstance.ctx,
  imageLoaderInstance,
);
debugger;
const portalsInstance = new Portals();
debugger;

// step frame
function step() {
  GameLoop({
    canvas: canvasInstance,
    player: playerInstance,
    playerSprite: playerSpriteInstance,
    otherPlayersSprite: otherPlayersSpriteInstance,
    platforms: platformsInstance,
    platformSprite: platformSpriteInstance,
    clientSocket: clientSocketInstance,
    keyPress: keyPressInstance,
    portalSprite: portalSpriteInstance,
    portals: portalsInstance,
  });
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
debugger;
function init() {
  debugger;
  step();
}
