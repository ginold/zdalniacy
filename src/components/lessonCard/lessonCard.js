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
  return (
    <Card className="lesson-card">
      <CardActionArea className="lesson-card-container">
        <CardMedia
          className="lesson-card-image"
          image={"/images/lessons/" + lesson.imgUrl + ".png"}
          title={lesson.title}
        />
        <CardContent>
          <div className="lesson-card-content">
            <Typography gutterBottom variant="h5" component="h2" className="lesson-title">
              {lesson.title}
            </Typography>
            <Typography component="p" className="lesson-description">
              {lesson.description}
            </Typography>
            <div className="properties">
              <div className="property"><HourglassEmptyIcon /><p>4 godziny</p></div>
              <div className="property"><AttachMoneyIcon /><p>500 punktów</p></div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
