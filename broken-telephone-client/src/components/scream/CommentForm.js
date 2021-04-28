import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { submitComment, clearErrors } from '../../redux/actions/dataActions'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const styles = (theme) => ({
  ...theme.spreadThis,
})

const CommentForm = ({ classes, screamId }) => {
  const [comment, setComment] = useState('')
  const { authenticated } = useSelector((state) => state.user)
  const { errors } = useSelector((state) => state.UI)
  const { comments } = useSelector((state) => state.data.scream)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted data: ' + comment)
    dispatch(submitComment(screamId, { body: comment }))
  }
  useEffect(() => {
    setComment('')
    dispatch(clearErrors())
  }, [comments.length])
  return (
    <>
      {authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='Comment on scream'
              error={errors.comment ? true : false}
              helperText={errors.comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              className={classes.textField}
            />
            <Button type='submit' variant='contained' color='primary' className={classes.button}>
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      ) : (
        ''
      )}
    </>
  )
}

export default withStyles(styles)(CommentForm)
