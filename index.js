const express = require('express')
const mongoose = require('mongoose');
const path = require('path');

const config = require('config');
const dbConnect = require('./config/db');
const mongoURI = config.get('mongoURI');

const appController = require('./appController');
const app = express();
const port = 3000;
dbConnect();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'style')))


app.get('/', appController.getTasks)

app.post('/',appController.save)

app.delete('/delete-task/:taskId', appController.deleteTask);

app.put('/update-task/:taskId', appController.editTask);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})