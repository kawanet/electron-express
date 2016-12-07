#!/usr/bin/env electron

process.chdir(__dirname);

var electron = require("electron");

var app = require("./lib/app");
var config = require("./lib/config");

electron.app.on("ready", start);

function start() {
  if (!config.port) {
    config.port = Math.floor(Math.random() * 40000 + 10000);
  }

  app.init();

  var url = "http://127.0.0.1:" + config.port + "/home/";
  console.warn("open:", url);

  var options = {
    width: 960,
    height: 640,
    webPreferences: {
      nodeIntegration: false
    }
  };

  var main = new electron.BrowserWindow(options);
  main.on("closed", electron.app.quit);
  // main.webContents.openDevTools();
  main.loadURL(url);
}
