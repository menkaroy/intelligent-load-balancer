// // src/server.js

// const express = require("express");
// const apiRoutes = require("./routes/apiRoutes");
// const loggerMiddleware = require("./middleware/logger"); // Correct import statement

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(loggerMiddleware); // Use the imported middleware function

// app.use("/api", apiRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// src/server.js
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const loggerMiddleware = require("./middleware/logger");
const PriorityQueue = require("./queues/PriorityQueue");

const app = express();
const PORT = process.env.PORT || 3000;
const queue = new PriorityQueue();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", apiRoutes);

// Handle root path
app.get("/", (req, res) => {
  res.send("Hello from your Express server!");
});

function addTasks() {
  const randomPriority = Math.floor(Math.random() * 10);
  const task = `Task with priority ${randomPriority}`;
  queue.enqueue(task, randomPriority);
  console.log(`Added: ${task}`);
}

function processQueue() {
  if (queue.size() === 0) {
    console.log("Priority queue is empty");
  } else {
    const task = queue.dequeue();
    console.log(`Processing: ${task}`);
    // Here you would add the code to actually process the task
  }
}

// Simulate adding tasks to the queue every 2 seconds
setInterval(addTasks, 2000);

// Check and process the queue every 3 seconds
setInterval(processQueue, 3000);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
