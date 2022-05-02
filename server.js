const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js')


const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send('it is working!') })
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})


//     // // Load hash from your password DB.
// bcrypt.hash(password, null, null, function(err, hash) {
//     // Store hash in your password DB.
// console.log(hash);




//*PLAN:
// --> res = this is working
// signin --> POST = sucess/fail
// register --> POST = user
// profile/:userId --> GET = user
// image --> PUT --> user