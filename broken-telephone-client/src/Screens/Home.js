import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// MUI
import Grid from '@material-ui/core/Grid'

// Components
import ScreamCard from '../components/ScreamCard'
import Profile from '../components/Profile'

// Actions
import { getScreams } from '../redux/actions/dataActions'

const Home = () => {
  const { screams, isLoading, error } = useSelector((state) => state.data)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getScreams())
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {isLoading && 'Loading'}
        {error && 'Error'}
        {screams ? screams.map((scream) => <ScreamCard key={scream.screamId} scream={scream} />) : ''}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  )
}

export default Home
