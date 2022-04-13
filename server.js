const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));

  console.info(`${req.method}`);
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});


app.post("/api/notes", (req, res) => {
  console.log(req.body);
  res.send("bobobobobobobobo")
});

app.delete("/api/notes/:id", (req, res) => {
  res.send(req.params);
  console.log(req.params);
});

app.post("/api/reviews", (req, res) => {});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));

  console.info(`${req.method}`);
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
