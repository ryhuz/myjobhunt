require('dotenv').config()
const app = require('express')()

require('./config/connection');




app.get("/api/*", (req, res) => {
    res.status(404).json({ message: "Server route not found" });
});

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})