import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import TodayIcon from '@material-ui/icons/Today'

const styles = (theme) => ({
  ...theme.spreadThis,
})

const StaticProfile = (props) => {
  const { classes, profile } = props
  const { handle, createdAt, imageUrl, bio, website, location } = profile.user

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={imageUrl} alt='Profile' className='profile-image' />
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
      </div>
    </Paper>
  )
}

export default withStyles(styles)(StaticProfile)
