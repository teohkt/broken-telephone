import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// Components
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

// Actions
import { getScream, clearErrors } from '../../redux/actions/dataActions'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// MUI Icons
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'

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
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  message: {
    padding: '16px 0',
  },
  actionButtons: {
    marginLeft: '-12px',
  },
})

const ScreamDialog = (props) => {
  const { classes, screamId, userHandle, openDialog } = props
  const [open, setOpen] = useState(false)
  const [oldPath, setOldPath] = useState('')

  const dispatch = useDispatch()
  const { body, createdAt, likeCount, commentCount, userImage, comments } = useSelector((state) => state.data.scream)
  const { loading } = useSelector((state) => state.UI)

  const handleOpen = () => {
    let oldLinkDirect = window.location.pathname
    let newLinkDirect = `/users/${userHandle}/scream/${screamId}`

    if (oldLinkDirect === newLinkDirect) {
      setOldPath(`/users/${userHandle}`)
    } else {
      setOldPath(oldLinkDirect)
    }

    window.history.pushState(null, null, newLinkDirect)

    setOpen(true)
    dispatch(getScream(screamId))
  }
  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false)
    dispatch(clearErrors())
  }

  useEffect(() => {
    if (openDialog) {
      handleOpen()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog])

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={100} thickness={2} />
    </div>
  ) : (
    <Grid container>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={6}>
        <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body1' className={classes.message}>
          {body}
        </Typography>
        <div className={classes.actionButtons}>
          <LikeButton screamId={screamId} />
          <span style={{ paddingRight: '60px' }}>{likeCount}</span>

          <MyButton tip='comments'>
            <ChatIcon color='primary'></ChatIcon>
          </MyButton>
          <span>{commentCount}</span>
        </div>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  )

  return (
    <>
      <MyButton onClick={handleOpen} tip='Comments'>
        <ChatIcon color='primary'></ChatIcon>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </>
  )
}

export default withStyles(styles)(ScreamDialog)
