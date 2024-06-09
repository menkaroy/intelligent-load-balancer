// src/server.js

const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const loggerMiddleware = require("./middleware/logger"); // Correct import statement

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware); // Use the imported middleware function

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
