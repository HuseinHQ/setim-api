const express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const mainRoutes = require("./routes/");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listen to localhost:${PORT}`));
