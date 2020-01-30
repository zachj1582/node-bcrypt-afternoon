require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      app = express(),
      ac = require('./controllers/authController'),
      bcrypt = require('bcryptjs'),
      tc = require('./controllers/treasureController'),
      cors = require('cors'),
      auth = require('./middleware/authMiddleware');

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const port = SERVER_PORT

//middleware
app.use(cors())
app.use(express.json())
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)
//endpoints
//auth
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)
//treasure
app.get('/api/treasure/dragon', tc.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, tc.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, tc.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, tc.getAllTreasure)



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, ()=> console.log(`Server running on ${SERVER_PORT}`))
})