import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

// MUI Icons
import ChatIcon from '@material-ui/icons/Chat'

// Components
import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
}

const ScreamCard = (props) => {
  const {
    classes,
    scream: { body, createdAt, userHandle, userImage, likeCount, commentCount, screamId },
  } = props

  dayjs.extend(relativeTime)

  const user = useSelector((state) => state.user)

  const deleteButton =
    user.authenticated && userHandle === user.credentials.handle ? <DeleteScream screamId={screamId} /> : null

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title='Profile image' className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>
          {userHandle}
        </Typography>

        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>

        <LikeButton screamId={screamId} />
        <span>{likeCount}</span>

        <MyButton tip='comments'>
          <ChatIcon color='primary'></ChatIcon>
        </MyButton>
        <span>{commentCount}</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(ScreamCard)
