import React from 'react'
import NoImg from '../images/no-img.png'

// MUI
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import TodayIcon from '@material-ui/icons/Today'

const styles = (theme) => ({
  ...theme.spreadThis,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0px auto 7px auto',
  },
  fullLine: {
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    marginBottom: 10,
  },
  halfLine: {
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '50%',
    marginBottom: 10,
  },
})

const ProfileSkeleton = (props) => {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={NoImg} alt='profile' className='profile-image' />
          <hr />
          <div className='profile-details'>
            <div className={classes.handle} />
            <hr />
            <div className={classes.fullLine} />
            <hr />
            <LocationOn color='primary' />
            <span>Location</span>
            <hr />
            <LinkIcon color='primary' /> https://website.com
            <hr />
            <TodayIcon color='primary' /> Join Date
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(ProfileSkeleton)
