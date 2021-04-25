import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import TodayIcon from '@material-ui/icons/Today'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

//Actions
import { logoutUser, uploadImage } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '10px',
    },
  },
})

const Profile = (props) => {
  const { classes } = props
  const userStore = useSelector((state) => state.user)
  const { imageUrl, handle, bio, website, createdAt, location } = userStore.credentials
  const { authenticated, loading } = userStore

  const dispatch = useDispatch()

  const handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    dispatch(uploadImage(formData))
  }
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='Profile' className='profile-image' />
            <input type='file' id='imageInput' hidden='hidden' onChange={handleImageChange} />
            <Tooltip title='Edit Profile Picture' placement='top'>
              <IconButton onClick={handleEditPicture} className='button'>
                <EditIcon color='primary'></EditIcon>
              </IconButton>
            </Tooltip>
          </div>
          <hr />

          <div className='profile-details'>
            <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color='primary' /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <TodayIcon color='primary' /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>
          <Tooltip title='Logout' placement='top'>
            <IconButton onClick={handleLogout}>
              <KeyboardReturnIcon color='primary' />
            </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No profile found, please login
        </Typography>
        <div className={classes.buttons}>
          <Button variant='contained' color='primary' component={Link} to='/login'>
            Login
          </Button>
          <Button variant='contained' color='secondary' component={Link} to='/signup'>
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  )
  return profileMarkup
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
