const routesController = require("./server/controllers/routesController");

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", routesController.homePage);

app.get("/addPost", routesController.addPost);

app.post("/addPost", routesController.printPost);

app.listen(port, () => console.log(`I've got ears on port: ${port}`))
