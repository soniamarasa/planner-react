import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getItems } from '../../services/api';
import { getLocalStorage } from '../../helpers/LocalStorage';
import { ThemeContext } from '../../ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

let started = 0;
let finished = 0;
let important = 0;
let canceled = 0;
let notStarted = 0;
let total = 0;
let dataTasks = [];

export const ChartDialog = (props) => {
  const { theme} = React.useContext(ThemeContext);
  const { onClose, open } = props;

  const chartOptions = {
    responsive: true,
    scales: {},
    plugins: {
      legend: {
        labels: {
          color: '#808080',
        },
      },
    },
  };

  const data = {
    labels: ['Not started', 'Started', 'Important', 'Finished', 'Canceled'],
    datasets: [
      {
        label: 'Statistics',
        data: dataTasks,
        backgroundColor: [
          '#eebd1e',
          '#b995b9',
          '#4AB915',
          '#5C5C5E',
          '#f52d55',
        ],
        hoverBackgroundColor: [
          '#FFB324',
          '#CDB4CD',
          '#72E938',
          '#979799',
          '#F8708B',
        ],
        borderWidth: 1,
      },
    ],
  };

  React.useEffect(() => {
    getItems(getLocalStorage('userId')).then((items) => {
      dataChart(
        items.data.filter((item) => {
          if (item.type === 'task') return item;
          
        })
      );
    });
  }, []);

  const dataChart = (items) => {
    items.forEach((item) => {
      if (item.started) {
        started += 1;
      } else if (item.finished) {
        finished += 1;
      } else if (item.canceled) {
        canceled += 1;
      } else if (item.important) {
        important += 1;
      } else if (
        !item.important &&
        !item.finished &&
        !item.started &&
        !item.canceled
      ) {
        notStarted += 1;
      }
      total += 1;
    });

    dataTasks = [notStarted, started, important, finished, canceled];

    return dataTasks;
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      className={theme + " " + "chart"}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Statistics</DialogTitle>
      <DialogContent>
        <Pie options={chartOptions} data={data} />
        <h4>Total: {total}</h4>
      </DialogContent>
    </Dialog>
  );
};

ChartDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
