class Block extends Drawable {
  constructor(spec) {
    super();
    this.game = spec.game;

    this._x = spec.x;
    this._y = spec.y;
    this._width = 100;
    this._height = 30;
    this._lives = spec.lives || 1;

    this._img = GameRes.getImageByName('block');
  }

  isAlive() { return this._lives > 0; }

  break() {
    if (this._lives > 0)
      this._lives--;
  }

  draw() {
    if (this._lives == 0)
      return;
    this.game.context.drawImage(this._img, this._x, this._y);
  }
}
