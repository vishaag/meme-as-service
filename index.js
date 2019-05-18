let Jimp = require('jimp');
let fs = require('fs');

module.exports = (req, res) => {
  Jimp.read(__dirname + '/philosoraptor.jpg')
  .then(image => {
    console.log(__dirname + '/open-sans-32-white.png')
    Jimp.loadFont(__dirname + '/open-sans-32-white.fnt').then(font => {
      image.print(font, 10, 10, 'Hello worlds!');
      image.writeAsync('/tmp/phil.jpg').then(function () {
        img = fs.readFileSync('/tmp/phil.jpg');
        fs.unlinkSync('/tmp/phil.jpg')
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
      }) 
      .catch(err => {p
        console.error(err);
      });
    })
    .catch(err => {
      console.error(err);
    });
  })
  .catch(err => {
    console.error(err);
  });
};