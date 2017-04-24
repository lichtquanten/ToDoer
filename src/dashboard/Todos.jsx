import React from "react";
import Todo from "./Todo.jsx";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.ownedTodos = this.props.rawTodos.ownedTodos.map((function(rawTodo) {
      return (<li className="task"><Todo rawTodo={rawTodo} owned={true} /></li>);
    }).bind(this));
    this.sharedTodos = this.props.rawTodos.sharedTodos.map((function(rawTodo) {
      return (<li className="task"><Todo rawTodo={rawTodo} owned={false} /></li>);
    }).bind(this));
  }
  render() {
    return (
      <div>
        <ul>{this.ownedTodos}</ul>
        <ul>{this.sharedTodos}</ul>
      </div>
    )
  }
}

module.exports = Todos;
