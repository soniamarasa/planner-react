import React from 'react';
import Box from '@mui/material/Box';
import {  Grid } from '@mui/material';
import { Day } from '../Cards/Day';
import { Notes } from '../Cards/Notes';

export const PlannerBody = ({ items }) => {
  function itemsBox(box) {
    return items.filter((item) => item.where === box);
  }

  return (
    <Box className="container-planner">
    
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Day day="Monday" items={itemsBox('mon')}></Day>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Day day="Tuesday" items={itemsBox('tue')}></Day>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Day day="Wednesday" items={itemsBox('wed')}></Day>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Day day="Thursday" items={itemsBox('thu')}></Day>
      </Grid>
     
       <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Day day="Friday" items={itemsBox('fri')}></Day>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <Day day="Saturday" items={itemsBox('sat')}></Day>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
        <Day day="Sunday" items={itemsBox('sun')}></Day>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
        <Notes items={itemsBox('notes')}></Notes>
      </Grid>
    </Grid>
  </Box>
  );
};
