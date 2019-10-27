import React, { Component } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import IconButton from '@material-ui/core/IconButton';

class NotificationsButton extends Component {
  render() {
    return (
      <Badge badgeContent="5" className="badge">
        <PopupState variant="popover" popupId="popup-menu">
          {popupState => (
            <React.Fragment>
              <IconButton className="icon-button" variant="contained" {...bindTrigger(popupState)}>
                <NotificationsIcon className="icon"></NotificationsIcon>
              </IconButton>
              <Menu {...bindMenu(popupState)} className="popup-menu"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                getContentAnchorEl={null}

                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={popupState.close}>Zadanie na dziś: pogadaj z mentorem!</MenuItem>
                <MenuItem onClick={popupState.close}>Zadanie na dziś: pogadaj z mentorem!</MenuItem>
                <MenuItem onClick={popupState.close}>Zadanie na dziś: pogadaj z mentorem!</MenuItem>

              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Badge>
    );
  }
}

export default NotificationsButton;
