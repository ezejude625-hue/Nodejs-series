const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// INITIALIZE OBJECT

const myEmitter = new MyEmitter();

// ADD LISTENER FOR THE LOG EVENT

myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // EMIT EVENT
  myEmitter.emit("log", "Log event emitted!");
}, 2000);
