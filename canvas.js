class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  drawFrame(callback) {
    const { width, height } = this;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(0, 0, width, height);
    callback();
  }
}

export default Canvas;
