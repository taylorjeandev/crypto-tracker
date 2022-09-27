const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  userId: {
    type: String,
    required: false
  },
  pricePaid:{
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('Portfolio', PortfolioSchema)
