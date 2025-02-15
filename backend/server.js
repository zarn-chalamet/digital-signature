require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const connectDb = require("./config/database");

const app = express();

//connect mongodb database
connectDb();

const PORT = process.env.PORT || 5000;

//cors
app.use(cors(corsOptions));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
