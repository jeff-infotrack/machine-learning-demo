import classnames from 'classnames';
import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import OCR from './OCR';
import SearchClassification from './SearchClassification';
import ServiceSuggestions from './ServiceSuggestions';

export default class Master extends Component {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: false };
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
    this.menuItemClick = this.menuItemClick.bind(this);
    this.getLinkClass = this.getLinkClass.bind(this);
  }

  onMenuStateChange() {
    return this.state.isMenuOpen;
  }

  getLinkClass(path) {
    const curPath = window.location.pathname.split('?')[0].toLowerCase();
    return classnames('menu-item', { 'menu-item-active': curPath === path.toLowerCase() });
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
              className={this.getLinkClass('/')}
              onClick={this.menuItemClick}
            >
              Home
            </Link>
            <Link
              to="/search-class"
              className={this.getLinkClass('/search-class')}
              onClick={this.menuItemClick}
            >Search Classification
            </Link>
            <Link
              to="/service-suggestion"
              className={this.getLinkClass('/service-suggestion')}
              onClick={this.menuItemClick}
            >Service Suggestion
            </Link>
            <Link
              to="/service-suggestion"
              className={this.getLinkClass('/ocr')}
              onClick={this.menuItemClick}
            >OCR
            </Link>
          </Menu>
          <main id="page-wrap">
            <Route exact path="/" component={Home} />
            <Route path="/search-class" component={SearchClassification} />
            <Route path="/service-suggestion" component={ServiceSuggestions} />
            <Route path="/ocr" component={OCR} />
          </main>
        </div>
      </Router>
    );
  }
}
