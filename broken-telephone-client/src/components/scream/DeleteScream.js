import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

// MUI Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'

// Components
import MyButton from '../../util/MyButton'

// Actions
import { deleteScream } from '../../redux/actions/dataActions'

const styles = {
  deleteButton: {
    left: '90%',
    top: '10%',
    position: 'absolute',
  },
}

const DeleteScream = (props) => {
  const { classes, screamId } = props
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDeleteScream = () => {
    dispatch(deleteScream(screamId))
    setOpen(false)
  }

  return (
    <>
      <MyButton tip='Delete Scream' onClick={handleOpen} btnClassName={classes.deleteButton}>
        <DeleteOutline color='secondary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// DeleteScream.propTypes = {
//   deleteScream: PropTypes.func.isRequired,
//   classes: PropTypes.object.isRequired,
//   screamId: PropTypes.string.isRequired,
// }

export default withStyles(styles)(DeleteScream)
