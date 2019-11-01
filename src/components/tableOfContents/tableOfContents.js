import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './tableOfContents.scss';

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


function TableOfContents(props) {
  const chapters = props.chapters

  return (<div className="table-of-contents" >
    <Paper className="table-of-contents-root">
      <h2 className="table-of-contents-title">Spis treści</h2>

      {chapters.map((chapter, i) => {
        return <ExpansionPanel key={i + '-chapter'}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="chapter-title">{`${i + 1}. ${chapter.title}`}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="table-of-contents-panel-details">
            {chapter.subchapters.map((sub, i) => {
              return <p className="subchapter-title" key={i + '-subchapter'}>{sub}</p>
            })}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      })}
    </Paper>
  </div>)
}

TableOfContents.propTypes = {
  chapters: PropTypes.array
};

export default TableOfContents;
