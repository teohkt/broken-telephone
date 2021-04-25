import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

//Components
import MyButton from '../util/MyButton'

//Actions
import { editUserDetails } from '../redux/actions/userActions'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

//MUI Icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: 'right',
  },
})

const EditDetails = (props) => {
  const { classes } = props
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const { bio: userBio, website: userWebsite, location: userLocation } = useSelector((store) => store.user.credentials)

  const handleOpen = () => {
    setBio(userBio ? userBio : '')
    setWebsite(userWebsite ? userWebsite : '')
    setLocation(userLocation ? userLocation : '')
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!bio) {
      setBio('0')
    }
    if (!website) {
      setWebsite('0')
    }
    if (!location) {
      setLocation('0')
    }
    console.log('bio: ' + typeof bio + typeof website + typeof location)
    dispatch(editUserDetails({ bio, website, location }))
  }

  return (
    <>
      <MyButton tip='Edit Details' btnClassName={classes.button} onClick={handleOpen}>
        <EditIcon color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs' aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio'
              className={classes.textField}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name='website'
              type='text'
              label='Website'
              placeholder='Your personal website'
              className={classes.textField}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name='location'
              type='text'
              label='Location'
              placeholder='Toronto, ON'
              className={classes.textField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditDetails)
