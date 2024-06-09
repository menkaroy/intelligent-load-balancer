const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
