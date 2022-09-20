const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema({
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
  },
  pricePaid:{
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Portfolio', PortfolioSchema)
