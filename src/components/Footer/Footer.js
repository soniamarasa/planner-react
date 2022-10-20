import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const location = useLocation();
  const rotes = ['/auth', '/', '/signup', '/account'];
  const passwordReset = '/password-reset';

  return (
    <>
      {(rotes.includes(location.pathname) ||
        location.pathname.includes(passwordReset)) && (
        <footer>
          <span>
            By:{' '}
            <a
              id="footer"
              target="_blank"
              rel="noreferrer"
              href="http://soniamarasa.github.io"
            >
              Sônia Mara de Sá
            </a>
          </span>
        </footer>
      )}
    </>
  );
};
