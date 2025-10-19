const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();
const app = express();

//app.use(cors()); // permet les requêtes du frontend


app.use(cors({
  origin: ["https://kab-blog.netlify.app", "https://blog-maint.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true }));

// routes
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// ✅ Route racine (évite 404)
app.get("/", (req, res) => {
  res.send("🚀 API en ligne et fonctionnelle !");
});

// mongoose connect ...
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.listen(PORT, ()=>console.log(`Server on ${PORT}`));


