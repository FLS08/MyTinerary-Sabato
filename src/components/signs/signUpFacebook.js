import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../../redux/action/userAction';
import './styleSign.css'

function FacebookSignUp(props) {

  const responseFacebook = async (res) => {
    console.log(res)
      const fullName = res.name.split(" ")
      console.log(fullName)

      let nam = fullName[0]
      let lNam = fullName[1]
      //console.log(nam)
      //console.log(apellido)

    const userData = {
      name: nam,
      lastName: lNam,
      email: res.email,
      password: res.id,
      urlImage: res.picture.data.url,
      from: "facebook",
      country:"none",
    }
    await props.signUpUser(userData)
  }

  return (
    <FacebookLogin
    cssClass="buttonsocial my-facebook-button-class"
    icon="fa-facebook"
    textButton=" SignUp with Facebook"
      appId="1090459361800003"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}

    />
  );
}
const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,

}

export default connect(null, mapDispatchToProps)(FacebookSignUp);