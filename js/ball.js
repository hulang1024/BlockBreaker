class Ball extends Drawable {
  constructor(game, paddle, blocks) {
    super();

    this.game = game;
    this.paddle = paddle;
    this.blocks = blocks;

    this._width = 20;
    this._height = 20;
    this._x = (this.game.canvas.width - this._width) / 2;
    this._y = 210;

    this._speedX = 0;
    this._speedY = 0;

    this._fired = false;

    this._img = GameRes.getImageByName('ball');
  }

  fire() {
    if (this._fired)
      return;
    this._fired = true;
    this._speedX = 5;
    this._speedY = -5;
  }

  isCollision(b) {
    if ((b.getY() + b.getHeight() > this._y) &&
        (b.getX() < this._x && this._x + this._width < b.getX() + b.getWidth())) {
      return true;
    }
    return false;
  }

  hasPoint(x, y) {
    return (this._x <= x && x <= this._x + this._width) &&
           (this._y <= y && y <= this._y + this._height);
  }

  moveTo(x, y) {
    this._x = x;
    this._y = y;
  }

  update() {
    this._x += this._speedX;
    this._y += this._speedY;

    if (this._x < 0 || this._x + this._width > this.game.canvas.width) {
      this._speedX = -this._speedX;
    }
    if (this._y < 0 || this._y + this._height > this.game.canvas.height) {
      this._speedY = -this._speedY;
    }

    if (this.paddle.y < this._y + this._height
      && (this.paddle.x < this._x && this._x + this._width < this.paddle.x + this.paddle.width)) {
      this._speedY = -this._speedY;
    }

    for (var block of this.blocks) {
      if (block.isAlive() && this.isCollision(block)) {
        this._speedY = -this._speedY;
        block.break();
        break;
      }
    }
  }

  draw() {
    this.game.context.drawImage(this._img, this._x, this._y, this._width, this._height);
  }
}
