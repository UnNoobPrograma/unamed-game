import io from "socket.io-client";

let id;
const socket = io("http://localhost:5465");

socket.on("connect", () => {
  id = socket.id;
});

export function onConnect(callback) {
  if (!id) {
    let interval;

    interval = setInterval(() => {
      if (id) {
        callback(id);
        clearInterval(interval);
      }
    }, 1000);
  } else {
    callback(id);
  }
}

export function onSyncServer(callback) {
  socket.on("SYNC", callback);
}

export function connectPlayer(payload) {
  socket.emit("addPlayer", payload);
}

export function playerTurn(payload) {
  socket.emit("playerTurn", payload);
}
