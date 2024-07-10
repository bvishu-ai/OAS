const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const items = require("./routes/items");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bvishu:auction123@auction.1w5e7xu.mongodb.net/OAS"
    );
    console.log("Database Connected");
  } catch (error) {
    console.log("error in db connection");
    console.log(error);
  }

  // create account on mongodb atlas
};

app.get("/ip", async (req, res) => {
  try {
    const response = await axios.get("https://ifconfig.me");
    res.send(`IP address: ${response.data}`);
  } catch (error) {
    res.status(500).send("Error fetching IP address");
  }
});

app.use(express.json()); //helps me to convert the request into json format
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", auth);
app.use("/items", items);
app.listen(4000, () => {
  dbConnect();
  console.log(`Server started on port 4000`);
});
