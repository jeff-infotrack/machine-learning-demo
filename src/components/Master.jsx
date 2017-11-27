import * as React from 'react';
// import { connect } from "react-redux";
// import { ActionCreator, bindActionCreators } from "redux";
// import { dismissMessage, showMessage } from "./actions";
// import { IHaveShellState } from "./models";

import PropTypes from 'prop-types';

export default class Master extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

Master.defaultProps = {
  children: <div />,
};

Master.propTypes = {
  children: PropTypes.element,
};
