import React, { Component } from 'react';
import Header from '../components/Header';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    let whichTheme = true;
    if (typeof window !== `undefined`) {
      const localTheme = window.localStorage.getItem('theme') === 'dark' ? true : false;
      whichTheme = window.localStorage.getItem('theme') === null ? true : localTheme;
    }
    this.state = {
      isDark: whichTheme,
    }
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    this.setState(() =>
      ({ isDark: !this.state.isDark }),
      () => {
        if (typeof window !== `undefined`) {
          window.localStorage.setItem('theme', this.state.isDark === true ? 'dark' : 'light');
        }
      }
    );
  }

  render() {
    const { isDark } = this.state;
    return (
      <div className={`wrapper ${isDark === true ? '-dark' : '-light'}`}>
        <Header changeTheme={this.changeTheme} isDark={this.state.isDark}/>
        {this.props.children}
      </div>
    )
  }
}

export default Wrapper;