let Jimp = require('jimp');
let fs = require('fs');

module.exports = (req, res) => {
  Jimp.read(__dirname + '/philosoraptor.jpg')
  .then(image => {
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
      image.print(font, 10, 10, 'Hello worlds!');
      image.write('/tmp/phil.jpg', 
        function () {
          img = fs.readFileSync('/tmp/phil.jpg');
          fs.unlinkSync('/tmp/phil.jpg')
          res.writeHead(200, {'Content-Type': 'image/jpg' });
          res.end(img, 'binary');
        }
      )
    });
  })
  .catch(err => {
    console.error(err);
  });
};