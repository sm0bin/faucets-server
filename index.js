const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5500;
const cors = require('cors');
require('dotenv').config();
const userHandler = require('./routeHandler/userHandler');
const transactionHandler = require('./routeHandler/transactionsHandler');


// middleware
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://faucets-smt.surge.sh"
    ],
    credentials: true
}));

mongoose.connect(process.env.DB_URI)
    .then(() => { console.log("Connection successful.") })
    .catch((err) => { console.log(err) })


// routes
app.use('/users', userHandler);
app.use('/transactions', transactionHandler);

app.use('/', (req, res) => {
    res.send("Faucets Server is running...");
})


// checking
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})