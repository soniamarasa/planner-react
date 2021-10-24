import './App.scss';
import MainContainer from './components/container.js';
import BasicSpeedDial from './components/actionsPlanner.js'

function App() {
  return (
    <div>
      <header>
        <h1>Week Planner</h1>
       
      </header>
      <MainContainer></MainContainer> 
      <BasicSpeedDial></BasicSpeedDial>
      <footer>
        <p>
          By:{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="http://soniamarasa.github.io"
          >
            {' '}
            Sônia Mara de Sá
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
