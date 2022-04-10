const express = require('express')
const request = require('request')
const app = express()
const cors = require('cors')

const port = 3001

app.use(cors())

app.get('/stocks', (req, res) => {
    const symbol = req.query.symbol
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=5843HHGKRN13U8XN`
    
    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err)
            res.send([])
        } else if (response.statusCode !== 200) {
            res.send([])
        } else {
            if (data["Time Series (5min)"]) {
                const dataObject = data["Time Series (5min)"]
                const timeStampArray = Object.keys(dataObject)
                const returnArray = timeStampArray.map(key => {
                    return {
                        "Opening Price": dataObject[key]["1. open"],
                        "Max Price": dataObject[key]["2. high"],
                        "Min Price": dataObject[key]["3. low"],
                        "Closing Price": dataObject[key]["4. close"],
                        "Total Volume": dataObject[key]["5. volume"],
                        "Timestamp": new Date(key).toUTCString(),
                    }
                })
                data = returnArray
            }
            res.send(data)
        }
    })
})

app.get('/search', (req, res) => {
    const symbol = req.query.symbol
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=5843HHGKRN13U8XN`

    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err)
            res.send([])
        } else if (response.statusCode !== 200) {
            res.send([])
        } else {
            if (data.bestMatches) {
                data = data.bestMatches
                    .filter(s => s["4. region"] == "United States")
                    .map(s => {
                        return {
                            "name": s["1. symbol"],
                            "id": s["1. symbol"]
                        }
                    }

                    )
                res.send(data)
            } else {
                res.send('')
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})