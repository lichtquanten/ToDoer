import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Welcome to ToDoer</h1>
        <Login change={this.change}/>
        <Register change={this.change}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
