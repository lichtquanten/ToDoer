import React from "react";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onToggle = this.onToggle.bind(this);
    console.log("PROPS", this.props);
  }
  onDelete(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/deleteTodo",
      data: {
        id: this.props.rawTodo.id
      },
      success: (function(res) {
        console.log("THAT REAL DELET");
        window.location.href = res.redirect;
        return;
      }),
      error: (function(err) {
        console.log(err);
        return;
      }).bind(this)
    });
  }
  onToggle(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/toggleTodo",
      data: {
        id: this.props.rawTodo.id,
        currentCompleted: this.props.rawTodo.completed
      },
      success: (function(res) {
        window.location.href = res.redirect;
        return;
      }),
      error: (function(err) {
        console.log(err);
        return;
      }).bind(this)
    });
  }
  render() {
    var deleteButton =   (
      <form onSubmit={this.onDelete}>
        <input type="submit" name="delete" className="delete" value="delete"></input>
      </form>
    );
    return (
      <div>
        <span className="task-title">{this.props.rawTodo.name}</span>
        <form onSubmit={this.onToggle}>
          <input type="submit" name="toggle" className="toggle" value={this.props.rawTodo.completed ? "Mark incomplete" : "Mark complete"}></input>
        </form>
        {this.props.owned ? deleteButton : <div></div>}
      </div>
    );
  }
}

module.exports = Todo;
