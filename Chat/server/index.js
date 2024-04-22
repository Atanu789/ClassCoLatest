const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");


app.use(express.json());
require("dotenv").config();
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome our chat app APIs...");
});

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
app.listen(port, (req, res) => {
  console.log(`server running on port...: ${port} `);
});

mongoose
  .connect(uri, {})
  .then(() => console.log("Mongodb connection established"))
  .catch((error) => {
    console.log("mongo connection failed:", error.message);
  });
