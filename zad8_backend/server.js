const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const dataDirectory = path.join(__dirname, "data");
const dataFile = path.join(dataDirectory, "submissions.json");

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]", "utf8");
}

function readSubmissions() {
  const fileContent = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(fileContent || "[]");
}

function saveSubmissions(submissions) {
  fs.writeFileSync(dataFile, JSON.stringify(submissions, null, 2), "utf8");
}

app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Wszystkie pola formularza są wymagane."
    });
  }

  const newSubmission = {
    id: Date.now(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  const submissions = readSubmissions();
  submissions.push(newSubmission);
  saveSubmissions(submissions);

  res.status(201).json({
    success: true,
    message: "Formularz został poprawnie wysłany i zapisany na serwerze."
  });
});

app.get("/api/contact", (req, res) => {
  res.json(readSubmissions());
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
