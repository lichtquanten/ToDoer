import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      errors: {
        blank: [],
        tooLong: [],
        invalid: []
      }
    };
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("SENDING AJAX");
    $.ajax({
      url: "/addTodo",
      type: "POST",
      data: {
        form_name: $("#form_name").val(),
        form_description: $("#form_description").val(),
        form_collaborator1: $("#form_collaborator1").val(),
        form_collaborator2: $("#form_collaborator2").val(),
        form_collaborator3: $("#form_collaborator3").val()
      },
      success: (function(res) {
        console.log(res);
        if (res.redirect) {
            window.location.href = res.redirect;
            return;
        }
        if (res.errors.blank.length > 0 || res.errors.tooLong.length > 0 || res.errors.invalid.length > 0){
          this.setState({errors: res.errors});
        }
      }).bind(this),
      error: function(err) {
        console.log(err);
        alert("Server error.");
      }
    });
  }
  nameError(errors) {
      var temp = "Error: ", changed = false;
      if (errors.blank.indexOf("name") != -1) {
        temp += "Name required.";
        changed = true;
      } else if (errors.tooLong.indexOf("name") != -1) {
          temp += "Name too long.  ";
          changed = true;
      }
      if (!changed) {
        return;
      }
      return temp;
  }
  descriptionError(errors) {
      var temp = "Error: ", changed = false;
      if (errors.blank.indexOf("description") != -1) {
        temp += "Name required.";
        changed = true;
      } else if (errors.tooLong.indexOf("description") != -1) {
          temp += "Name too long.  ";
          changed = true;
      }
      if (!changed) {
        return;
      }
      return temp;
  }
  collaboratorError(errors, collaborator) {
    if (errors.invalid.indexOf(collaborator) != -1) {
      return "Error: Email invalid";
    }
  }
  render() {
    return (
      <div>
          <h4>Add a new task</h4>
          <form className="createTask" onSubmit={this.onSubmit}>
              <label htmlFor="name">Task name</label>
              <input id="form_name" name="name" type="text"></input>
              <p className="errors">{this.nameError(this.state.errors)}</p>
              <br></br>
              <label htmlFor="description">Task Description</label>
              <input id="form_description" name="description" type="text"></input>
              <p className="errors">{this.descriptionError(this.state.errors)}</p>
              <br></br>Collaborators<br></br>
              <input id="form_collaborator1" name="collaborator1" type="email"></input>
              <p className="errors">{this.collaboratorError(this.state.errors, "collaborator1")}</p>
              <br></br>
              <input id="form_collaborator2" name="collaborator2" type="email"></input>
              <p className="errors">{this.collaboratorError(this.state.errors, "collaborator2")}</p>
              <br></br>
              <input id="form_collaborator3" name="collaborator3" type="email"></input>
              <p className="errors">{this.collaboratorError(this.state.errors, "collaborator3")}</p>
              <br></br>
              <input type="submit" className="create-task-submit"></input>
          </form>
      </div>
    );
  }
}

module.exports = Form;
