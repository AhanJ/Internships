const app = require('express')()
const mysql2 = require('mysql2')

app.listen(8080)

const cdetails = 

{
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "TestDB"
}

const con = mysql2.createConnection(cdetails)

app.get('/details/all', (req,res) => {

    con.connect((error) => {
        
        if(error)

        {
            console.log("Error Connecting")
        }

        else 
        
        {
            console.log("Connection Successful")
        }
    })

    const q = "SELECT * FROM Details WHERE id = 2"

    con.query(q, (error,result) => {

        if(error)

        {
            console.log("Error!")
        }

        else

        {
            res.send(result)
        }
    })
})