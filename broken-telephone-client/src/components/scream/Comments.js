import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  ...theme.spreadThis,
  commentContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  commentImage: {
    maxWidth: '100%',
    maxHeight: 100,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  commentData: {
    marginLeft: 20,
  },
})

const Comments = ({ classes, comments }) => {
  return (
    <Grid container className={classes.commentContainer}>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment
        return (
          <React.Fragment key={createdAt}>
            <Grid container>
              <Grid item sm={2}>
                <img src={userImage} alt='comment' className={classes.commentImage} />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>
                    {userHandle}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant='body1'>{body}</Typography>
                </div>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && <hr className={classes.visibleSeparator} />}
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

export default withStyles(styles)(Comments)
