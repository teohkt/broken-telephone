import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// MUI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

// MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

// Actions
import { markNotificationsRead } from '../../redux/actions/userActions'

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { notifications } = useSelector((state) => state.user)

  dayjs.extend(relativeTime)
  const dispatch = useDispatch()
  const handleOpen = (e) => {
    setAnchorEl(e.target)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId)
    dispatch(markNotificationsRead(unreadNotificationsIds))
  }

  let notificationsIcon
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge badgeContent={notifications.filter((not) => not.read === false).length} color='secondary'>
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />)
  } else {
    notificationsIcon = <NotificationsIcon />
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb = notification.type === 'like' ? 'liked' : 'commented on'
        const time = dayjs(notification.createdAt).fromNow()
        const iconColor = notification.read ? 'primary' : 'secondary'
        const icon =
          notification.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          )

        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              variant='body1'
              to={`/users/${notification.recipient}/scream/${notification.screamId}`}
            >
              {notification.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    )

  return (
    <MenuItem>
      <Tooltip placement='top' title='Notifications'>
        <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup='true' onClick={handleOpen}>
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onEntered={onMenuOpened}>
        {notificationsMarkup}
      </Menu>
    </MenuItem>
  )
}

export default Notifications
