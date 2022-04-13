const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  console.log("Post Request");
  if (req.body && req.body.title) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const newData = JSON.parse(data);
        newData.push(req.body);
        idSetter(newData);
        fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
          }
        });
      }
    });
  }
  res.sendStatus(200);
});

function idSetter(newData) {
  for (let index = 0; index < newData.length; index++) {
    const element = newData[index];
    element.id = index + 1;
  }
}

app.delete("/api/notes/:id", (req, res) => {
  console.log("Note Deleted");
  if (req.params && req.params.id) {
    const idValue = req.params.id - 1;
    console.log(idValue);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const newData = JSON.parse(data);
        newData.splice(idValue, 1);
        idSetter(newData);
        fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
          if (err) console.log(err);
          else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
          }
        });
      }
    });
  }
  res.sendStatus(200);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  console.info(`${req.method}`);
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
