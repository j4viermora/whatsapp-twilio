const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/send-message", (req, res) => {
  const { message, to } = req.body;
  client.messages
    .create({
      body: message,
      from: `whatsapp:${process.env.FROM_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
    })
    .then((message) => {
      res.json({
        message: "Message sent successfully",
        messageSent: message.body,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error sending message" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
