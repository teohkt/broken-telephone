import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// MUI icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

// Actions
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

// Components
import MyButton from '../../util/MyButton'

const LikeButton = ({ screamId }) => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const likedScreamStatus = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId)) return true
    else return false
  }

  const likeScreamAction = () => {
    dispatch(likeScream(screamId))
  }
  const unlikeScreamAction = () => {
    dispatch(unlikeScream(screamId))
  }

  return (
    <>
      {!user.authenticated ? (
        <MyButton tip='Like'>
          <Link to='/login'>
            <FavoriteBorderIcon color='primary' />
          </Link>
        </MyButton>
      ) : likedScreamStatus() ? (
        <MyButton tip='Undo like' onClick={unlikeScreamAction}>
          <FavoriteIcon color='primary' />
        </MyButton>
      ) : (
        <MyButton tip='Like' onClick={likeScreamAction}>
          <FavoriteBorderIcon color='primary' />
        </MyButton>
      )}
    </>
  )
}

export default LikeButton
