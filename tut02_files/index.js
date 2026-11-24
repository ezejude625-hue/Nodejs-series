const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "newReply.txt"),
      "Nice to meet you!"
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "newReply.txt"),
      "\n\nYes it is!"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "newReply.txt"),
      path.join(__dirname, "files", "newReply2.txt")
    );
  } catch (err) {
    console.error(`There was an error: ${err}`);
  }
};

fileOps();

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data.toString());
  }
);

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you!",
  (err) => {
    if (err) throw err;
    console.log("Write completed");
  }
);

fs.appendFile(
  path.join(__dirname, "files", "test.txt"),
  "Testing text",
  (err) => {
    if (err) throw err;
    console.log("Append completed");
  }
);

fs.rename(
  path.join(__dirname, "files", "reply.txt"),
  path.join(__dirname, "files", "newReply.txt"),
  (err) => {
    if (err) throw err;
    console.log("Rename completed");
  }
);

const rs = fs.createReadStream(path.join(__dirname, "files", "starter.txt"), {
  encoding: "utf8"
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "reply.txt"));

// events to listen to on the read stream

rs.on("data", (chunk) => {
  ws.write(chunk);
});

rs.on("error", (err) => {
  console.error(err);
});

rs.on("end", () => {
  console.log("Read stream ended");
  ws.end();
});

// Pipe the read stream to the write stream (does the same as above but is more efficient event-based approach)
rs.pipe(ws);

fs.mkdir(path.join(__dirname, "files", "new"), { recursive: true }, (err) => {
  if (err) throw err;
  console.log("Folder created");
});

fs.rmdir(path.join(__dirname, "files", "new"), { recursive: true }, (err) => {
  if (err) throw err;
  console.log("Folder deleted");
});

fs.readdir(path.join(__dirname, "files"), (err, files) => {
  if (err) throw err;
  console.log("Files in the directory:");
  files.forEach((file) => {
    console.log(file);
  });
});

fs.stat(path.join(__dirname, "files", "starter.txt"), (err, stats) => {
  if (err) throw err;
  console.log(stats);
  console.log(`Is file: ${stats.isFile()}`);
  console.log(`Is directory: ${stats.isDirectory()}`);
});

fs.watch(path.join(__dirname, "files"), (eventType, filename) => {
  console.log(`Event type: ${eventType}`);
  console.log(`Filename: ${filename}`);
});

fs.watchFile(path.join(__dirname, "files", "starter.txt"), (curr, prev) => {
  console.log(`Current mtime: ${curr.mtime}`);
  console.log(`Previous mtime: ${prev.mtime}`);
});

fs.unwatchFile(path.join(__dirname, "files", "starter.txt"));

if (!fs.existsSync(path.join(__dirname, "files", "starter.txt"))) {
  console.log("File does not exist");
}

/*
fs.readFile("./files/starter.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1); // mandatory (as per the Node.js docs)
});
*/
