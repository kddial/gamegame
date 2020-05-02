const { PLATFORM_SPRITE_W, PLATFORM_SPRITE_H } = window.gamegame.CONSTANTS;

class Platform {
  constructor(x, y, width, spriteSeed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.spriteSeed = spriteSeed; // used to randomize sprites for uniqe look

    this.xHitBox = 0 + this.x; // in reference to canvas (so we add local origin)
    this.yHitBox = 37 + this.y; // in reference to canvas (so we add local origin)
    this.widthHitBox = this.width;
    this.heightHitBox = PLATFORM_SPRITE_H - (this.yHitBox - this.y); // reach the bottom of the sprite
  }
}

window.gamegame.classes.Platform = Platform;
export default Platform;
