import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import classnames from 'classnames';

import Home from './Home';
import SearchClassification from './SearchClassification';
import ServiceSuggestions from './ServiceSuggestions';

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
    const { pathname } = window.location;

    return (
      <Router>
        <div id="outer-container">
          <Menu
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
            isOpen={isMenuOpen}
            onStateChange={this.onMenuStateChange}
          >
            <Link
              to="/"
              className={classnames('menu-item', { 'menu-item-active': pathname === '/' })}
              onClick={this.menuItemClick}
            >
              Home
            </Link>
            <Link
              to="/search-class"
              className={classnames('menu-item', { 'menu-item-active': pathname === '/search-class' })}
              onClick={this.menuItemClick}
            >Search Classification
            </Link>
            <Link
              to="/service-suggestion"
              className={classnames('menu-item', { 'menu-item-active': pathname === '/service-suggestion' })}
              onClick={this.menuItemClick}
            >Service Suggestion
            </Link>
          </Menu>
          <main id="page-wrap">
            <Route exact path="/" component={Home} />
            <Route path="/search-class" component={SearchClassification} />
            <Route path="/service-suggestion" component={ServiceSuggestions} />
          </main>
        </div>
      </Router>
    );
  }
}

