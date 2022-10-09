import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';


import ProtectedRoute from './helpers/ProtectedRoute';
import { Toast } from './helpers/Toast';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Auth } from './pages/auth/Auth';
import { SignUp } from './pages/signup/SignUp';
import { Password } from './pages/password/Password';
import { NotFound } from './pages/not-found/NotFound';
import { Home } from './pages/home/Home';
import { Account } from './pages/account/Account';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="theme01">
          <Header />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password" element={<Password />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </main>
        <Toast />
      </BrowserRouter>
    </div>
  );
}

export default App;
