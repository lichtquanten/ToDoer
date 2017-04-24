import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessulAuthentication = this.handleSuccessulAuthentication.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.state = {
      isSuccessfullyAuthenticated: false
    };
  }
  handleSuccessulAuthentication() {
    this.setState({isSuccessfullyAuthenticated: true});
  }
  conditionalRender(bool) {
    if (bool) {
      return (<h2 className="welcome"></h2>);
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome to ToDoer</h1>
        <Login handleSuccessulAuthentication={this.handleSuccessulAuthentication}/>
        <Register handleSuccessulAuthentication={this.handleSuccessulAuthentication}/>
          <footer>
              <a href="/logout" className="logout">Logout</a>
          </footer>
          {this.conditionalRender(this.state.isSuccessfullyAuthenticated)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
