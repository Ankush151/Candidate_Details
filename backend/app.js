const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const getAllAppRoutes = require("./routes/all_app_routes.routes");
const cors = require('cors')

var corsOption = {
    origin:"http://localhost:4200"
};
app.use(cors(corsOption))

app.use(express.json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(
    ()=> {
        console.log("Database Connected Successfully");   
}).catch(err => {
    console.log("database can't be connected");
})

getAllAppRoutes(app);

const PORT = process.env.Port  || 5000;
app.listen(PORT, ()=> {
    console.log(`Server Connected on Port ${PORT}`);
})