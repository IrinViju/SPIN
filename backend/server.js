const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();
app.use(cors());
app.use(express.json());


const FILE = "scores.json";


// ================= SAVE SCORE =================
app.post("/save-score", (req, res) => {
  const { name, accuracy, avgTime } = req.body;


  const data = JSON.parse(fs.readFileSync(FILE));
  data.push({
    name,
    accuracy,
    avgTime,
    date: new Date()
  });


  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));


  res.json({ message: "Score saved!" });
});


// ================= GET LEADERBOARD =================
app.get("/leaderboard", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));


  const sorted = data.sort((a, b) => b.accuracy - a.accuracy);


  res.json(sorted.slice(0, 10));
});


const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const fs = require("fs");
const path = require("path");

app.get("/scores", (req, res) => {
  const filePath = path.join(__dirname, "scores.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read scores" });
    }
    res.json(JSON.parse(data));
  });
});

