const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('portfolio', portfolioSchema)
