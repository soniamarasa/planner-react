import React from 'react';
import { Card } from '@mui/material';
import { Item } from './Item';

export const Todo = ({ items }) => {
  function todo() {
    return items.filter((item) => item.where === 'todo');
  }

  return (
    <Card className="card">
      <h3>To do</h3>
      <ul>
        {todo()?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </ul>
    </Card>
  );
};
