import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import './lessonTabs.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function LessonTabs(props) {
  const lesson = props.lesson
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (<div className="lesson-tabs" >
    <Paper position="static" color="default" className="lesson-tabs-root">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab className="lesson-tab" label="Opis" {...a11yProps(0)} />
        <Tab className="lesson-tab" label="Zadania" {...a11yProps(1)} />
        <Tab className="lesson-tab" label="Materiały" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          {lesson.description}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {lesson.tasks.map((task, i) => {
            return <div key={i + '-task'}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
            </div>
          })}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Materiały do zadań.
        </TabPanel>
      </SwipeableViews>
    </Paper>
  </div>)
}

LessonTabs.propTypes = {};

export default LessonTabs;
