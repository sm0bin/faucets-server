const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// {
//     "Wallet Address": "Your Wallet Address...",
//     "Request": {
//       "Time": "2024-03-02 12:00 PM",
//       "Hash": "af1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p",
//       "Type": "20 Test Link",
//       "Amount": 0.5,
//       "Currency": "ETH"
//     }
//   }

const transactionSchema = new Schema({
    walletAddress: {
        type: String,
        required: [true, "Wallet Address is required!"]
    },
    request: {
        time: {
            type: String,
            required: [true, "Time is required!"]
        },
        hash: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: [true, "Type is required!"]
        },
        amount: {
            type: Number,
            required: [true, "Amount is required!"]
        },
        currency: {
            type: String,
            required: [true, "Currency is required!"]
        }
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
