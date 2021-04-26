import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

// Components
import MyButton from '../util/MyButton'
import DeleteScream from './DeleteScream'

// Actions
import { likeScream, unlikeScream } from '../redux/actions/dataActions'

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

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const likedScreamStatus = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) return true
    else return false
  }

  const likeScreamAction = () => {
    dispatch(likeScream(screamId))
  }
  const unlikeScreamAction = () => {
    dispatch(unlikeScream(screamId))
  }

  const likeButton = !user.authenticated ? (
    <MyButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorderIcon color='primary' />
      </Link>
    </MyButton>
  ) : likedScreamStatus() ? (
    <MyButton tip='Undo like' onClick={unlikeScreamAction}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeScreamAction}>
      <FavoriteBorderIcon color='primary' />
    </MyButton>
  )

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

        {likeButton}
        <span>{likeCount}</span>

        <MyButton tip='comments'>
          <ChatIcon color='primary'></ChatIcon>
        </MyButton>
        <span>{commentCount}</span>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(ScreamCard)
