import React from 'react'
import NoImg from '../images/no-img.png'

// MUI
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
  ...theme.spreadThis,
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  halfLine: {
    height: 25,
    width: '25%',
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
})

const ScreamSkeleton = (props) => {
  const { classes } = props

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ))

  return <>{content}</>
}

export default withStyles(styles)(ScreamSkeleton)
