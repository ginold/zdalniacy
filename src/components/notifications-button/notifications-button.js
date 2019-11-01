import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux'
import NotificationsService from '../../services/notificationsService';
import Fade from '@material-ui/core/Fade';

function NotificationsButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const notifications = props.notifications.notifications || []
  const unread = props.notifications.unread

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    NotificationsService.resetUnread()
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Badge badgeContent={unread} className="badge">
      <IconButton className="icon-button" variant="contained"
        onClick={handleClick}>
        <NotificationsIcon className="icon"></NotificationsIcon>
      </IconButton>
      <Menu
        className="popup-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top', horizontal: 'right',
        }}
      >
        {notifications.map((n, i) => {
          return <MenuItem onClick={handleClose} key={i + '-notification'}>{n.title}</MenuItem>
        })}
        {notifications.length === 0 && <MenuItem onClick={handleClose}>Nie ma żadnych powiadomień.</MenuItem>}
      </Menu>
    </Badge>
  );
}
const mapStateToProps = (state) => ({
  notifications: state.notifications
})

export default connect(mapStateToProps)(NotificationsButton);
