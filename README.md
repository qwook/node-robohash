`node-robohash` is intended to implement @e1ven's [Robohash](https://github.com/e1ven/Robohash). Original code by [@donpark](https://github/donpark/node-robohash).

Can be used for a fun way to quickly generate "avatars" for unique strings. Example include: robots generated for hostnames, robots generated for release numbers.

# Status

Rendering and generating robots based on hash is implemented.

Project has been stripped down and coffeescript removed.

svg.js is generated from the original svg.coffee, and has a lot of formatting issues.

SVG parsing and rendering code is based on relevant code in [Fabric.js](https://github.com/kangax/fabric.js). I'll add the necessary mentions ASAP.

# Known Issues

Background SVG files are not being rendered correctly, likely because
relevent SVG elements are rendered.

`svg.coffee` module is currently hardwired to handle Robohash SVG files and replaces specific color values with random color. This will be cleaned up and expanded later.

# Installation

    git clone git://github.com/qwook/node-robohash.git
    cd node-robohash
    npm install
    
# Launching

    cd node-robohash
    npm start

You should see a robot at [http://localhost:3030/test](http://localhost:3030/test):
