import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

//Components
import MyButton from '../../util/MyButton'

//Actions
import { editUserDetails } from '../../redux/actions/userActions'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'

//MUI Icons
import MoreVertIcon from '@material-ui/icons/MoreVert'

const styles = (theme) => ({
  ...theme.spreadThis,
  editProfileButton: {
    left: '86%',
    top: '0%',
    position: 'absolute',
  },
})

const EditDetails = (props) => {
  const { classes } = props
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  const dispatch = useDispatch()

  const { bio: userBio, website: userWebsite, location: userLocation } = useSelector((store) => store.user.credentials)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
    handleMenuClose()
  }

  const handleOpen = () => {
    setBio(userBio ? userBio : '')
    setWebsite(userWebsite ? userWebsite : '')
    setLocation(userLocation ? userLocation : '')
    setOpen(true)
    handleMenuClose()
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
    dispatch(editUserDetails({ bio, website, location }))
  }

  return (
    <>
      <MyButton
        tip='Edit Profile'
        aria-controls='fade-menu'
        aria-haspopup='true'
        onClick={handleMenuClick}
        btnClassName={classes.editProfileButton}
      >
        <MoreVertIcon color='primary'></MoreVertIcon>
      </MyButton>
      <Menu
        id='fade-menu'
        anchorEl={anchorEl}
        keepMounted
        open={openMenu}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleEditPicture}>Edit Profile Picture</MenuItem>
        <MenuItem onClick={handleOpen}>Edit Bio</MenuItem>
      </Menu>

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
