// home.js

function init() {
  var form = document.querySelector(".form form");
  var name = form.querySelector("input[name=name]");
  var message = form.querySelector("input[name=message]");
  form.onsubmit = send;
  return client();

  function send() {
    client().then(function(ws) {
      var msg = {};
      msg.date = new Date();
      msg.name = name.value;
      msg.message = message.value;
      ws.send(msg);
    });
    return false;
  }
}

function client() {
  if (client.ws) return Promise.resolve(client.ws);

  var protocol = (location.protocol === "https:") ? "wss:" : "ws:";
  var host = location.host || "127.0.0.1:3000";
  var endpoint = protocol + "//" + host + "/ws";

  return connect(endpoint).then(function(ws) {
    msgpackWebSocket(ws, ondata);
    ws.addEventListener("error", clear);
    ws.addEventListener("close", clear);
    client.ws = ws;
    return ws;
  });

  function clear() {
    client.ws = null;
  }
}

function connect(endpoint) {
  return new Promise(function(resolve, reject) {
    var ws = new WebSocket(endpoint);
    ws.onopen = onopen;
    ws.onerror = reject;

    function onopen() {
      ws.onerror = null;
      resolve(ws);
    }
  });
}

function ondata(msg) {
  var ul = document.querySelector(".log ul");
  var li = document.createElement("li");
  li.appendChild(createSPAN(strftime("[%H:%M:%S]", msg.date), "date"));
  li.appendChild(createSPAN("<" + msg.name + ">", "name"));
  li.appendChild(createSPAN(msg.message, "message"));
  ul.insertBefore(li, ul.firstChild);

  function createSPAN(text, className) {
    var span = document.createElement("span");
    span.innerText = text;
    span.className = className;
    return span;
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
