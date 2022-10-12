import React, { useState } from 'react';
import { Card } from '@mui/material';
import Calendar from 'react-calendar';

export const CalendarCard = () => {
  const [value, onChange] = useState(new Date());
  return (
    <Card className="card canlendar">
      <h3>Calendar</h3>
      <Calendar locale='en-US'  onChange={onChange} value={value} />
    </Card>
  );
};
