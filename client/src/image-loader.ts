import CONSTANTS from './constants.js';
const { IMG_PATH_PREFIX } = CONSTANTS;

class ImageLoader {
  onLoadCallback: () => void;
  playerSpriteImg: HTMLImageElement;
  platformSpriteImg: HTMLImageElement;
  portalSpriteImg: HTMLImageElement;
  imageLoadCount: number;
  expectedImageLoadCount: number;

  constructor(onLoadCallback: () => void) {
    this.onLoadCallback = onLoadCallback;
    this.imageLoadCount = 0;

    this.expectedImageLoadCount = 3;
    this.loadPlayerSpriteImage();
    this.loadPlatformSpriteImage();
    this.loadPortalSpriteImg();
  }

  loadPlayerSpriteImage() {
    this.playerSpriteImg = new Image();
    this.playerSpriteImg.addEventListener('load', () => {
      this.imageLoadCount++;
      console.log('Player sprite image loaded.');
      this.callOnLoadCallback();
    });
    const IMG_FILENAME = 'adventurer-v1_5-sheet.png';
    this.playerSpriteImg.src = IMG_PATH_PREFIX + IMG_FILENAME;
  }

  loadPlatformSpriteImage() {
    this.platformSpriteImg = new Image();
    this.platformSpriteImg.addEventListener('load', () => {
      this.imageLoadCount++;
      console.log('Platform sprite image loaded.');
      this.callOnLoadCallback();
    });
    const IMG_FILENAME = 'platform_v1.1.png';
    this.platformSpriteImg.src = IMG_PATH_PREFIX + IMG_FILENAME;
  }

  loadPortalSpriteImg() {
    this.portalSpriteImg = new Image();
    this.portalSpriteImg.addEventListener('load', () => {
      this.imageLoadCount++;
      console.log('Portal sprite image loaded.');
      this.callOnLoadCallback();
    });
    const IMG_FILENAME = 'portal_v3.png';
    this.portalSpriteImg.src = IMG_PATH_PREFIX + IMG_FILENAME;
  }

  callOnLoadCallback() {
    if (this.imageLoadCount === this.expectedImageLoadCount) {
      console.log(`All ${this.expectedImageLoadCount} images have loaded.`);
      this.onLoadCallback();
    }
  }
}

export default ImageLoader;
