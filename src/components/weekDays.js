import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import WeekDay from './day';
import Notes from './notes';
import getItems from '../services/service';

function MainContainer() {
  return (
    <div className="boxes">
      <Grid className="teste" container spacing={2}>
        <Grid item xs={12} sm={4} md>
          <WeekDay day="Segunda" box="mon">
            {' '}
          </WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <WeekDay day="Terça" box="tue"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <WeekDay day="Quarta" box="wed"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <WeekDay day="Quinta" box="thu"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={6} md>
          <WeekDay day="Sexta" box="fri"></WeekDay>
        </Grid>
      </Grid>

      <Grid className="row02" container spacing={2}>
        <Grid item xs={12} sm={4} md>
          <WeekDay day="Sabado" box="sat"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <WeekDay day="Domingo" box="sun"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md>
          <Notes box="notes"></Notes>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainContainer;
