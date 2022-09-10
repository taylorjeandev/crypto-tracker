const axios = require("axios");

module.exports = {
    getIndex: async (req, res) => {
        try {

            const data = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    
            res.render('index.ejs', {currencies: data.data})

        } catch (err) {
            console.error(err)
        }

    }
}