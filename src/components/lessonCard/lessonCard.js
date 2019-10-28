import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './lessonCard.scss';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CardActionArea from '@material-ui/core/CardActionArea';;

export default function LessonCard(props) {
  const lesson = props.lesson

  const getHours = (duration) => {
    return Math.round(duration / 60) + ' godziny';
  }
  return (
    <Card className="lesson-card">
      <CardActionArea className="lesson-card-container">
        <CardMedia
          className="lesson-card-image"
          image={"/images/lessons/" + lesson.imgUrl + ".png"}
          title={lesson.title}
        />
        <CardContent className="lesson-card-content-root">
          <div className="lesson-card-content">
            <Typography gutterBottom variant="h5" component="h2" className="lesson-title">
              {lesson.title}
            </Typography>
            <Typography component="p" className="lesson-description">
              {lesson.description}
            </Typography>
            <div className="properties">
              <div className="property"><HourglassEmptyIcon /><p>{getHours(lesson.duration)}</p></div>
              <div className="property">
                {lesson.cost > 0 ? (<><AttachMoneyIcon /> <p>{lesson.cost} punktów</p></>) : (<p className="free">ZA DARMO</p>)}
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
