require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('passport');

require('./config/connection');

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/public", require("./routes/public.routes"));

// app.get("/api/*", (req, res) => {
//     res.status(404).json({ message: "Server route not found" });
// });

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

