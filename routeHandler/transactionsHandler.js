const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require('../middlewares/verifyToken');
const Transaction = require('../schemas/transactionsSchema');
const User = require('../schemas/usersSchema');

router.post('/', verifyToken, async (req, res) => {
    try {
        console.log('hitting');
        console.log(req.body);
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).send({ message: "You must be logged in!" });
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if (!user)
            return res.status(401).send({ message: "You are not authorized!" });
        const transaction = await Transaction.create(req.body);
        res.send(transaction);
    } catch (err) {
        console.log(err);
        res.status(422).send(err);
    }
})

router.get('/all', verifyToken, async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).send({ message: "You must be logged in!" });
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if (!user)
            return res.status(401).send({ message: "You are not authorized!" });
        const transactions = await Transaction.find();
        res.send(transactions);
    } catch (err) {
        console.log(err);
        res.status(422).send(err);
    }
})

router.get('/:currency', verifyToken, async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).send({ message: "You must be logged in!" });
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        // if (user.role !== "admin")
        //     return res.status(401).send({ message: "You are not authorized!" });
        const transactions = await Transaction.find({ "request.currency": req.params.currency });
        res.send(transactions);
    } catch (err) {
        console.log(err);
        res.status(422).send(err);
    }
})


module.exports = router;