const app = require('express')()
const axios = require ('axios')

app.listen(8080)

app.get('/', (req,res) => {
    
    res.send('API of APIs')
})

app.get('/cat', async (req,res) => {
    
    const apiResponse = await axios({
        
        method: 'GET',
        url: 'https://catfact.ninja/fact'
    })
    
    res.send('Fact: ' + apiResponse.data.fact)
})

app.get('/bpi', async (req,res) => {

    const apiResponse = await axios({
        
        method: 'GET',
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    })
    
    res.send('BitCoin Price Index as of ' + apiResponse.data.time.updated + ': $' + apiResponse.data.bpi.USD.rate)
})

app.get('/joke', async (req,res) => {

    const apiResponse = await axios({
        
        method: 'GET',
        url: 'https://official-joke-api.appspot.com/random_joke'
    })
    
    res.send('Joke\n     Setup: ' + apiResponse.data.setup + '\n     Punchline: ' + apiResponse.data.punchline)
})