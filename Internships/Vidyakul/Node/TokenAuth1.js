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
    }
}

// key for encoding and decoding token - to be stored in an environment variable (not like done here)

const key = 'THIS_IS_A_SECURE_KEY'

// JWT is self contained and contains issued at and expires at time stamps in the string
// issue and expiry time zone is that of the server since it is signed and verified there only

const details = mongoose.model('Accounts', schema)

app.get('/auth', (req,res) => {

    res.send('Demoing Token Authentication...')
})

app.post('/auth/register', async (req,res) => {

    try
    
    {    
        const val = await details.exists({email: req.body.email}) // returns null if same email id is not present
        
        if (!val)
            
        {
            const info = await details.create({

                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            })

            // signs payload UserID containg _id with key and sets expiry of token as 10 minutes

            var token = jwt.sign({"UserID": info._id}, key, {expiresIn: 600})

            // console.log(token)
            res.send('Registration Successful.\nToken Generated: ' + token)
            console.log('User Registered and Token Generated.')
        }

        else
        
        {
            res.send('User Already Exists')
        }
    }

    catch(error)

    {
        res.send('Error Occured')
    }
})

app.get('/auth/login', async (req,res) => {

    try
    
    {    
        const val = await details.exists({ email: req.body.email })

        if (val) // to check if user is already registered
            
        {
            // can also be used to exclude email,id and versionkey from output
            // const data = await details.findOne({email: req.body.email}).select('-email -_id -__v')

            const info = await details.findOne({ email: req.body.email })

            bcrypt.compare(req.body.password, info.password).then((out) => {

                if (out == true)

                {
                    var token = jwt.sign({"UserID": info._id}, key, {expiresIn: 600})

                    res.send('Login Successful. Acess Granted.\nToken Generated: ' + token)
                    console.log('User Logged In')
                }

                else if (out == false)

                {
                    res.send('Incorrect Password. Please Try Again.')
                }
            })
        }

        else 
        
        {
            res.send('Account Does Not Exist. Please Register First.')
        }
    }

    catch(error)

    {
        res.send('Error Occured')
    }
})

app.get('/auth/details', async (req,res) => { // secured endpoint
    
    try
    
    {
        var token = req.headers['x-access-token'] // gets token from header
        const decoded = jwt.verify(token, key) // decodes token using key

        const check = await details.exists({ _id: decoded.UserID }) // checks if the decoded token's payload has a registered user

        if (check)
        
        {
            const data = await details.find({}).select('-_id -password -__v') // sends all user details from database
        
            res.status(200).json(data)
            console.log('All User Details Sent.')
        }

        else

        {
            res.send('Unauthorised Access.')
        }
    }

    catch (error)

    {
        res.send('Error Occurred While Accessing Endpoint.\n' + error)
    }
})