import React from "react";
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { Link } from "react-router-dom";

function SignUp(props) {
  console.log(props);
  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      fullName: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      from: "form-Signup",
    };
    props.signUpUser(userData);
  };
  console.log(props.message);
  alert(props.message.message);
  return <form onSubmit={handleSubmit}>
      <Link to="/signup">SignUp</Link> 
  </form>;
}

const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
};
const mapStateToProps = (state) => {
  return {
    message: state.userReducer.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
