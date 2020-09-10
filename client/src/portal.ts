import CONSTANTS from './constants.js';
const { PORTAL_SPRITE_W } = CONSTANTS;

class Portal {
  x: number;
  y: number;
  width: number;
  xHitBox: number;
  yHitBox: number;
  widthHitBox: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = PORTAL_SPRITE_W;

    this.xHitBox = 0 + this.x; // in reference to canvas (so we add local origin)
    this.yHitBox = 36 + this.y; // in reference to canvas (so we add local origin)
    this.widthHitBox = this.width;
  }
}

export default Portal;
