import React from 'react';
import Card from '@mui/material/Card';

import { Item } from './Item';

export const Day = (props) => {
  return (
    <Card className="card day">
      <h2>{props.day}</h2>
      <ul>
        {props.items?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </ul>
    </Card>
  );
};
