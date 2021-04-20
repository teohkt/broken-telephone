const functions = require('firebase-functions')

var admin = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://screams-e95cf-default-rtdb.firebaseio.com',
})

const express = require('express')
const app = express()

app.get('/screams', (req, res) => {
  admin
    .firestore()
    .collection('screams')
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
  admin
    .firestore()
    .collection('screams')
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` })
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(err)
    })
})

exports.api = functions.https.onRequest(app)
