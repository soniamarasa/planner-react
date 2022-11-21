import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;
  return <small style={{ color: '#f52d55', margin: '0.2rem' }}>{error}</small>;
};

export default Error;
