import React from 'react'
import { connect } from 'react-redux';
import userActions from '../../redux/action/userAction'
import { Link } from 'react-router-dom';
import FacebookSignIn from './signInFacebook';


function SignIn(props) {

	const handleSubmit = (event) => {
		event.preventDefault()
		const logedUser = {
			email: event.target[0].value,
			password: event.target[1].value,
			from: "form-Signin"
		}
		console.log(logedUser);
		props.signInUser(logedUser)
	}

	return (

		<div className="contenedorform">

            <FacebookSignIn />

            <form className="px-4 py-3" onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <div className="input-group">
                    <input type="email" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="Email"/>
                  </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                    <input type="password" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="Contraseña"/>
                  </div>
              </div>
              
              <button type="submit" className="crearcuenta btn btn-primary">Sign In..</button>
            </form>
            <div>
              <Link to={'/auth/signup'}> <h1 className="to-sign"> Check SignUp!</h1> </Link>

            </div>
          </div>


	)

}

const mapDispatchToProps = {
	signInUser: userActions.signInUser,

}



export default connect(null, mapDispatchToProps)(SignIn);
