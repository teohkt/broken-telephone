const functions = require('firebase-functions')
var admin = require('firebase-admin')
const app = require('express')()

admin.initializeApp()

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
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regEx)) return true
  else return false
}

const isEmpty = (string) => {
  if (string.trim() === '') return true
  else return false
}

const FBAuth = (req, res, next) => {
  let idToken
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    console.error('No Token Found')
    return res.status(403).json({ error: 'Unauthroized' })
  }

  // Verify that the token came from our servers
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken
      return db.collection('users').where('userId', '==', req.user.uid).limit(1).get()
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle
      return next()
    })
    .catch((err) => {
      console.log('Error while verifying token ', err)
      return res.status(403).json(err)
    })
}

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

app.post('/scream', FBAuth, (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
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

  let errors = {}
  if (isEmpty(newUser.email)) {
    errors.email = 'Must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address'
  }

  if (isEmpty(newUser.password)) errors.password = 'Must not be empty'
  if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match'
  if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty'

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

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

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  let errors = {}
  if (isEmpty(user.email)) errors.email = 'Must not be empty'
  if (isEmpty(user.password)) errors.password = 'Must not be empty'

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken()
    })
    .then((token) => {
      return res.json({ token })
    })
    .catch((err) => {
      console.error(err)
      if (err.code === 'auth/wrong-password') {
        return res.status(403).json({ general: 'Wrong credentials, please try again ' })
      } else return res.status(500).json({ error: err.code })
    })
})

exports.api = functions.https.onRequest(app)
