import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PlannerBody } from '../../components/PlannerBody/PlannerBody';
import { getItems } from '../../services/api';
import { getLocalStorage } from '../../helpers/LocalStorage';

export const Home = () => {
  const [items, setItems] = useState();
  const userId = getLocalStorage('idUser');

  useEffect(() => {
    getItems(userId).then((items) => {
      console.log(items.data);
    });
  }, []);

  return (
    <Box className="container container-md">
      <Grid container spacing={2} className="grid">
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={9}
          xl={9}
          className="container-img"
        >
          <PlannerBody />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          xl={3}
          className="container-login"
        ></Grid>
      </Grid>
    </Box>
  );
};
