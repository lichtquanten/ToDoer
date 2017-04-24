import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form.jsx";
import Todos from "./Todos.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.appData = window.appData;
    console.log(this.appData.todos);
  }
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
            <h1>Social todo app for cpsc213</h1>

            <h2 className="welcome">Welcome, {this.appData.name}</h2>
            <div>
                <h4>Your Tasks</h4>
                <Todos rawTodos={this.appData.todos} />
            </div>
        <Form />
        <footer>
            <a href="/logout" className="logout">Logout</a>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("dashboard"));
