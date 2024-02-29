const app = require('express')()
const prompt = require('prompt-sync')()

app.listen(8080)

app.get('/', (req,res) => {
    res.send('Home Page')
})

app.get('/SayHello', (req,res) => {
    
    const name2 = req.query.name2
    res.send('Hello ' + name2)
})