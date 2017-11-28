import * as React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

class Master extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    };

    return (
      <div id="outer-container">
        <Menu pageWrapId="page-wrap" outerContainerId="outer-container" styles={styles}>
          <ul>
            <li><Link to="/" className="menu-item">Home</Link></li>
            <li><Link to="/search" className="menu-item">Search Classification</Link></li>
          </ul>
        </Menu>
        <main id="page-wrap">
          {this.props.children}
        </main>
      </div>
    );
  }
}

Master.defaultProps = {
  children: <div />,
};

Master.propTypes = {
  children: PropTypes.any,
};

const mapStateToProps = state => bindActionCreators({
  allState: state
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Master));
