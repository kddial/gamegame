import PlatformSprite from './platform-sprite.js';
import PlayerSprite, { OtherPlayersSprite } from './player-sprite.js';
import Player from './player.js';
import Canvas from './canvas.js';
import GameLoop from './game-loop.js';
import KeyPress from './key-press.js';
import Platform from './platform.js';
import Platforms from './platforms.js';
import ClientSocket from './client-socket.js';
import CONSTANTS from './constants.js';

const canvasInstance = new Canvas();
const clientSocketInstance = new ClientSocket();
const playerInstance = new Player(clientSocketInstance);
const platformSpriteInstance = new PlatformSprite(canvasInstance.ctx);
const playerSpriteInstance = new PlayerSprite(canvasInstance.ctx, init);
const otherPlayersSpriteInstance = new OtherPlayersSprite(canvasInstance.ctx);
const platformsInstance = new Platforms();
const keyPressInstance = new KeyPress(playerInstance);

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
  });
  window.requestAnimationFrame(step);
  return;
}

// init code when sprites are done loading
function init() {
  step();
}
