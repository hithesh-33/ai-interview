import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBR-kK9O4lO1fDN2DjABxSQjH7tYwIExyE"; // 🔴 FIX HERE

app.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", data);

    if (!data.candidates) {
      return res.json({ reply: "API Error: " + JSON.stringify(data) });
    }

    const reply = data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    res.json({ reply: "Server Error: " + error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/ask");
});