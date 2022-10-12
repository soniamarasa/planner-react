import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import { Toast } from './helpers/Toast';
import { ThemeStorage } from './ThemeContext';
import { ItemStorage } from './ItemContext';
import { Container } from './components/Container/Container';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeStorage>
          <ItemStorage>
            <Container />
          </ItemStorage>
        </ThemeStorage>
        <Toast />
      </BrowserRouter>
    </div>
  );
}

export default App;
