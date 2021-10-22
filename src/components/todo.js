import { Card } from '@mui/material';


function Todo() {
  return (
    <Card className="box">
      <h3> To Do </h3>
      <div>
        <ul>
          <li>
            Tarefa 1
          </li>
          <li>
            Tarefa 2
          </li>
        </ul>
      </div>
    </Card>
  );
}

export default Todo;
