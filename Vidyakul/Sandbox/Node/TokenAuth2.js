const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(bodyParser.json())
app.listen(8080)

const url = 'mongodb://localhost:27017/TestDB'

mongoose.connect(url).then(() => {
    console.log('Connected to NoSQL Database')

}).catch((error) => {
    console.log('Error Connecting to NoSQL Database.\n' + error)
})

const schema = {
    
    email:

    {
        type: String,
        required: true
    },

    password:

    {
        type: String,
        required: true
    },

    role: 

    {
        type: String,
        enum: ['user','admin'],
        required: true,
        default: 'user'
    }
}

const key = 'THIS_IS_A_SECURE_KEY'

const details = mongoose.model("Workers", schema)

app.get('/auth', (req,res) => {

    res.send('Demoing Roles and Permissions...')
})

app.post('/auth/register/admin', async (req,res) => {

    try
    
    {    
        const val = await details.exists({ email: req.body.email })
        
        if (!val)
            
        {
            const info = await details.create({

                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                role: 'admin'
            })

            var token = jwt.sign({ "UserID": info._id, "Role": info.role}, key, { expiresIn: 600 })

            res.status(201).send('Admin Registration Successful.\nToken Generated: ' + token)
            console.log('Admin Registered and Token Generated.')
        }

        else
        
        {
            res.send('Email Already Registered')
        }
    }

    catch (error)

    {
        res.send('Error Occurred: ' + error)
    }
})

app.post('/auth/register/user', async (req,res) => {

    try
    
    {    
        const val = await details.exists({ email: req.body.email })
        
        if (!val)
            
        {
            const info = await details.create({

                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                role: 'user'
            })

            var token = jwt.sign({ "UserID": info._id, "Role": info.role }, key, { expiresIn: 600 })

            res.status(201).send('User Registration Successful.\nToken Generated: ' + token)
            console.log('User Registered and Token Generated.')
        }

        else
        
        {
            res.send('Email Already Registered')
        }
    }

    catch (error)

    {
        res.send('Error Occurred: ' + error)
    }
})

app.get('/auth/login/admin', async (req,res) => {

    try
    
    {    
        const val = await details.exists({ email: req.body.email })

        if (val)
            
        {
            const info = await details.findOne({ email: req.body.email})

            if (info.role == 'admin')

            {
                bcrypt.compare(req.body.password, info.password).then((out) => {

                    if (out == true)
    
                    {
                        var token = jwt.sign({ "UserID": info._id, "Role": info.role }, key, { expiresIn: 600 })
    
                        res.send('Admin Login Successful. Access Granted.\nToken Generated: ' + token)
                        console.log('Admin Logged In')
                    }
    
                    else if (out == false)
    
                    {
                        res.status(401).send('Incorrect Password. Please Try Again.')
                    }
                })
            }

            else

            {
                res.status(403).send('Unauthorised Access.')
            }
        }

        else 
        
        {
            res.send('Account Does Not Exist. Please Register First.')
        }
    }

    catch(error)

    {
        res.send('Error Occurred: ' + error)
    }
})

app.get('/auth/login/user', async (req,res) => {

    try
    
    {    
        const val = await details.exists({ email: req.body.email })

        if (val)
            
        {
            const info = await details.findOne({ email: req.body.email, role: 'user' })

            if (info.role == 'user')

            {
                bcrypt.compare(req.body.password, info.password).then((out) => {

                    if (out == true)

                    {
                        var token = jwt.sign({ "UserID": info._id, "Role": info.role }, key, { expiresIn: 600 })

                        res.send('User Login Successful. Access Granted.\nToken Generated: ' + token)
                        console.log('User Logged In')
                    }

                    else if (out == false)

                    {
                        res.status(401).send('Incorrect Password. Please Try Again.')
                    }
                })
            }

            else

            {
                res.status(403).send('Unauthorised Access.')
            }
        }

        else 
        
        {
            res.send('Account Does Not Exist. Please Register First.')
        }
    }

    catch(error)

    {
        res.send('Error Occurred: ' + error)
    }
})

app.get('/auth/internal', async (req,res) => {
    
    try
    
    {
        var token = req.headers['x-access-token']
        const decoded = jwt.verify(token, key)

        if (decoded.Role == 'admin')

        {
            const data = await details.find({}).select('-_id -password -__v')
        
            res.status(200).json(data)
            console.log('All User Details Sent.')
        }

        else

        {
            res.status(403).send('Unauthorised Access.')
        }
    }

    catch (error)

    {
        res.send('Error Occurred: ' + error)
    }
})