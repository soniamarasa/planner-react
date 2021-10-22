import WeekDay from './day';
import { Grid } from '@mui/material';
import Notes from './notes';

function MainContainer() {
  return (
    <div className="boxes">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md >
          <WeekDay day="Segunda"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md >
          <WeekDay day="Terça"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md >
          <WeekDay day="Quarta"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={6} md >
          <WeekDay day="Quinta"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={6} md >
          <WeekDay day="Sexta"></WeekDay>
        </Grid>
      </Grid>

      <Grid className="row02" container spacing={2}>
        <Grid item xs={12} sm={4} md >
          <WeekDay day="Sabado"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md >
          <WeekDay day="Domingo"></WeekDay>
        </Grid>
        <Grid item xs={12} sm={4} md >
          <Notes></Notes>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainContainer;
