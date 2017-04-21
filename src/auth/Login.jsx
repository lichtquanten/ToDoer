import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.emailError = this.emailError.bind(this);
    this.passwordError = this.passwordError.bind(this);

    this.state = {
      errors: {}
    };
    this.waiting = false;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.waiting) {
      alert("Please wait...");
    } else {
      $.ajax({
        url: "/login",
        type: "POST",
        data: {
          email: $("#login_email").val(),
          password: $("#login_password").val()
        },
        success: (function(res) {
          this.waiting = false;
          console.log(res.errors);
          if (res.errors){
            this.setState({errors: res.errors});
          }
          if (res.redirect) {
            window.location.href = res.redirect;
          }
        }).bind(this),
        error: function(err) {
          console.log(err);
          this.waiting = false;
          alert("Server error.");
        }
      });
    }
  }

  emailError(errors) {
    var temp = "Error: ", changed = false;
    if (errors.hasOwnProperty("emailBlank") && errors.emailBlank) {
      temp += "Email required.";
      changed = true;
    }
    if (errors.hasOwnProperty("emailTooLong") && errors.emailTooLong) {
        temp += "Email too long.  ";
        changed = true;
    }
    if (errors.hasOwnProperty("emailInvalid") && errors.emailInvalid) {
      temp += "Email invalid.  ";
      changed = true;
    }
    if (errors.hasOwnProperty("emailNotFound") && errors.emailNotFound) {
      temp += "Email not found.  Please register.";
      changed = true;
    }
    if (errors.hasOwnProperty("incorrectAuth") && errors.incorrectAuth) {
      temp += errors.incorrectAuthMessage;
      changed = true;
    }
    if (!changed) {
      return;
    }
    return temp;
  }
  passwordError(errors) {
    var temp = "Error: ", changed = false;
    if (errors.passwordBlank) {
      temp += "Password required.";
      changed = true;
    } else if (errors.passwordTooLong) {
        temp += "Password too long.  ";
        changed = true;
    } else if (errors.wrongPassword) {
      temp += "Wrong password.  ";
      changed = true;
    }
    if (!changed) {
      return;
    }
    return temp;
  }
  render() {
    return (
      <div>
        <form className="login" name="login" onSubmit={this.onSubmit}>
            Email: <input className="email" id="login_email" type="text" placeholder="Email" autoFocus></input>
          <p className="errors">{this.emailError(this.state.errors)}</p>
          Password: <input className="password" id="login_password" type="password" placeholder="Password"></input>
          <p className="errors">{this.passwordError(this.state.errors)}</p>
          <input id="log-in-submit" type="submit"></input>
        </form>
    </div>
    )
  }

}

module.exports = Login;
