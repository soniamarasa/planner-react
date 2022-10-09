import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;
  return <small style={{ color: '#f31', margin: '0.2rem' }}>{error}</small>;
};

export default Error;
