const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const logItem = `${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (error) {
    console.log(error);
  }
};

module.exports = logEvents;
