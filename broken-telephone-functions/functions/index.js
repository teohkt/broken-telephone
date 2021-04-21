const functions = require('firebase-functions')

const app = require('express')()

const FBAuth = require('./util/FBAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signUp, logIn, uploadImage, addUserDetails } = require('./handlers/users')

// Screams routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)

// Users route
app.post('/signup', signUp)
app.post('/login', logIn)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)

exports.api = functions.https.onRequest(app)
