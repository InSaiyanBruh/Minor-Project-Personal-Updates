const express = require('express')
const app = express()
const path = require('path')

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/Login", (req, res) => {
    res.render("Login");
});
app.get("/Signup", (req, res) => {
    res.render("Signup");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
