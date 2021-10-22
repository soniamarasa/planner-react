import WeekDays from './weekDays';
import Todo from './todo';
import Calendar from './calendar';
import { Grid } from '@mui/material';

function MainContainer(props) {
  return (
    <Grid className="container" container spacing={2}>
      <Grid item xs={12} sm={12} md={10}>
        <WeekDays></WeekDays>
      </Grid>
      <Grid className="boxes" item xs={12} sm={12} md>
        <Calendar></Calendar>
        <Todo></Todo>
      </Grid>
    </Grid>
  );
}

export default MainContainer;
