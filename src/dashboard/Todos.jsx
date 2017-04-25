import React from "react";
import Todo from "./Todo.jsx";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.getTodos = this.getTodos.bind(this);
    this.createTodos = this.createTodos.bind(this);
    this.state = {
      todos: this.getTodos(this.props.rawTodos)
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({todos: this.getTodos(nextProps.rawTodos)});
  }
  getTodos(rawTodos) {
    var ownedTodos = this.createTodos(rawTodos.ownedTodos, true);
    var sharedTodos = this.createTodos(rawTodos.sharedTodos, false);
    var result = ownedTodos.concat(sharedTodos);
    return result;
  }
  createTodos(rawTodos, owned) {
    var result = rawTodos.map((function(rawTodo) {
      var className = rawTodo.completed ? "task completed" : "task";
      return (<li className={className}><Todo rawTodo={rawTodo} owned={owned} /></li>);
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
