// const express = require("express");
// const {
//   handleRESTRequest,
//   handleGraphQLRequest,
//   handleGRPCRequest,
//   handleFastResponse,
//   handleSlowResponse,
// } = require("../handlers/apiHandlers");
// const FIFOQueue = require("../queues/FIFOQueue");
// const PriorityQueue = require("../queues/PriorityQueue");
// const RoundRobinQueue = require("../queues/RoundRobinQueue");

// const router = express.Router();

// // Initialize queues
// const fifoQueue = new FIFOQueue();
// const priorityQueue = new PriorityQueue();
// const roundRobinQueue = new RoundRobinQueue();
// roundRobinQueue.addQueue("queue1");
// roundRobinQueue.addQueue("queue2");

// // Route for randomized routing
// router.post("/random", (req, res) => {
//   const endpoints = ["endpoint1", "endpoint2", "endpoint3"];
//   const randomEndpoint =
//     endpoints[Math.floor(Math.random() * endpoints.length)];
//   res.send(`Routed to ${randomEndpoint}`);
// });

// // Route for custom criteria
// router.post("/custom", (req, res) => {
//   const { customCriteria } = req.body;
//   if (customCriteria === "fast") {
//     handleFastResponse(res);
//   } else {
//     handleSlowResponse(res);
//   }
// });

// // Route to handle payload size
// router.post("/size", (req, res) => {
//   const payload = req.body.payload;
//   if (Buffer.byteLength(JSON.stringify(payload)) > 1000) {
//     res.send("Handled large payload");
//   } else {
//     res.send("Handled small payload");
//   }
// });

// // Route to handle different API types (REST, GraphQL, gRPC)
// router.post("/:type", (req, res) => {
//   const { type } = req.params;
//   const { payload } = req.body;

//   if (type === "REST") {
//     handleRESTRequest(payload, res);
//   } else if (type === "GraphQL") {
//     handleGraphQLRequest(payload, res);
//   } else if (type === "gRPC") {
//     handleGRPCRequest(payload, res);
//   } else {
//     res.status(400).send("Unsupported API type");
//   }
// });

// // Route for randomized routing
// // router.post("/random", (req, res) => {
// //   const endpoints = ["endpoint1", "endpoint2", "endpoint3"];
// //   const randomEndpoint =
// //     endpoints[Math.floor(Math.random() * endpoints.length)];
// //   res.send(`Routed to ${randomEndpoint}`);
// // });

// // Route for custom criteria
// // router.post("/custom", (req, res) => {
// //   const { customCriteria } = req.body;
// //   if (customCriteria === "fast") {
// //     handleFastResponse(res);
// //   } else {
// //     handleSlowResponse(res);
// //   }
// // });

// module.exports = router;
const express = require("express");
const {
  handleRESTRequest,
  handleGraphQLRequest,
  handleGRPCRequest,
  handleFastResponse,
  handleSlowResponse,
} = require("../handlers/apiHandlers");
const FIFOQueue = require("../queues/FIFOQueue");
const PriorityQueue = require("../queues/PriorityQueue");
const RoundRobinQueue = require("../queues/RoundRobinQueue");

const router = express.Router();

// Initialize queues
const fifoQueue = new FIFOQueue();
const priorityQueue = new PriorityQueue();
const roundRobinQueue = new RoundRobinQueue();
roundRobinQueue.addQueue("queue1");
roundRobinQueue.addQueue("queue2");

// Route for FIFO Queue
router.post("/fifo", (req, res) => {
  const { payload } = req.body;
  fifoQueue.enqueue(payload);
  res.send("Added to FIFO queue");
});

// Route for Priority Queue
router.post("/priority", (req, res) => {
  const { payload, priority } = req.body;
  priorityQueue.enqueue(payload, priority);
  res.send("Added to priority queue");
});

// Route for Round-Robin Queue
router.post("/roundrobin", (req, res) => {
  const { payload } = req.body;
  roundRobinQueue.enqueue(payload);
  res.send("Added to round-robin queue");
});

// Background task to process FIFO queue
setInterval(() => {
  const request = fifoQueue.dequeue();
  if (request) {
    console.log("Processing FIFO queue request:", request);
  }
}, 1000);

// Background task to process Priority queue
setInterval(() => {
  const request = priorityQueue.dequeue();
  if (request) {
    console.log("Processing Priority queue request:", request);
  }
}, 1000);

// Background task to process Round-Robin queue
setInterval(() => {
  const request = roundRobinQueue.dequeue();
  if (request) {
    console.log("Processing Round-Robin queue request:", request);
  }
}, 1000);

// Route for Randomized Routing
router.post("/random", (req, res) => {
  const endpoints = ["endpoint1", "endpoint2", "endpoint3"];
  const randomEndpoint =
    endpoints[Math.floor(Math.random() * endpoints.length)];
  res.send(`Routed to ${randomEndpoint}`);
});

// Route for Custom Criteria
router.post("/custom", (req, res) => {
  const { customCriteria } = req.body;
  if (customCriteria === "fast") {
    handleFastResponse(res);
  } else {
    handleSlowResponse(res);
  }
});

// Route to handle payload size
router.post("/size", (req, res) => {
  const { payload } = req.body;
  if (Buffer.byteLength(JSON.stringify(payload)) > 1000) {
    res.send("Handled large payload");
  } else {
    res.send("Handled small payload");
  }
});

// Catch-all route to handle different API types (REST, GraphQL, gRPC)
router.post("/:type", (req, res) => {
  const { type } = req.params;
  const { payload } = req.body;

  if (type === "REST") {
    handleRESTRequest(payload, res);
  } else if (type === "GraphQL") {
    handleGraphQLRequest(payload, res);
  } else if (type === "gRPC") {
    handleGRPCRequest(payload, res);
  } else {
    res.status(400).send("Unsupported API type");
  }
});

module.exports = router;
