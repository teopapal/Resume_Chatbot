const express = require("express");
const cors = require("cors");
const responses = require("./response");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const prompt = req.body.prompt.toLowerCase();

  const response_matched = responses.find((item) =>
    item.keywords.some((keyword) => prompt.includes(keyword))
  );

  if (response_matched) {
    res.json({ response: response_matched.response });
  } else {
    res.json({ response: "Sorry I cannot understand this. You should try asking about myself." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
