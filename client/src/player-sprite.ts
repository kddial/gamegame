import Player from './player.js';
import { drawBorderRect, drawFillRect } from './draw-helpers.js';
import CONSTANTS from './constants.js';
const {
  IMG_PATH_PREFIX,
  IDLE,
  RUN,
  JUMP,
  PLAYER_SPRITE_W,
  PLAYER_SPRITE_H,
  SPRITE_BOX_COLOR,
  HIT_BOX_COLOR,
  SHOW_SPRITE_BOX,
} = CONSTANTS;
const IMG_SPRITE_PATH = 'adventurer-v1_5-sheet.png';

const SPRITE_POSES = {
  [IDLE]: {
    // frames to wait before rendering next pose picture
    framesPerPicture: 8,
    // sprite sheet coordinates
    coordinates: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  },
  [RUN]: {
    framesPerPicture: 8,
    coordinates: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ],
  },
  [JUMP]: {
    // TODO:i dont like all the frames, play with the number
    framesPerPicture: 12,
    coordinates: [
      // [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  },
};

class PlayerSprite {
  loaded: boolean;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  pose: string;
  poseIndex: number;
  frameCounter: number;
  horizontalScale: number;

  constructor(ctx: CanvasRenderingContext2D, loadedCallback: () => void) {
    this.loaded = false;
    this.img = new Image();
    this.img.addEventListener('load', () => {
      console.log('player image loaded');
      this.loaded = true;
      loadedCallback();
    });
    this.img.src = IMG_PATH_PREFIX + IMG_SPRITE_PATH;
    this.ctx = ctx;
    this.pose = IDLE;
    this.poseIndex = 0;
    this.frameCounter = 0;
    this.horizontalScale = 1; // 1 means right direction, -1 means left direction
  }

  drawImage(sourceXi = 0, sourceYi = 0, destX = 0, destY = 0) {
    if (this.loaded === false) {
      console.log('image not loaded yet');
      return;
    }

    if (this.horizontalScale === 1) {
      this.ctx.drawImage(
        this.img,
        PLAYER_SPRITE_W * sourceXi,
        PLAYER_SPRITE_H * sourceYi,
        PLAYER_SPRITE_W,
        PLAYER_SPRITE_H,
        destX,
        destY,
        PLAYER_SPRITE_W,
        PLAYER_SPRITE_H,
      );
    } else {
      // draw facing left direction by flipping horizontally
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.img,
        PLAYER_SPRITE_W * sourceXi,
        PLAYER_SPRITE_H * sourceYi,
        PLAYER_SPRITE_W,
        PLAYER_SPRITE_H,
        -1 * (destX + PLAYER_SPRITE_W),
        destY,
        PLAYER_SPRITE_W,
        PLAYER_SPRITE_H,
      );
      this.ctx.scale(-1, 1); // revert scale transformation
    }
  }

  drawSpritePose(destX = 0, destY = 0) {
    const { pose } = this;
    const { coordinates, framesPerPicture } = SPRITE_POSES[pose];

    const drawPose = () => {
      const poseX = coordinates[this.poseIndex][0];
      const poseY = coordinates[this.poseIndex][1];
      this.drawImage(poseX, poseY, destX, destY);
    };

    // if in jump pose, stay on the last frame until post changes
    if (this.pose === JUMP && this.poseIndex === coordinates.length - 1) {
      drawPose();
      return;
    }

    // do not render new pose frame until numOfFrames have past
    if (this.frameCounter < framesPerPicture) {
      this.frameCounter++;
      drawPose();
      return;
    }

    // render a new pose frame and increment poseIndex
    this.frameCounter = 0;
    if (this.poseIndex + 1 >= coordinates.length) {
      this.poseIndex = 0;
    } else {
      this.poseIndex++;
    }
    drawPose();
  }

  setSpritePose(pose: string) {
    if (pose !== this.pose) {
      this.pose = pose;
      this.poseIndex = 0;
    }
  }

  setHorizontalScale(horizontalScale: number) {
    // render the sprite as is, or horizontally flipped
    if (horizontalScale !== this.horizontalScale) {
      this.horizontalScale = horizontalScale;
    }
  }

  drawPlayerSprite(player: Player) {
    const { x, y, pose, horizontalScale, name, messages } = player;
    this.setHorizontalScale(horizontalScale);
    this.setSpritePose(pose);
    this.drawSpritePose(x, y);
    this.drawPlayerName(x, y, name);
    this.drawMessages(x, y, messages);
  }

  drawMockPlayerSprite(
    x: number,
    y: number,
    pose: string,
    horizontalScale: number,
    name: string,
  ) {
    this.setHorizontalScale(horizontalScale);
    this.setSpritePose(pose);
    this.drawSpritePose(x, y);
    this.drawPlayerName(x, y, name);
  }

  drawPlayerHitBox(player: Player) {
    const { x, y } = player;
    const {
      xHitBox,
      yHitBox,
      widthHitBox,
      heightHitBox,
    } = player.getHitBoxProps();

    // sprite box
    SHOW_SPRITE_BOX &&
      drawBorderRect(
        this.ctx,
        x,
        y,
        PLAYER_SPRITE_W,
        PLAYER_SPRITE_H,
        SPRITE_BOX_COLOR,
      );

    // hit box
    drawBorderRect(
      this.ctx,
      xHitBox,
      yHitBox,
      widthHitBox,
      heightHitBox,
      HIT_BOX_COLOR,
    );
  }

  drawPlayerName(x: number, y: number, name: string) {
    if (!!name === false) {
      return;
    }
    const LETTER_WIDTH = 8.5; // based on monospaced 14px
    const rectWidth = name.length * LETTER_WIDTH;
    const xDisplaced = this.calculateXDisplaced(x, rectWidth);
    const yUnderPlayer = y + PLAYER_SPRITE_H + 2;

    // draw background white rect under text with opacity
    this.ctx.globalAlpha = 0.9;
    drawFillRect(this.ctx, xDisplaced, yUnderPlayer, rectWidth, 14, 'white');
    this.ctx.globalAlpha = 1.0;

    // draw text
    this.ctx.font = 'normal 14px monospace';
    this.ctx.fillStyle = 'black';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(name, xDisplaced, yUnderPlayer);
  }

  // Must render rects as an X point. So we calculated how far
  // want want to displace x to the left, so that the rectangle
  // is rendered centered to the player
  calculateXDisplaced(xPlayer: number, rectWidth: number) {
    // find the difference between the two mids, and add that to x
    // to render the text in the center below the sprite
    const diffInX = PLAYER_SPRITE_W / 2 - rectWidth / 2;
    const xDisplaced = xPlayer + diffInX;
    return xDisplaced;
  }

  drawMessages(x: number, y: number, messages: Array<[number, string]>) {
    if (messages.length === 0) {
      return;
    }

    const message = messages[0][1];
    const LETTER_WIDTH = 8.5; // based on monospaced 14px
    const rectWidth = message.length * LETTER_WIDTH;
    const xDisplaced = this.calculateXDisplaced(x, rectWidth);
    const messageHeight = 14;
    const yAbovePlayer = y - messageHeight;

    // draw background white rect under text with opacity
    this.ctx.globalAlpha = 0.9;
    drawFillRect(
      this.ctx,
      xDisplaced,
      yAbovePlayer,
      rectWidth,
      messageHeight,
      'white',
    );
    this.ctx.globalAlpha = 1.0;

    // draw text
    this.ctx.font = 'normal 14px monospace';
    this.ctx.fillStyle = 'black';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(message, xDisplaced, yAbovePlayer);
  }
}

