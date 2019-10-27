import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import FeedbackIcon from '@material-ui/icons/Feedback';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './settings.scss';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';

const settings = [
  { title: 'Mój profil', url: 'myprofile', icon: <PersonIcon /> },
  { title: 'Zmień hasło', url: 'changepassword', icon: <VpnKeyIcon /> },
  { title: 'Prześlij opinię', url: 'sendfeedback', icon: <FeedbackIcon /> }
]
class Settings extends Component {
  render() {
    return <section id="settings">
      <div className="settings-container">
        {settings.map((s) => {
          return <Link to={{
            pathname: '/settings/' + s.url, // TODO replace %%
          }} className="setting">
            <Card className="setting-card">

              <CardActionArea className="setting-card-root">
                <div className="text">
                  {s.icon}
                  <p>{s.title}</p>
                </div>
                <ArrowRightIcon />
              </CardActionArea>

            </Card>
          </Link>

        })}
      </div>
    </section>;
  }
}

export default Settings;
