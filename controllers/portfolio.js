const Portfolio = require("../models/Portfolio");
const axios = require("axios");

module.exports = {
  //GET Request upon signin
  getPortfolio: async (req, res) => {
    try {
      const portfolioItems = await Portfolio.find({ userId: req.user.id });
      const amountOfCoins = await Portfolio.countDocuments({
        userId: req.user.id,
      });
      const data = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
      );

      res.render("portfolio.ejs", {
        coin: portfolioItems,
        amount: amountOfCoins,
        user: req.user,
        currencies: data.data,
      });
    } catch (err) {
      console.log(err);
    }
  },

  //POST REQUEST
  createCoin: async (req, res) => {
    try {
      await Portfolio.create({
        coin: req.body.portfolioItem,
        amount: req.body.amountOfCoin,
        userId: req.user.id,
        pricePaid: req.body.pricePaid,
      });
      console.log("Coin has been added!");
      res.redirect("/portfolio");
    } catch (err) {
      console.log(err);
    }
  },

  //PUT Request
  updateCoin: async (req, res) => {
    try {
      const portfolioItems = await Portfolio.find({ userId: req.user.id });
      let numberOfCoins = portfolioItems.find(
        (element) => element.coin === req.body.portfolioItem
      );
      console.log(numberOfCoins);
      if (numberOfCoins === undefined) {
        numberOfCoins = {
          amount: 0,
        };
      }
      await Portfolio.findOneAndUpdate(
        { coin: req.body.portfolioItem },
        {
          coin: req.body.portfolioItem,
          amount: Number(req.body.amountOfCoin) + numberOfCoins.amount,
          userId: req.user.id,
          pricePaid: req.body.pricePaid,
        },
        { new: true, upsert: true }
      ),
        console.log("Coin Updated");
      res.redirect("/portfolio");
    } catch (err) {
      console.log(err);
    }
  },
  //Delete Request
  deleteCoin: async (req, res) => {
    console.log(req.body.IdFromJSFile);
    try {
      await Portfolio.findOneAndDelete({ _id: req.body.coinIdFromJSFile });
      console.log("Deleted coin");
      res.json("deleted");
    } catch (err) {
      console.log(err);
    }
  },
};
