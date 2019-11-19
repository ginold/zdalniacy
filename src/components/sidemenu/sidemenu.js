import React from 'react';
import './sidemenu.scss';
import FooterSidemenu from '../footer_sidemenu';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../static/logo/logo-wfb-white.svg';
import Badge from '@material-ui/core/Badge';
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
import Auth from '../../services/auth';
import AllInboxIcon from '@material-ui/icons/AllInbox';
// 0 Link title, 1 link icon, 2 english reference

const socialLinks = [
  ["Ekipa", <GroupIcon />, "crew"],
  ["Szukaj profile", <SearchIcon />, "profilesearch"],
  ["Wiadomości", <MessageIcon />, "messages"],
  ["Aktualności", <InfoIcon />, "feed"]
]
const workLinks = [
  ["Oferty Pracy", <WorkIcon />, "jobOffers"],
  ["Rekomendowane", <ThumbUpIcon />, "recommended"],
  ["Moje aplikacje", <AllInboxIcon />, "jobsApplied", "badge"],
  ["Zapisane", <BookmarksIcon />, "jobsSaved", "badge"]
]
const educationLinks = [
  ["Kursy", <SchoolIcon />, "courses"],
  ["Ukończone", <PlaylistAddCheckIcon />, "accomplishedLessons", "badge"],
  ["Zapisane", <BookmarksIcon />, "lessonsSaved", "badge"]
]
const tasksLinks = [
  ["Moje zadania", <AssignmentIcon />, "mytasks"],
  ["Ukończone", <PlaylistAddCheckIcon />, "completed"]
]
const dashboardLinks = [
  ["Zadania na dziś", <AssignmentIcon />, "nope"],
  ["Punkty", <MoneyIcon />, "nope"],
  ["Aktualności", <LibraryBooksIcon />, "nope"],
]
const links = { dashboardLinks, workLinks, educationLinks, tasksLinks, socialLinks }

function Sidemenu({ pathname, ...props }) {

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

  const createNavLink = (el, i) => {
    if (Auth.isAuthenticated() && el[3]) {
      const propName = el[2]
      return <Badge badgeContent={props[propName].length} className="badge" key={i + 'nav-link'}>
        <NavLink to={"/" + getLinkPath(el[2])} key={el[2]} className="sidemenu-link" activeClassName="active-link">
          <span className="sidemenu-link-icon">{el[1]}</span>
          <span className="sidemenu-link-text">{el[0]}</span>
        </NavLink>
      </Badge>
    } else {
      return <NavLink to={"/" + getLinkPath(el[2])} key={i + 'nav-link'} className="sidemenu-link" activeClassName="active-link">
        <span className="sidemenu-link-icon">{el[1]}</span>
        <span className="sidemenu-link-text">{el[0]}</span>
      </NavLink>
    }

  }

  return (
    <aside id="sidemenu">
      {profilePictureUrl ?
        <Avatar alt="profile picture" className="profile-picture" src={profilePictureUrl} /> :
        <Avatar alt="default profile picture" className="profile-picture"><img src={logo} alt="avatar" /></Avatar>}

      <div className="links-container">
        {currentLinks && currentLinks.map((el, i) => {
          return createNavLink(el, i)
        })}
      </div>
      <FooterSidemenu />
    </aside>
  );
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  jobsApplied: state.userData.jobsApplied,
  lessonsSaved: state.userData.saved.lessons,
  accomplishedLessons: state.userData.accomplished.lessons,
  jobsSaved: state.userData.saved.jobs
})

export default connect(mapStateToProps)(Sidemenu);
