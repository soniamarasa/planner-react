import React from 'react';
import Face3Icon from '@mui/icons-material/Face3';
import FaceIcon from '@mui/icons-material/Face';
import PersonIcon from '@mui/icons-material/Person';

export const UserImg = ({ gender }) => {
  return (
    <>
      {gender === 'female' && <Face3Icon />}
      {gender === 'male' && <FaceIcon />}
      {!gender && <PersonIcon />}
    </>
  );
};
