const intialiseDatabase = require("./db/db.connection");
const express = require("express");

const userRouter = require("./routes/user.route");
const movieRouter = require("./routes/movie.route");

intialiseDatabase();

const PORT = process.env.PORT || 2000;

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/movies", movieRouter);
app.get("/", (req, res) => {
  res.send("Movie reviews app");
});

app.use("/", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
