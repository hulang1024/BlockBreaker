
class BlockBreaker {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.canvas.width = 500;
    this.canvas.height = 300;

    this.context = canvas.getContext('2d');

    var game = this;

    GameRes.load(function() {
      var blocks = createBlocks();
      var paddle = new Paddle(game);
      var ball = new Ball(game, paddle, blocks);
      var paused = true;

      document.addEventListener('keydown', function(event) {
        var key = event.code;
        switch (key) {
          case 'ArrowLeft':
            paddle.leftMove();
            break;
          case 'ArrowRight':
            paddle.rightMove();
            break;
          case 'Space':
            if (paused) {
              paused = false;
            }
            ball.fire();
            break;
          case 'Enter':
            paused = !paused;
            break;
        }
      });
      document.addEventListener('keyup', function() {
        paddle.stopMove();
      });

      document.getElementById('fps').addEventListener('input', function() {
        fps = this.value;
      });

      var dragEnabled = false;
      game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX;
        var y = event.offsetY;

        if (ball.hasPoint(x, y)) {
          dragEnabled = true;
        }
      });
      game.canvas.addEventListener('mousemove', function(event) {
        if (!dragEnabled)
          return;

        var x = event.offsetX;
        var y = event.offsetY;
        ball.moveTo(x, y);
      });
      game.canvas.addEventListener('mouseup', function(event) {
        dragEnabled = false;
      });

      loop();

      var fps = 60;

      function loop() {
        if (!paused) {
          ball.update();
          paddle.update();
          for (var b of blocks) {
            b.update();
          }
        }

        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        ball.draw();
        paddle.draw();
        for (var b of blocks) {
          b.draw();
        }

        setTimeout(loop, 1000/fps);
      }
    })

    function createBlocks() {
      var blockSepcs = [
        [60, 50, 1],
        [200, 50, 2],
        [340, 50, 2]
      ];
      var blocks = [];
      for (var i = 0; i < blockSepcs.length; i++) {
        var b = new Block({
          game: game,
          x: blockSepcs[i][0],
          y: blockSepcs[i][1],
          lives: blockSepcs[i][2]
        });

        blocks.push(b);
      }

      return blocks;
    }
  }
}

new BlockBreaker();
