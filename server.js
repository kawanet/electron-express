#!/usr/bin/env node

process.chdir(__dirname);

var app = require("./lib/app");
var config = require("./lib/config");

function CLI() {
  var cnt = 0;

  // Launch HTTP server
  if (config.port && ++cnt) app.init();

  // show help message if --help given
  if (config.help && ++cnt) {
    require("fs").createReadStream(__dirname + "/README.md").pipe(process.stderr);
  }

  // show minimal usage message
  if (!cnt) {
    var cmd = process.argv[1].split("/").pop();
    console.warn("Usage: " + cmd + " --port=3000 --help");
    process.exit(1);
  }
}

CLI();
