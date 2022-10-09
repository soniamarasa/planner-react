import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Day } from '../Cards/Day';
import { Notes } from '../Cards/Notes';

export const PlannerBody = () => {
  return (
    <Box className="container-planner">
      <Grid  container spacing={2}>
        <Grid item xs={12} sm={4} md>
          <Day day="Segunda" box="mon">
          </Day>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <Day day="Terça" box="tue"></Day>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <Day day="Quarta" box="wed"></Day>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <Day day="Quinta" box="thu"></Day>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <Day day="Sexta" box="fri"></Day>
        </Grid>
      </Grid>

      <Grid className="row02" container spacing={2}>
        <Grid item xs={12} sm={4} md>
          <Day day="Sabado" box="sat"></Day>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <Day day="Domingo" box="sun"></Day>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <Notes box="notes"></Notes>
        </Grid>
      </Grid>
    </Box>
  );
};
