import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// Components
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'

// Actions
import { getScream } from '../../redux/actions/dataActions'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// MUI Icons
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 175,
    height: 175,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: '1%',
    top: '4%',
  },
  expandButton: {
    position: 'absolute',
    right: '3%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
})

const ScreamDialog = (props) => {
  const { classes, screamId, userHandle } = props
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const { body, createdAt, likeCount, commentCount, userImage, comments } = useSelector((state) => state.data.scream)
  const { loading } = useSelector((state) => state.UI)

  const handleOpen = () => {
    setOpen(true)
    dispatch(getScream(screamId))
  }
  const handleClose = () => {
    setOpen(false)
  }

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={6}>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body1'>{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount}</span>

        <MyButton tip='comments'>
          <ChatIcon color='primary'></ChatIcon>
        </MyButton>
        <span>{commentCount}</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <Comments comments={comments} />
    </Grid>
  )

  return (
    <>
      <MyButton onClick={handleOpen} tip='Expand Scream' tipClassName={classes.expandButton}>
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(ScreamDialog)
