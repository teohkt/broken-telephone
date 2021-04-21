const functions = require('firebase-functions')
var admin = require('firebase-admin')
const app = require('express')()

var serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://screams-e95cf-default-rtdb.firebaseio.com',
})

const firebaseConfig = {
  apiKey: 'AIzaSyCUIa_U8IpRqsqxrEADaIPR_JfQcshj8ho',
  authDomain: 'screams-e95cf.firebaseapp.com',
  databaseURL: 'https://screams-e95cf-default-rtdb.firebaseio.com',
  projectId: 'screams-e95cf',
  storageBucket: 'screams-e95cf.appspot.com',
  messagingSenderId: '609058758975',
  appId: '1:609058758975:web:fa23d7003b4930a933f38a',
}

const firebase = require('firebase')
const { DatabaseBuilder } = require('firebase-functions/lib/providers/firestore')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()

app.get('/screams', (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let screams = []
      data.forEach((doc) => {
        screams.push({
          // screamId: doc.id,
          // body: doc.data().body,
          // userHandle: doc.data().userHandle,
          // createdAt: doc.data().createdAt,
          ...doc.data(),
        })
      })
      return res.json(screams)
    })
    .catch((err) => console.error(err))
})

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  }
  db.collection('screams')
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(err)
    })
})
// Signup route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  //TODO: validate data
  let token, userId
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'This handle is already taken' })
      } else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then((data) => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then((idToken) => {
      token = idToken
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId,
      }
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token: token })
    })
    .catch((err) => {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' })
      } else {
        return res.status(500).json({ error: err.code })
      }
    })
})
exports.api = functions.https.onRequest(app)
