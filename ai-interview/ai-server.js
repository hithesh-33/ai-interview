import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Server Running ✅");
});

app.get("/questions", (req, res) => {
  res.json([
    "Tell me about yourself",
    "What are your strengths?",
    "Explain JavaScript closures",
    "What is REST API?",
    "Why should we hire you?"
  ]);
});

app.post("/evaluate", (req, res) => {
  const { answers } = req.body;

  let score = 0;
  answers.forEach(ans => {
    if (ans && ans.length > 20) score += 20;
  });

  res.json({ score });
});

app.listen(3000, () => {
  console.log("AI Server running on http://localhost:3000");
});