import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import './profile-button.scss';
import Auth from '../../auth';

function ProfileButton() {
  // let isLogged = useSelector(state => state.isLogged); // as in reducers/index

  return (
    <PopupState variant="popover" popupId="popup-menu" >
      {popupState => (
        <React.Fragment>
          {Auth.getUserType() !== 'employer' && <div className="points">2500 pkt</div>}
          <IconButton className="icon-button" variant="contained" {...bindTrigger(popupState)}>
            <PersonIcon className="icon"></PersonIcon>
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
            <MenuItem onClick={popupState.close}><PersonIcon className="icon"></PersonIcon><span>Mój profil</span></MenuItem>
            <Link to="/settings"><MenuItem onClick={popupState.close}><SettingsIcon className="icon" /><span>Ustawienia</span></MenuItem></Link>
            <MenuItem onClick={popupState.close}><FeedbackIcon className="icon"></FeedbackIcon><span>Prześlij opinię</span></MenuItem>
            <MenuItem onClick={popupState.close}><EmojiEventsIcon className="icon"></EmojiEventsIcon><span>Wymień punkty</span></MenuItem>
            <hr></hr>
            <MenuItem onClick={() => { Auth.signOut(); popupState.close() }}><ExitToAppIcon className="icon"></ExitToAppIcon><span>Wyloguj</span></MenuItem>
          </Menu>
        </React.Fragment>
      )
      }
    </PopupState >
  );
}

export default ProfileButton;
