import * as React from 'react';
import { Link } from 'react-router-dom';

// import styles from '../styles/components/home.less';

export default () => (
  <div>
    <h1 className="page-title">
      InfoLab Demos
    </h1>
    <h2 className="description">
      Experiental code testing!!!
    </h2>
    <nav className="demo-buttons">
      <Link to="/search-class" className="current-demo">Search Classification</Link>
    </nav>
  </div>
);
