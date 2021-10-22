import '../styles/weekday.scss';
import Card from '@mui/material/Card';

function WeekDay(props) {
  return (
    <Card className="day-card">
      <h2>{props.day}</h2>
      <ul>
        <li className="Important">Tarefa 1</li>
        <li className="started">Tarefa 1</li>
        <li className="completed">Tarefa 1</li>
        <li className="canceled">Tarefa 1</li>
        <li className="Importante">Tarefa 1</li>
      </ul>
    </Card>
  );
}

export default WeekDay;
