import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { PlannerBody } from '../../components/PlannerBody/PlannerBody';
import { CalendarCard } from '../../components/Cards/CalendarCard';
import { Todo } from '../../components/Cards/Todo';
import { getItems } from '../../services/api';
import { NewItemDialog } from '../../components/Dialogs/NewItemDialog';

import { ItemContext } from '../../ItemContext';
import 'react-calendar/dist/Calendar.css';
import './Home.scss';

export const Home = () => {
  const { items, setItems } = React.useContext(ItemContext);
  const [openNewItemDialog, setNewItemDialog] = React.useState(false);

  const handleClickOpenNewItemDialog = () => {
    setNewItemDialog(true);
  };

  const handleCloseNewItemDialog = () => {
    setNewItemDialog(false);
  };

  useEffect(() => {
    getItems().then((items) => {
      setItems(
        items.data.sort((a, b) => {
          if (a.type && b.type)
            return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
            else return null
        })
      );
    });
  }, [setItems]);

  return (
    <Box className="container container-home">
      <div className="add-item">
        {' '}
        <IconButton onClick={handleClickOpenNewItemDialog}>
          {' '}
          <AddIcon />{' '}
        </IconButton>{' '}
      </div>

      <Grid container spacing={2} columnSpacing={2} className="grid">
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={9}
          xl={9}
          className="container-img"
        >
          <PlannerBody items={items} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          xl={3}
          className="container-planner container-col-2"
        >
          {' '}
          <CalendarCard />
          <Todo items={items} />
        </Grid>
      </Grid>
      <NewItemDialog
        open={openNewItemDialog}
        onClose={handleCloseNewItemDialog}
      />
    </Box>
  );
};
