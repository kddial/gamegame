import SOCKET_CONSTANTS from './socket-constants.js';

const CONSTANTS = {
  // debug variables
  SHOW_SOCKET_INFO: false,
  SHOW_HIT_BOX: false,
  SHOW_SPRITE_BOX: false, // depends on SHOW_HIT_BOX being true

  HIT_BOX_COLOR: 'red',
  SPRITE_BOX_COLOR: 'blue',

  IMG_PATH_PREFIX: '/img/',

  RIGHT: 'RIGHT',
  LEFT: 'LEFT',

  // player sprite poses
  IDLE: 'IDLE',
  RUN: 'RUN',
  JUMP: 'JUMP',

  // finite state machine for player button state
  // input is keyboard keys and previous button state
  // output is new player button state
  IDLE_RIGHT: 'IDLE_RIGHT',
  IDLE_LEFT: 'IDLE_LEFT',
  JUMP_RIGHT: 'JUMP_RIGHT',
  JUMP_LEFT: 'JUMP_LEFT',
  RUN_RIGHT: 'RUN_RIGHT',
  RUN_LEFT: 'RUN_LEFT',

  // player physics
  RUN_X_VELOCITY: 2,
  JUMP_Y_VELOCITY: -8,
  GRAVITY_Y_VELOCITY: 0.5,

  // player sprite dimensions
  PLAYER_SPRITE_W: 50,
  PLAYER_SPRITE_H: 37,

  // platform floor y
  PLATFORM_FLOOR_Y: 550,

  // platform sprite dimensions
  PLATFORM_SPRITE_W: 200,
  PLATFORM_SPRITE_H: 48,

  // socket constants
  ...SOCKET_CONSTANTS,

  // DOM ids
  PLAYER_NAME_INPUT_ID: 'player-name-input',
  MESSAGE_INPUT_ID: 'message-input',
  CANVAS_ID: 'canvas',
};

window.CONSTANTS = CONSTANTS;

export default CONSTANTS;
