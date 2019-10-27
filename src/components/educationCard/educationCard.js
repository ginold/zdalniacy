import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import './educationCard.scss';
import { Link } from 'react-router-dom';

class EducationCard extends Component {
  constructor(props) {
    super(props)
    this.courseType = props.courseType
  }
  render() {
    const courseType = this.courseType

    return (
      <Link to={{
        pathname: '/education/courses/' + courseType.type, // TODO replace %%
      }} className="education-card">
        <Card className="card-root">

          <CardActionArea>
            <CardMedia className="education-card-img" image={"/images/courses/" + courseType.type + ".jpg"} title={`Temat ${courseType.title}`}>
            </CardMedia>
            <div className="education-card-info">
              <div className="text">
                <h2>{courseType.title}</h2>
                <p>{courseType.count} kursów</p>
              </div>
            </div>
          </CardActionArea>

        </Card>
      </Link>
    );
  }
}

EducationCard.propTypes = {
  courseType: PropTypes.object
};

export default EducationCard;
