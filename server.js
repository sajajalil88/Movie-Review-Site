const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.listen(3000, () => {
    console.log("listening to port 3000");
});
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://sajajalil:saja12345@cluster0.lklb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("connected to mango db");
    }).catch((error) => {
        console.log(error);
    });

