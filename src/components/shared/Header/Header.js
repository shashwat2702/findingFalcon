import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.scss';
import hamburger from '../../../assets/hamburger.svg';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 'home',
    };
  }

  render() {
    return (
      <nav className="pageHeader">
        <div className="navLinks">
          <Link to="/" className="active">Home</Link>
          <Link to="/">News</Link>
          <Link to="/">Contact</Link>
          <Link to="/">About</Link>
          <img src={hamburger} alt="hamburger menu" />
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);
