import * as React from "react";
import * as ReactDOM from "react-dom";

// import Root from "./Root";
// const fastclick = require("fastclick");
// fastclick.attach(document.body);

class HomeView extends React.Component {
  render() {
    return (
      <div>
        Welcome to the machine learning demo site!!
      </div>
    );
  }
}

ReactDOM.render(<HomeView />, document.getElementById("root"));