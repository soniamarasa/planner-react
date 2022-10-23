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
import { ItemContext } from '../../ItemContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartDialog = (props) => {
  const { theme } = React.useContext(ThemeContext);
  const { graph, handleSetChart } = React.useContext(ItemContext);
  const [showGraph, setShowGraph] = React.useState(false);
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

  let data = {
    labels: ['Not started', 'Started', 'Important', 'Finished', 'Canceled'],
    datasets: [
      {
        label: 'Statistics',
        data: graph.data,
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
    getItems(getLocalStorage()).then((items) => {
      handleSetChart(
        items.data.filter((item) => {
          if (item.type === 'task') return item;
        })
      );
      setShowGraph(true);
    });
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      className={theme + ' ' + 'chart'}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Statistics</DialogTitle>
      <DialogContent>
        {showGraph && <Pie options={chartOptions} data={data} />}
        <h4>Total: {graph.total}</h4>
      </DialogContent>
    </Dialog>
  );
};

ChartDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
