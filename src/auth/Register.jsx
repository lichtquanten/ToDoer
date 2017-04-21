import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form className="register" id="register_form">
          <input className="name" type="text" placeholder="First and last name" autoFocus></input>
          <input className="email" type="text" placeholder="Email"></input>
          <input className="password" type="password" placeholder="Password"></input>
          <input className="password" type="password" placeholder="Confirm password"></input>
          <input className="register" type="submit" value="Submit"></input>
        </form>
        <a className="clickable" onClick={this.props.change}>Been here before?  Click here to login.</a>
      </div>
    )
  }

}

module.exports = Register;
