
const SVG = require('./svg'),
    Canvas = require('canvas'),
    path = require('path'),
    crypto = require('crypto'),
    async = require('async');

function v2(str, cb) {

  const hash = crypto.createHash('sha256');
  hash.update(str);
  const buff = hash.digest('hex');

  const canvas = new Canvas(300, 300);

  var hashByte = 0;
  
  const inc = () => {
    hashByte = (hashByte + 1) % buff.length;
    return hashByte;
  }

  const genNumberFromHash = (max) => {
    return (
      buff[inc()].charCodeAt(0) +
      buff[inc()].charCodeAt(0) +
      buff[inc()].charCodeAt(0)
    ) % max;
  }

  const genColorFromHash = () => {
    return [ genNumberFromHash(256), genNumberFromHash(256), genNumberFromHash(256) ];
  }

  const roboHash = [
    // { prefix: 'background/robotBG-', hash: genNumberFromHash(24), color: genColorFromHash() },
    { prefix: 'body/body-', hash: genNumberFromHash(10), color: genColorFromHash() },
    { prefix: 'face/face-', hash: genNumberFromHash(10), color: genColorFromHash() },
    { prefix: 'eyes/eyes-', hash: genNumberFromHash(10), color: genColorFromHash() },
    { prefix: 'mouth/mouth-', hash: genNumberFromHash(10), color: genColorFromHash() },
    { prefix: 'accessory/acc-', hash: genNumberFromHash(10), color: genColorFromHash() }
  ];

  async.waterfall(
    roboHash.map((part) => {
      let hash = part.hash + 1;
      let color = part.color;
      return function(next) {
        if (hash < 10) {
          hash = '0' + hash;
        }
        return SVG.renderFile(path.join(__dirname, '..', 'data', 'robostore', part.prefix) + hash + '.svg', canvas, color, (err, canvas) => {
          return next(err);
        })
      }
    }),
    (err) => {
      return cb(canvas.createPNGStream());
    }
  );

}

module.exports = v2;