require("dotenv").config();
const express = require("express");
const router = express.Router();
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:admin@guardian4emergency.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

//  /api/subscribe

router.post("/", (req, res) => {
  // Get pushSubscriptionObject
  const { subscription, title, message } = req.body;

  // Send 201 -recource created

  // create Payload
  const payload = JSON.stringify({ title, message });

  //
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));

  res.status(200).json({ success: true });
});

module.exports = router;
