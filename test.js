const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// لتتمكن من قراءة JSON من الطلبات
app.use(express.json());

// نقطة استقبال Webhook من Tally
app.post("/webhook", async (req, res) => {
  const answers = req.body; // بيانات إجابات المستخدم من Tally

  // مثال: ترسل البيانات لـ Gemini API لتحليلها
  // هنا حط كود النداء لـ Gemini API - بتحتاج مفتاح API

  // بدل هذا بمثال تحليل بسيط (عشان نختبر)
  let advice = "نصيحة عامة للعناية بالبشرة والشعر";

  if (answers.q1 === "جواب1" && answers.q2 === "جواب2") {
    advice = "نصيحة خاصة 1";
  } else if (answers.q3 === "جواب3") {
    advice = "نصيحة خاصة 2";
  }

  // نرجع النتيجة للمستخدم (تقدر ترجع رابط صفحة النتيجة لو حبيت)
  res.json({ advice });
});

// صفحة رئيسية اختبارية
app.get("/", (req, res) => {
  res.send("خدمة تحليل Tally + Gemini API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
