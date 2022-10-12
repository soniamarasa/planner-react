import React from 'react';
import { setLocalStorage, getLocalStorage } from './LocalStorage';

export const defaultTheme = 'theme-01';

export const setThemeStorage = (theme) => {
  setLocalStorage('theme', theme);
};

export const getTheme = (key) => {
  return getLocalStorage('theme');
};
