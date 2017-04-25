import React from "react";
import Todo from "./Todo.jsx";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.createTodos = this.createTodos.bind(this);
    this.state = {
      todos: this.createTodos(this.props.rawTodos)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({todos: this.createTodos(nextProps.rawTodos)});
  }
  createTodos(rawTodos) {
    console.log("RAW", rawTodos);
    var result = rawTodos.map((function(rawTodo) {
      var className = rawTodo.completed ? "task completed" : "task";
      return (<li className={className}><Todo rawTodo={rawTodo} /></li>);
    }));
    return result;
  }
  render() {
    return (
      <div>
        <ul className="tasks">{this.state.todos}</ul>
      </div>
    )
  }
}

module.exports = Todos;
