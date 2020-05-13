import React from 'react';
import Link from 'gatsby-link';
import Logo from './Logo';
import { useTheme } from '../ThemeContext';

import 'tachyons';

const Header = ({ children  }) => {
  const {dark, themeToggle} = useTheme();

  return (
    <nav className="primary-nav bg-parent db dt-l fixed w-100 border-box pa3 ph5-l avenir">
      <Link className="db dtc-l v-mid link dim w-100 w-25-l tc tl-l mb2 mb0-l" to="/" title="Home">
        <Logo width="30" />
      </Link>
      <div className="db f6 dtc-l v-mid w-100 w-25-l tc ttu tr-l">
        <button className={`btn ${dark ? '-light' : '-dark'}`} onClick={() => themeToggle()}>{dark ? 'Light' : 'Dark'}</button>
        <Link to="/about" className="link dim dib mr3">About</Link>
        {/* <Link to="/work" className="link dim white dib mr3">Work</Link> */}
        <Link to="/resume" className="link dim dib">R&eacute;sum&eacute;</Link>
      </div>
    </nav>
  )
}

export default Header;