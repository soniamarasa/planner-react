import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import { ToastContainer } from 'react-toastify';
import { ThemeStorage } from './ThemeContext';
import { ItemStorage } from './ItemContext';
import { Container } from './components/Container/Container';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeStorage>
          <ItemStorage>
            <Container />
          </ItemStorage>
        </ThemeStorage>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          closeOnClick={false}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
