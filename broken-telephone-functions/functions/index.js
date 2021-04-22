const functions = require('firebase-functions')

const app = require('express')()

const FBAuth = require('./util/FBAuth')

const { getAllScreams, postOneScream, getScream, commentOnScream } = require('./handlers/screams')
const { signUp, logIn, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users')

// Screams routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)

//TODO: Delete Scream
//TODO: Like Scream
//TODO: Unlike Scream
//TODO: Comment on scream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

// Users route
app.post('/signup', signUp)
app.post('/login', logIn)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.https.onRequest(app)
