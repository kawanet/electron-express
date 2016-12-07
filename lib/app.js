// app.js

var bodyParser = require("body-parser");
var express = require("express");
var createServer = require("http").createServer;
var morgan = require("morgan");
var WebSocketServer = require("ws").Server;

exports.init = init;

var config = require("./config");

function init() {
  var app = express();

  app.use(morgan("tiny"));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.get("/ok", function(req, res) {
    res.status(200).end();
  });

  // app.all("/v2/:action", mw());

  app.use(express.static("public"));

  var server = createServer();
  server.on("request", app);

  var wss = new WebSocketServer({server: server});
  var clients = {};
  wss.on("connection", onconnected);

  server.listen(config.port, function() {
    console.warn("Listen: " + config.port);
  });

  function onconnected(ws) {
    var idx = ++onconnected.idx || (onconnected.idx = 1);
    clients[idx] = ws;
    msgpackWebSocket(ws, ondata);
    ws.on("close", clear);
    ws.on("error", clear);

    function clear() {
      delete clients[idx];
      ws = null;
    }
  }

  function ondata(data) {
    Object.keys(clients).forEach(function(idx) {
      var ws = clients[idx];
      if (ws) ws.send(data); // echo
    });
  }
}

function msgpackWebSocket(ws, ondata) {
  var _msgpack = ("undefined" !== typeof msgpack) ? msgpack : require("msgpack-lite");
  var _send = ws.send;
  ws.send = send;
  ws.onmessage = onmessage;
  ws.binaryType = "arraybuffer";
  return ws;

  function send(data, callback) {
    data = new Uint8Array(_msgpack.encode(data)).buffer;
    return _send.call(ws, data, callback);
  }

  function onmessage(msg) {
    var data = _msgpack.decode(new Uint8Array(msg.data));
    if (ondata) return ondata.call(ws, data);
  }
}
