const Portfolio = require('../models/portfolio')
const axios = require("axios");

module.exports = {
    getPortfolio: async (req,res)=>{
        console.log(req.user)
        try{
            const portfolioItems = await Portfolio.find({userId:req.user.id})
            const amountOfCoins = await Portfolio.countDocuments({userId:req.user.id})
            const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=15&page=1&sparkline=false')
            // const coinGeckoTest = await  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y')

            res.render('portfolio.ejs', {coin: portfolioItems, amount: amountOfCoins, user: req.user, currencies: data.data})
        }catch(err){
            console.log(err)
        }
    },
    createCoin: async (req, res)=>{
        try{
            await Portfolio.create({coin: req.body.portfolioItem, amount: req.body.amountOfCoin, userId: req.user.id, pricePaid: req.body.pricePaid})
            console.log('Coin has been added!')
            res.redirect('/portfolio')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await portfolio.findOneAndUpdate({_id:req.body.portfolioIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await portfolio.findOneAndUpdate({_id:req.body.portfolioIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteCoin: async (req, res)=>{
        console.log(req.body.IdFromJSFile)
        try{
            await Portfolio.findOneAndDelete({_id:req.body.coinIdFromJSFile})
            console.log('Deleted coin')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    