require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

// app.use(cors());
app.use(
  cors({
    origin: [
      "https://notes-app-front-orpin.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// Rich-editor content can be large; increase body size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.get("/", (req, res) => {
  res.send("API Working");
});

// Notes API
const noteRoutes = require("./routes/noteRoutes");
app.use("/api/notes", noteRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});