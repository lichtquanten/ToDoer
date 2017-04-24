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
      url: "/login",
      type: "POST",
      data: {
        email: $("#email").val(),
        password: $("#password").val()
      },
      success: (function(res) {
        console.log(res);
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

  emailError(errors) {
    var temp = "Error: ", changed = false;
    if (errors.blank.indexOf("email") != -1) {
      temp += "Email required.";
      changed = true;
    } if (errors.tooLong.indexOf("email") != -1) {
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
        <form className="login" onSubmit={this.onSubmit}>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="text"></input><br></br>
          <p className="errors">{this.emailError(this.state.errors)}</p>
          <label htmlFor="password">Password</label>
          <input name="password"  id="password" type="text"></input><br></br>
          <p className="errors">{this.passwordError(this.state.errors)}</p>
          <input type="submit"  className="log-in-submit"></input>
        </form>
    </div>
    )
  }

}

module.exports = Login;
