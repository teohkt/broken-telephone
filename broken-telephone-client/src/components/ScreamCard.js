import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = {
  card: {
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
    scream: { body, createdAt, userHandle, userImage },
  } = props

  dayjs.extend(relativeTime)

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title='Profile image' className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>
          {userHandle}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1'>{body}</Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(ScreamCard)
