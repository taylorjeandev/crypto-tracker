const axios = require("axios");

module.exports = {
    getIndex: async (req, res) => {
        try {

            const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y')
    
            res.render('index.ejs', {currencies: data.data})

        } catch (err) {
            console.error(err)
        }

    }
}