import React from 'react';
import Header from '../components/Header';
// import { ThemeProvider, ThemeContext } from '../ThemeContext';

const Wrapper = ( { children } ) => {

  return (
    <div className={`wrapper`}>
      <Header />
      {children}
    </div>
  );
}


export default Wrapper;