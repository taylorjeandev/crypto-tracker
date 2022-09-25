const express = require('express')
const router = express.Router()
const portfolioController = require('../controllers/portfolio') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, portfolioController.getPortfolio)

router.post('/createCoin', portfolioController.createCoin)

router.put('/updateCoin', portfolioController.updateCoin)

router.delete('/deleteCoin', portfolioController.deleteCoin)



module.exports = router