// Class to handle rendering other client player's sprites
export class OtherPlayersSprite {
  ctx: CanvasRenderingContext2D;
  otherPlayersSpriteInstances: {
    [key: string]: PlayerSprite;
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.otherPlayersSpriteInstances = {};
  }

  renderOtherPlayersSprite = (
    otherPlayersInfoArray: Array<OtherPlayerInfo>,
    otherPlayersNameById: { [key: string]: string },
  ) => {
    otherPlayersInfoArray.forEach((otherPlayerInfo) => {
      const { x, y, pose, horizontalScale, id } = otherPlayerInfo;
      const playerName = otherPlayersNameById[id] ?? '';

      if (
        Object.keys(this.otherPlayersSpriteInstances).includes(id) === false
      ) {
        // instance does not exist, create new
        const spriteInstance = new PlayerSprite(this.ctx, () => {});
        this.otherPlayersSpriteInstances[id] = spriteInstance;
      }

      this.otherPlayersSpriteInstances[id].drawMockPlayerSprite(
        x,
        y,
        pose,
        horizontalScale,
        playerName,
      );
    });

    // remove any leftover sprite instances from this.otherPlayersSpriteInstances
    const otherPlayersId = otherPlayersInfoArray.map((info) => info.id);
    Object.keys(this.otherPlayersSpriteInstances).forEach((instanceId) => {
      if (otherPlayersId.includes(instanceId) === false) {
        this.otherPlayersSpriteInstances[instanceId] = undefined;
        delete this.otherPlayersSpriteInstances[instanceId];
      }
    });
  };
}

export default PlayerSprite;
