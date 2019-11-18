import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import PointsCounter from '../pointsCounter'
import './profile-button.scss';
import Auth from '../../services/auth';

function ProfileButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>

      <PointsCounter />
      <IconButton
        className="icon-button"
        variant="contained"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <PersonIcon className="icon"></PersonIcon>
      </IconButton>
      <Menu
        id="fade-menu"
        className="profile-button-popup-menu"
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
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}><PersonIcon className="icon"></PersonIcon><span>Mój profil</span></MenuItem>
        <Link to="/settings"><MenuItem onClick={handleClose}><SettingsIcon className="icon" /><span>Ustawienia</span></MenuItem></Link>
        <MenuItem onClick={handleClose}><FeedbackIcon className="icon"></FeedbackIcon><span>Prześlij opinię</span></MenuItem>
        <MenuItem onClick={handleClose}><EmojiEventsIcon className="icon"></EmojiEventsIcon><span>Wymień punkty</span></MenuItem>
        <hr></hr>
        <MenuItem onClick={() => { Auth.signOut(); handleClose() }}><ExitToAppIcon className="icon"></ExitToAppIcon><span>Wyloguj</span></MenuItem>
      </Menu>

    </span>
  );
}

export default ProfileButton
