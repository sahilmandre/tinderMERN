import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = "mongodb+srv://admin:sahil123@cluster0.cnxjy.mongodb.net/tinderdb?retryWrites=true&w=majority";
// middleware

app.use(express.json());
app.use(Cors())

// db config

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoint
app.get("/", (req, res) => {
  res.status(200).send("GET request to the homepage");
});

app.post("/tinder/cards", function (req, res) {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listener

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
