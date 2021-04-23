import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

// Components
import ScreamCard from '../components/ScreamCard'

const Home = () => {
  const [screams, setScreams] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const retrieveData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await axios.get(`/screams`)
      setScreams(data)
      setIsLoading(false)
    } catch (err) {
      setError(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    retrieveData()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {isLoading && 'Loading'}
        {error && 'Error'}
        {screams ? screams.map((scream) => <ScreamCard key={scream.docId} scream={scream} />) : ''}
      </Grid>
      <Grid item sm={4} xs={12}></Grid>
    </Grid>
  )
}

export default Home
