import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

//Components
import MyButton from '../util/MyButton'

//Actions
import { postScream } from '../redux/actions/dataActions'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

//MUI Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme) => ({
  ...theme.spreadThis,
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    position: 'absolute',
  },
})

const PostScream = (props) => {
  const { classes } = props
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')

  const dispatch = useDispatch()
  const { loading, errors } = useSelector((state) => state.UI)
  const { screams } = useSelector((state) => state.data)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postScream({ body: body }))
  }

  useEffect(() => {
    setOpen(false)
    setBody('')
  }, [screams.length])

  return (
    <>
      <MyButton tip='Post a Scream!' onClick={handleOpen}>
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='SCREAM'
              multiline
              rows='3'
              placeholder='TELL THE WORLD'
              errors={errors.body ? 'true' : 'false'}
              helperText={errors.body}
              className={classes.textField}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            ></TextField>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostScream)
