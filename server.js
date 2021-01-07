require('dotenv').config();
const express = require('express');
const server = express();
const cors = require("cors");
const passport = require('passport');

require('./config/connection');

server.use(express.json());
server.use(cors());
server.use(passport.initialize());
server.use(passport.session());

server.use("/api/public", require("./routes/public.routes"));
server.use("/api/jobs", passport.authenticate('jwt', { session: false }), require("./routes/authJob.routes"));

// app.get("/api/*", (req, res) => {
//     res.status(404).json({ message: "Server route not found" });
// });

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

