import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.emailError = this.emailError.bind(this);
    this.passwordError = this.passwordError.bind(this);

    this.state = {
      errors: {
        blank: [],
        tooLong: [],
        invalid: []
      }
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
          console.log("SUCCC");
          console.log(res);
          this.waiting = false;
          if (res.errors.blank.length > 0 || res.errors.tooLong.length > 0 || res.errors.invalid.length > 0){
            this.setState({errors: res.errors});
          }
          if (res.redirect) {
            window.location.href = res.redirect;
            console.log("REDIRECTING TO:", res.redirect.redirect);
          }
        }).bind(this),
        error: function(err) {
          console.log("ERRR");
          this.waiting = false;
          alert("Server error.");
        }
      });
    }
  }

  emailError(errors) {
    var temp = "Error: ", changed = false;
    if (errors.blank.indexOf("email") != -1) {
      temp += "Email required.";
      changed = true;
    }
    if (errors.tooLong.indexOf("email") != -1) {
        temp += "Email too long.  ";
        changed = true;
    }
    if (errors.invalid.indexOf("email") != -1) {
      temp += "Email invalid.  ";
      changed = true;
    }
    if (errors.invalid.indexOf("auth") != -1) {
      console.log("INVALID AUTH");
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
    if (errors.blank.indexOf("password") != -1) {
      temp += "Password required.";
      changed = true;
    } else if (errors.tooLong.indexOf("password") != -1) {
        temp += "Password too long.  ";
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
