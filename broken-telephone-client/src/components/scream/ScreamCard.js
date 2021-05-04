import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

// Components
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
    width: 100,
    height: 100,
    objectFit: 'cover',
    margin: 20,
    borderRadius: '50%',
  },
  content: {
    padding: '25px 0 0 25px',
    objectFit: 'cover',
    paddingBottom: 0,
  },
  message: {
    padding: '16px 8px 16px 0',
  },
  actionButtons: {
    marginLeft: '-12px',
  },
}

const ScreamCard = (props) => {
  const {
    classes,
    scream: { body, createdAt, userHandle, userImage, likeCount, commentCount, screamId },
    openDialog,
  } = props

  dayjs.extend(relativeTime)

  const user = useSelector((state) => state.user)

  const deleteButton =
    user.authenticated && userHandle === user.credentials.handle ? <DeleteScream screamId={screamId} /> : null

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title='Profile image' className={classes.image} />
      <div className={classes.content}>
        <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>
          {userHandle}
        </Typography>

        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1' className={classes.message}>
          {body}
        </Typography>

        <div className={classes.actionButtons}>
          <LikeButton screamId={screamId} />
          <span style={{ paddingRight: '60px' }}>{likeCount}</span>

          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={openDialog} />
          <span>{commentCount}</span>
        </div>
      </div>
    </Card>
  )
}

export default withStyles(styles)(ScreamCard)
