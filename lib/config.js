// config.js

var argv = require("process.argv")(process.argv.slice(2));

var config = {
  port: 3000
};

// apply options given on CLI arguments
config = argv(config);

module.exports = config;
