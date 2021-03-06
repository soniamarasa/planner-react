import '../styles/weekday.scss';
import Card from '@mui/material/Card';
import getItems from '../services/service';
import React, { useEffect, useState } from 'react';

function WeekDay(props) {
  const [items, setItems] = useState();

  useEffect(() => {
    getItems(props.box)
      .then((data) => setItems(data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);

  return (
    <Card className="day-card">
      <h2>{props.day}</h2>
      <ul>
        {items?.map((item) => (
          <li key={item._id}>{item.description}</li>
        ))}
      </ul>
    </Card>
  );
}

export default WeekDay;
