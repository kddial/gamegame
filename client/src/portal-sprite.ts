import CONSTANTS from './constants.js';
const { PORTAL_SPRITE_W, PORTAL_SPRITE_H } = CONSTANTS;
import ImageLoader from './image-loader.js';
import Portals from './portals.js';

export default class PortalSprite {
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, imageLoader: ImageLoader) {
    this.img = imageLoader.portalSpriteImg;
    this.ctx = ctx;
  }

  drawImage(
    sourceXi = 0,
    sourceYi = 0,
    destX = 0,
    destY = 0,
    width = PORTAL_SPRITE_W,
  ) {
    if (!!this.img?.src === false) {
      console.log('Platform image not loaded yet');
      return;
    }
    this.ctx.drawImage(
      this.img,
      sourceXi, // source image x position
      sourceYi, // source image y position
      width, // source image width
      PORTAL_SPRITE_H, // source image height
      destX, // destination canvas x
      destY, // destination canvas y
      width, // destination canvas width (if diff than source img width, then it will stretch or shrink)
      PORTAL_SPRITE_H, // destination canvas height (if diff than source img height, then it will stretch of shrink)
    );
  }

  drawPortals(portals: Portals) {
    const { instances } = portals;

    instances.forEach((portalInstance) => {
      const { x, y, width } = portalInstance;
      this.drawImage(0, 0, x, y, width);
    });
  }
}
