import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';


export const Day = (props) => {
console.log(props)

  return (
    <Card className="day-card">
      <h2>{props.day}</h2>
      <ul>
        {props.items?.map((item) => (
          <li key={item._id}>{item.description}</li>
        ))}
      </ul>
    </Card>
  );
};
