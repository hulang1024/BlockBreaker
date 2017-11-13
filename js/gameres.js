var GameRes = (function() {
    var imageMap = [];

    return class {
      static load(success) {
        // load images
        var filenames = ['paddle.png', 'ball.png', 'block.png'];
        var loadCnt = 0;
        for (var name of filenames) {
          var img = new Image();
          img.src = 'res/img/' + name;
          img.onload = function() {
            loadCnt++;
            if (loadCnt == filenames.length) {
              success();
            }
          };
          // 加入map
          imageMap[name.substring(0, name.lastIndexOf('.'))] = img;
        }
      }

      static getImageByName(name) {
        return imageMap[name];
      }
  }
})();
