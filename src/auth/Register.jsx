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
  }
  onSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: "/register",
      type: "POST",
      data: {
        name: $("#register_name").val(),
        email: $("#register_email").val(),
        password: $("#register_password").val(),
        confirmPassword: $("#register_confirmPassword").val()
      },
      success: (function(res) {
        if (res.redirect) {
          this.props.handleSuccessulAuthentication();
          // setTimeout(function() {
            window.location.href = res.redirect;
            return;
          // }, 100);
          // window.location.href = res.redirect;
          // console.log("REDIRECTING TO:", res.redirect.redirect);
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
  emailError(errors) {
    var temp = "Error: ", changed = false;
    if (errors.blank.indexOf("email") != -1) {
      temp += "Email required.";
      changed = true;
    } else if (errors.tooLong.indexOf("email") != -1) {
        temp += "Email too long.  ";
        changed = true;
    }
    if (errors.invalid.indexOf("email") != -1) {
      temp += "Email invalid.  ";
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
  confirmPasswordError(errors) {
    var temp = "Error: ", changed = false;
    if (errors.blank.indexOf("confirmPassword") != -1) {
      temp += "Password confirmation required.";
      changed = true;
    } else if (errors.tooLong.indexOf("confirmPassword") != -1) {
        temp += "Password confirmation too long.  ";
        changed = true;
    }
    if (errors.invalid.indexOf("confirmPassword") != -1) {
      temp += "Password confirmation must match password.  ";
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
        <form className="register" name="register" onSubmit={this.onSubmit}>
          Name: <input name="name" className="text-input" id="register_name" type="text" placeholder="first and last name"></input>
        <p className="errors">{this.nameError(this.state.errors)}</p>
            Email: <input name="email" className="text-input" id="register_email" type="email" placeholder="email"></input>
          <p className="errors">{this.emailError(this.state.errors)}</p>
          Password: <input name="password" className="text-input" id="register_password" type="password" placeholder="password"></input>
         <p className="errors">{this.passwordError(this.state.errors)}</p>
            Confirm Password: <input name="passwordConfirmation" className="text-input" id="register_confirmPassword" type="password" placeholder="password confirmation"></input>
          <p className="errors">{this.confirmPasswordError(this.state.errors)}</p>
          <input id="log-in-submit" type="submit"></input>
        </form>
    </div>
    )
  }

}

module.exports = Login;
