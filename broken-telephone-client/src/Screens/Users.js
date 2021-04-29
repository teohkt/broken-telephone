import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

// MUI
import Grid from '@material-ui/core/Grid'

// Components
import ScreamCard from '../components/scream/ScreamCard'
import StaticProfile from '../components/profile/StaticProfile'

// Actions
import { getUserData } from '../redux/actions/dataActions'

const Users = (props) => {
  const handle = props.match.params.handle
  const screamIdParam = props.match.params.screamId
  const [profile, setProfile] = useState(null)
  const { screams, loading } = useSelector((state) => state.data)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserData(handle))
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data)
      })
      .catch((err) => console.log(err))
  }, [dispatch, handle])

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? (
          <p>Loading data...</p>
        ) : screams === null ? (
          <p>No screams from this user</p>
        ) : !screamIdParam ? (
          screams.map((scream) => <ScreamCard key={scream.screamId} scream={scream} />)
        ) : (
          screams.map((scream) => {
            if (scream.screamId !== screamIdParam) return <ScreamCard key={scream.screamId} scream={scream} />
            else return <ScreamCard key={scream.screamId} scream={scream} openDialog />
          })
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? <p>Loading Profile...</p> : <StaticProfile profile={profile} />}
      </Grid>
    </Grid>
  )
}

export default Users
