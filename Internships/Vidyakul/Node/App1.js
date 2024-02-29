const app = require('express')()

app.listen(8080)

// request/req is used to request data i.e. from client to server
// response/res is used to respond to the client i.e send data from server to client

app.get('/', (req,res) => {
    res.send('Home Page')
})

app.get('/a', (req,res) => {
    res.send('Page A')
})

app.get('/b', (req,res) => {
    res.send('Page B')
})

app.get('/c', (req,res) => {
    res.send('Page C')
})

app.get('/hello', (req,res) => {
    res.status(200).send('World')
})

// app.post('/hello', (req,res) => {
//     res.send('World')
// })

app.get('/:name1', (req,res) => {
    const name1 = req.params.name1
    res.send('Hello ' + name1)
})

// app.get('/SayHello', (req,res) => {
    
//     const name2 = req.query.name2
//     res.send('Hello ' + name2)
// })

app.get('/head', (req,res) => {

    console.log(req.headers)
    res.send(req.headers)
})

const uname = 'ahan'
const pass = 'test'

app.get('/login', (req,res) => {
    
    if((req.header('Username') == uname) && (req.header('Password') == pass))
    
    {
        res.status(200).send('Authorised')
    }

    else

    {
        res.status(401).send('Unauthorised')
    }
})