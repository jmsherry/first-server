require("dotenv").config();
const express = require("express");
const app = express();

const { PORT = 3333 } = process.env;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

console.log("hello world");

app.use((req, res, next) => {
  console.log(req.hostname);
  next();
});

const cars = [
  { _id: 0, name: "bugatti" },
  { _id: 1, name: "ferarri" },
];

app.get("/api/v1/cars", (req, res, next) => {
  res.json(cars);
});

app.post("/api/v1/cars", (req, res, next) => {
  console.log(req.body);
  const newCar = { _id: cars.length, ...req.body };
  cars.push(newCar);
  res.sendStatus(201);
  res.status(201).json(newCar);
});

app.delete("/api/v1/cars/:id?", (req, res, next) => {
  console.log(req.params.id);
  console.log(req.query)
  const carId = req.params.id;
  const index = cars.findIndex((car) => {
    return car._id === Number(carId);
  });
  console.log("index", index);
  if (index === -1) {
    return res.sendStatus(404);
  }
  cars.splice(index, 1);
  res.sendStatus(204);
});

app.get("/redirect", (req, res) => {
  res.redirect("/about.html");
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
