import io from "socket.io-client";

let id;
const socket = io("http://localhost:5465");

export function onConnect(callback) {
  socket.on("connect", () => {
    id = socket.id;

    callback(id);
  });
}

export function connectPlayer(payload) {
  socket.emit("addPlayer", payload);
}

export function playerTurn(payload) {
  socket.emit("playerTurn", payload);
}

export function onPlayerTurn(callback) {
  socket.on("serverTurn", callback);
}

export function onNewPlayer(callback) {
  socket.on("newPlayer", callback);
}
