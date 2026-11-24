// Main page

const math = require("./math");
const os = require("os");
const dns = require("dns");
const http = require("http");

console.log(math.add(2, 3));
console.log(math.subtract(2, 3));
console.log(math.multiply(2, 3));
console.log(math.divide(2, 3));
console.log(math.exponent(2, 3));

console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(os.release());
console.log(os.arch());
console.log(os.platform());

dns.lookup("www.google.com", (err, address, family) => {
  if (err) {
    console.error("Error occurred:", err);
  } else {
    console.log("Address:", address);
    console.log("Family:", family);
  }
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(
    "Hello World!, Created a Server though!; And it is working on the browser :)",
  );
});

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
