require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
const webpush = require("web-push");
// Socket Io Declaration
// const http = require("http");
// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// Body Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Static Path
app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "/public")));

//Connect to the Database
connectDB();

//Samaple API Call

//Omitted for production build
// app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/opcen_profile", require("./routes/api/opcen_profile"));
// Opcen Route
app.use("/api/operation_center", require("./routes/api/operation_center"));
// Incident Route
app.use("/api/incident", require("./routes/api/incident"));

// Push notification
app.use("/api/subscribe", require("./routes/api/subscribe"));

//User Route
app.use("/api/users", require("./routes/api/users"));

//Profile Route
app.use("/api/profile", require("./routes/api/profile"));

//Post Route
app.use("/api/posts", require("./routes/api/posts"));

//Auth Route
app.use("/api/auth", require("./routes/api/auth"));

//OTP Route
app.use("/api/sms", require("./routes/api/sms"));

// //Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   //Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//run the Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
