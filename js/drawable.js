class Drawable {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._width = 0;
    this._height = 0;
    console.log('init drawable');
  }

  getX() { return this._x; }
  getY() { return this._y; }
  getWidth() { return this._width; }
  getHeight() { return this._height; }

  update() {}

  draw() {}
}
