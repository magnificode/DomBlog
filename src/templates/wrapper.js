import React from 'react';
import Header from '../components/Header';
import { ThemeProvider, ThemeContext } from '../ThemeContext';

const Wrapper = ( { children } ) => {

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`wrapper ${context.dark ? '-dark' : '-light'}`}>
            <Header />
            {children}
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}


export default Wrapper;