import React from 'react'
import { connect } from 'react-redux';
import userActions from '../../redux/action/userAction'
import { Link } from 'react-router-dom';

function SignIn(props) {

	const handleSubmit = (event) => {
		event.preventDefault()
		const logedUser = {
			email: event.target[0].value,
			password: event.target[1].value,
			from: "form-Signin"
		}
		props.signInUser(logedUser)
	}

	return (

		<form onSubmit={handleSubmit}>
			
			<Link to="/signup">SignUp</Link> 

		</form>


	)

}

const mapDispatchToProps = {
	signInUser: userActions.signInUser,

}



export default connect(null, mapDispatchToProps)(SignIn);
