import React, { Component } from 'react';
import Header from '../components/Header';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    const localTheme = window.localStorage.getItem('theme') === 'dark' ? true : false;
    this.state = {
      isDark: window.localStorage.getItem('theme') === null ? true : localTheme,
    }
    this.changeTheme = this.changeTheme.bind(this);
    console.log(window.localStorage.getItem('theme'));
  }

  changeTheme() {
    this.setState(() =>
      ({ isDark: !this.state.isDark }),
      () => {
        window.localStorage.setItem('theme', this.state.isDark === true ? 'dark' : 'light');
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