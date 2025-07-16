const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const answers = req.body;

  try {
    // بناء نص الطلب لـ Gemini API حسب التوثيق
    const promptText = `
      بناء على الإجابات التالية: ${JSON.stringify(answers)}, أعطني نصيحة مخصصة للعناية بالبشرة والشعر.
    `;

    // استدعاء Gemini API (مثال تخيلي، يرجى تعديل حسب التوثيق الرسمي)
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText",
      {
        prompt: {
          text: promptText,
        },
        temperature: 0.7,
        maxOutputTokens: 256,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer AIz...` // هنا يجب وضع توكن صالح وليس api key
        },
        params: {
          key: "AIzaSyAvZDYbzuNqP0hmH9rHITdu3KvAKqgST1I"
        }
      }
    );

    const advice = response.data.candidates[0].output;

    res.json({ advice });
  } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate advice" });
  }
});

app.get("/", (req, res) => {
  res.send("خدمة تحليل Tally + Gemini API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
