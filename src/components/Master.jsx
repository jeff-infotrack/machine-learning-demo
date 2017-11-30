import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/Home';
import SearchClassification from '../components/SearchClassification';

export default class Master extends Component {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
    this.menuItemClick = this.menuItemClick.bind(this);
  }

  onMenuStateChange() {
    return this.state.isMenuOpen;
  }

  menuItemClick() {
    this.setState({ isMenuOpen: false });
  }

  render() {
    const { isMenuOpen } = this.state;

    return (
      <Router>
        <div id="outer-container">
          <Menu
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            isOpen={isMenuOpen}
            onStateChange={this.onMenuStateChange}
          >
            <Link to="/" className="menu-item" onClick={this.menuItemClick}>
              Home
            </Link>
            <Link to="/search-class" className="menu-item" onClick={this.menuItemClick}>Search Classification</Link>
          </Menu>
          <main id="page-wrap">
            <Route exact path="/" component={Home} />
            <Route path="/search-class" component={SearchClassification} />
          </main>
        </div>
      </Router>
    );
  }
}
