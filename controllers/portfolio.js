const portfolio = require('../models/portfolio')

module.exports = {
    getPortfolio: async (req,res)=>{
        console.log(req.user)
        try{
            const portfolioItems = await portfolio.find({userId:req.user.id})
            const amountOfCoins = await portfolio.countDocuments({userId:req.user.id})
            res.render('portfolio.ejs', {coin: portfolioItems, amount: amountOfCoins, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createCoin: async (req, res)=>{
        try{
            await portfolio.create({coin: req.body.portfolioItem, amount: req.body.amountOfCoin, userId: req.user.id})
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
            await portfolio.findOneAndDelete({_id:req.body.coinIdFromJSFile})
            console.log('Deleted coin')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    