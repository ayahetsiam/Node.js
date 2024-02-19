const logEvent = require("./logEvent");

const EventEmiter = require("events");

class MyEmiter extends EventEmiter {}

const myEmiter = new MyEmiter();

myEmiter.on("log", (msg) => logEvent(msg));

setTimeout(() => {
  myEmiter.emit("log", "Evenement emit");
}, 2000);
