const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { title } = require("process");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/comics", async (req, res) => {
  const title = req.query.title || "";
  const skip = req.query.skip || "0";
  const limit = req.query.limit || "100";
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${title}&apiKey=${process.env.API_KEY}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  const name = req.query.name || "";
  const skip = req.query.skip || "0";
  const limit = req.query.limit || "100";
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${name}&apiKey=${process.env.API_KEY}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "this routes doesnt exist" });
});

app.listen(4000, () => {
  console.log("Server has started");
});
