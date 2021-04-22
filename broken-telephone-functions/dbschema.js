let db = {
  users: [
    {
      userId: 'XOR0zlABSie7Cilics6NGP5mggx2',
      email: '1@example.com',
      handle: 'user1',
      createdAt: '2021-04-21T19:28:59.075Z',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/screams-e95cf.appspot.com/o/184928.png?alt=media',
      bio: 'Hello, nice to meet you',
      website: 'https://user1.com',
      location: 'Toronto, On',
    },
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'message from user',
      createdAt: '2021-04-20T23:09:39.456Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'nP5TB27cggPre44Qp3yP',
      body: 'First Comment',
      createdAt: '2021-04-21T19:28:59.075Z',
    },
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: 'kdjsfgdksuufhgkdsufky',
      type: 'like | comment',
      createdAt: '2021-04-21T19:28:59.075Z',
    },
  ],
}

const userDetails = {
  // Redux data
  credentials: {
    userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK',
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'hh7O5oWfWucVzGbHH2pa',
    },
    {
      userHandle: 'user',
      screamId: '3IOnFoQexRcofs5OhBXO',
    },
  ],
}
