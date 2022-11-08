const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookies = require("cookie-parser");
const cors = require('cors');

//connect database
const uri = process.env.CONNECT
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//MIDDLEWARE
app.use(express.json());
app.use(cookies());
app.use(cors({
    origin: 'http://localhost:3434'
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Request Routing
const user = require("./Routes/userRoute");
const queryDB = require("./Routes/queryRoute");
app.use("/", user)
app.use("/query", queryDB)

//working port
const port = process.env.PORT || 3434
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


