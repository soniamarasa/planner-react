import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../../helpers/ProtectedRoute';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Auth } from '../../pages/auth/Auth';
import { SignUp } from '../../pages/signup/SignUp';
import { Password } from '../../pages/password/Password';
import { NotFound } from '../../pages/not-found/NotFound';
import { Home } from '../../pages/home/Home';
import { Account } from '../../pages/account/Account';

import { ThemeContext } from '../../ThemeContext';

export const Container = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <main className={theme}>
      <div className='container-root'>
        <Header />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-reset/:token" element={<Password />} />
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
      </div>
    </main>
  );
};
