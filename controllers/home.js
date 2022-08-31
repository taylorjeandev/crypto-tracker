module.exports = {

    getIndex: (req,res)=>{
        /* Example in Node.js */
        const axios = require('axios');

        let response = null;
        new Promise(async (resolve, reject) => {
            try {
                response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest ', {
                    headers: {
                        'X-CMC_PRO_API_KEY': process.env.COINBASE_API_KEY,

                    },
                });
            } catch(ex) {
                response = null;
                // error
                console.log(ex);
                reject(ex);
            }
            if (response) {
                // success
                const json = response.data;
                console.log(json);
                resolve(json);
                res.render('index.ejs')
            }
        });

        // Response
        // res.render('index.ejs')
    }
}