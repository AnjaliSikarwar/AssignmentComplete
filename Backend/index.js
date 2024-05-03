const dotenv = require("dotenv");
const connectDB = require("./db/connect.js");
const express = require("express");
const router = require("./routes/router.js")
const cookieParser = require("cookie-parser")
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const port = 4000;

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded());
app.use(cors());
app.use(router);


connectDB();
console.log("MongoDB URI:", process.env.MONGODB_URI);


app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
