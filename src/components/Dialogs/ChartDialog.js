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


export const ChartDialog = (props) => {
  const { theme} = React.useContext(ThemeContext);
  const { onClose, open } = props;

  const [started, setStarted] = React.useState(0);
  const [finished, setFinished] = React.useState(0);
  const [important, setImportant] = React.useState(0);
  const [canceled, setCanceled] = React.useState(0);
  const [notStarted, setNotStarted] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [dataTasks, setDataTasks] = React.useState([]);
  const [showGraph, setShowGraph] = React.useState(false)

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
        data: [],
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
  }

  const populateGraph = (graphData) => {
    console.log(graphData)
    data.datasets[0].data = graphData
  }

  React.useEffect(() => {
    getItems(getLocalStorage()).then((items) => {
      dataChart(
        items.data.filter((item) => {
          if (item.type === 'task') return item;
          
        })
      );
    });
  }, []);

  const dataChart = (items) => {
    console.log(items)
    let v_started = 0
    let v_finished = 0
    let v_canceled = 0
    let v_important = 0
    let v_notStarted = 0
    let v_total = 0


    items.forEach((item) => {
      if (item.started) {
        setStarted(started => started + 1)
        v_started += 1;
      } else if (item.finished) {
        setFinished(finished => finished + 1)
        v_finished += 1;
      } else if (item.canceled) {
        setCanceled(canceled => canceled + 1)
        v_canceled += 1;
      } else if (item.important) {
        setImportant(important => important + 1)
        v_important += 1;
      } else if (
        !item.important &&
        !item.finished &&
        !item.started &&
        !item.canceled
      ) {
        setNotStarted(notStarted => notStarted + 1)
        v_notStarted += 1;
      }
      setTotal(total => total + 1)
      v_total += 1;
    });

    // dataTasks = [notStarted, started, important, finished, canceled];
    setDataTasks([notStarted, started, important, finished, canceled])
    populateGraph([v_notStarted, v_started, v_important, v_finished, v_canceled])
    setShowGraph(true)
  };
  
  console.log([notStarted, started, important, finished, canceled])
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
       { showGraph && <Pie options={chartOptions} data={data} /> }
        <h4>Total: {total}</h4>
      </DialogContent>
    </Dialog>
  );
};

ChartDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
