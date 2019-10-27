import React from 'react';
import './sidemenu.scss';
import FooterSidemenu from '../footer_sidemenu';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PersonIcon from '@material-ui/icons/Person';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIcon from '@material-ui/icons/Assignment';
import WorkIcon from '@material-ui/icons/Work';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SchoolIcon from '@material-ui/icons/School';
import Avatar from '@material-ui/core/Avatar';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MoneyIcon from '@material-ui/icons/Money';
// 0 Link title, 1 link icon, 2 english reference
const socialLinks = [
  ["Ekipa", <GroupIcon />, "crew"],
  ["Szukaj profile", <SearchIcon />, "profilesearch"],
  ["Wiadomości", <MessageIcon />, "messages"],
  ["Aktualności", <InfoIcon />, "feed"]
]
const workLinks = [
  ["Rekomendowane", <ThumbUpIcon />, "recommended"],
  ["Moje aplikacje", <WorkIcon />, "myapplications"],
  ["Zapisane", <BookmarksIcon />, "saved"]
]
const educationLinks = [
  ["Kursy", <SchoolIcon />, "courses"],
  ["Ukończone", <PlaylistAddCheckIcon />, "completed"],
  ["Zapisane", <BookmarksIcon />, "saved"]
]
const tasksLinks = [
  ["Moje zadania", <AssignmentIcon />, "mytasks"],
  ["Ukończone", <PlaylistAddCheckIcon />, "completed"]
]
const dashboardLinks = [
  ["Zadania na dziś", <AssignmentIcon />, "w"],
  ["Punkty", <MoneyIcon />, "s"],
  ["Aktualności", <LibraryBooksIcon />, "x"],
]
const links = { dashboardLinks, workLinks, educationLinks, tasksLinks, socialLinks }

function Sidemenu({ pathname }) {

  const currentPath = pathname.split("/")[1];
  let currentLinks = links[currentPath + 'Links']; // remove slash
  const getLinkPath = (subpath) => {
    return currentPath + "/" + subpath
  }

  let userData = useSelector(state => state.userData); // as in reducers/index
  const profilePicture = () => {
    if (userData.fromFacebook) {
      let url = userData.picture.data.url
      return url
    }
    return null
  }
  let profilePictureUrl = profilePicture()

  return (
    <aside id="sidemenu">
      {profilePictureUrl ?
        <Avatar alt="profile picture" className="profile-picture" src={profilePictureUrl} /> :
        <Avatar alt="default profile picture" className="profile-picture"><PersonIcon className="profile-picture"></PersonIcon></Avatar>}

      <div className="links-container">
        {currentLinks && currentLinks.map((el) => {
          return <NavLink to={"/" + getLinkPath(el[2])} key={el[2]} className="sidemenu-link" activeClassName="active-link">
            <span className="sidemenu-link-icon">{el[1]}</span>
            <span className="sidemenu-link-text">{el[0]}</span>
          </NavLink>
        })}
      </div>
      <FooterSidemenu />
    </aside>
  );
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
})

export default connect(mapStateToProps)(Sidemenu);
