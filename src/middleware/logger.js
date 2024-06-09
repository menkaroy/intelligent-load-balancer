// const fs = require("fs");
// const path = require("path");

// const logFilePath = path.join(__dirname, "../../logs/requests.log");
// const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// function loggerMiddleware(req, res, next) {
//   const start = Date.now();

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     const log = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;
//     logStream.write(log);
//   });

//   next(); // Don't forget to call next() to pass control to the next middleware
// }

// module.exports = loggerMiddleware;
const fs = require("fs");
const path = require("path");

// Define the writable log directory and file
const logDirectory = "/tmp/logs";
const logFilePath = path.join(logDirectory, "requests.log");

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a write stream for logging
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

function loggerMiddleware(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;
    logStream.write(log);
  });

  next(); // Don't forget to call next() to pass control to the next middleware
}

module.exports = loggerMiddleware;
