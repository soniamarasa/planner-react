import React from 'react';
import Card from '@mui/material/Card';
import { Item } from './Item';

export const Notes = (props) => {
  return (
    <Card className="card notes">
      <h3>Notes</h3>
      <ul>
        {props.items?.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </ul>
    </Card>
  );
};
