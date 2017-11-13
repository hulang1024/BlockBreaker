/*
挡板
*/
class Paddle extends Drawable {
  constructor(game) {
    super();
    this.game = game;

    this._width = 100;
    this._height = 25;
    this._x = (this.game.canvas.width - this._width) / 2;
    this._y = 250;

    this._speedX = 0;
    this._img = GameRes.getImageByName('paddle');
  }

  leftMove() {
    this._speedX = -5;
  }

  rightMove() {
    this._speedX = +5;
  }

  stopMove() {
    this._speedX = 0;
  }

  move() {
    if (this._speedX < 0) {
      if (this._x + this._speedX < 0) {
        this._x = 0;
        this._speedX = 0;
      }
    } else {
      if (this._x + this._width + this._speedX > this.game.canvas.width) {
        this._x = this.game.canvas.width - this._width;
        this._speedX = 0;
      }
    }

    this._x += this._speedX;
  }

  update() {
    this.move();
  }

  draw() {
    this.game.context.drawImage(this._img, this._x, this._y);
  }
}
