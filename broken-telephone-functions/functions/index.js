const functions = require('firebase-functions')

const app = require('express')()

const FBAuth = require('./util/FBAuth')

const { db } = require('./util/admin')

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require('./handlers/screams')
const {
  signUp,
  logIn,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
} = require('./handlers/users')

// Screams routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)
app.get('/scream/:screamId/like', FBAuth, likeScream)
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)
app.delete('/scream/:screamId/', FBAuth, deleteScream)

// Users route
app.post('/signup', signUp)
app.post('/login', logIn)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/user/:handle', getUserDetails)
app.post('/notifications', markNotificationsRead)

exports.api = functions.https.onRequest(app)

// Database trigger, not endpoint. No need to return json values (error, data)
exports.createNotificationOnLike = functions.firestore.document('/likes/{id}').onCreate((snapshot) => {
  return db
    .doc(`/screams/${snapshot.data().screamId}`)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'like',
          read: false,
          screamId: doc.id,
        })
      }
    })
    .catch((err) => {
      console.error(err)
      return
    })
})

exports.deleteNotificationOnUnlike = functions.firestore.document('/likes/{id}').onDelete((snapshot) => {
  return db
    .doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch((err) => {
      console.error(err)
      return
    })
})

exports.createNotificationOnComment = functions.firestore.document('/comments/{id}').onCreate((snapshot) => {
  return db
    .doc(`/screams/${snapshot.data().screamId}`)
    .get()
    .then((doc) => {
      if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'comment',
          read: false,
          screamId: doc.id,
        })
      }
    })
    .catch((err) => {
      console.error(err)
      return
    })
})
