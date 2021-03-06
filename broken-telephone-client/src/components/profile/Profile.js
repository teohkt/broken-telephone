import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'

//Components
import ProfileSkeleton from '../../util/ProfileSkeleton'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import TodayIcon from '@material-ui/icons/Today'

//Actions
import { uploadImage } from '../../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.spreadThis,
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

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='Profile' className='profile-image' />
            <input type='file' id='imageInput' hidden='hidden' onChange={handleImageChange} />
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
    <ProfileSkeleton />
  )
  return profileMarkup
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)
