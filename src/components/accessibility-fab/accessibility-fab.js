import React from 'react';
import Fab from '@material-ui/core/Fab';
import AccessibleIcon from '@material-ui/icons/Accessible';
import './accessibility-fab.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function AccessibilityFab() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [i, setI] = React.useState(0)
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const setBiggerFontSize = () => {
    switch (i) {
      case 0:
        document.body.style.fontSize = '18px'
        setI(i + 1)
        break

      case 1:
        document.body.style.fontSize = '20px'
        setI(i + 1)
        break

      case 2:
        document.body.style.fontSize = '22px'
        setI(0)

        break;

      default:
        break;
    }
  }
  return <>
    <Fab aria-label="accessibility button"
      className="accessibility fab"
      aria-controls="accessibility-menu"
      aria-haspopup="true"
      onClick={handleClick} >

      <AccessibleIcon />
    </Fab>

    <Menu
      id="accessibility-menu"
      className="profile-button-popup-menu"
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      keepMounted
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
      <MenuItem onClick={setBiggerFontSize}><span>A++</span></MenuItem>
      <hr></hr>
      <MenuItem onClick={handleClose}><span>Zamknij</span></MenuItem>
    </Menu>
  </>
}

export default AccessibilityFab;
