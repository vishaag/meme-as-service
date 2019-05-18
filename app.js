let http = require('http');
let Jimp = require('jimp');
let fs = require('fs');
const { parse } = require('querystring');
const { text } = require('micro')


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {


  Jimp.read('./philosoraptor.jpg')
  .then(image => {
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
      console.log(Jimp.FONT_SANS_32_WHITE);
      image.print(font, 10, 10, 'Hey!');
      // image.print(font, 10, 300, 'Hello worlds!Hello worlds!');
      image.write('phil.jpg', 
        function () {
          img = fs.readFileSync('phil.jpg');
          fs.unlinkSync('phil.jpg')
          res.writeHead(200, {'Content-Type': 'image/jpg' });
          res.end(img, 'binary');
        }
      )
    });
  })
  .catch(err => {
    console.error(err);
  });
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});