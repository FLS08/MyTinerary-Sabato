import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import userActions from "../../redux/action/userAction";
import FacebookSignUp from "./signUpFacebook";


function SignUp(props) {

  const countries = ["United States","Canada","England","Australia","New Zeland","Argentina","South Africa","Brazil","Saudi Arabia"]

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: event.target[0].value,
      lastName: event.target[1].value,
      urlImage: event.target[2].value,
      country: event.target[3].value,
      email: event.target[4].value,
      password: event.target[5].value,
      from: "signup",
    };

    props.signUpUser(userData);
    console.log(userData)
  };
  console.log(props);

  return (
      <>
        <div className="contenedorform">

            <FacebookSignUp />
            
            <form className="px-4 py-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="input-group">
                    <input type="text" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="Name"/>
                  </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                    <input type="text" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="Lastname"/>
                  </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                    <input type="text" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="URL profile image"/>
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group">
                    <select name="country" id="selectCountry" className="inputForm" aria-describedby="validationTooltipUsernamePrepend" required placeholder="Country">
                      {countries.map((country,key)=>(<option value={country} key={key}> {country} </option>))}
                    </select>
                  </div>
              </div>
          
              <div className="mb-3">
                <div className="input-group">
                    <input type="email" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="Email"/>
                  </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                    <input type="password" className="inputForm " aria-describedby="validationTooltipUsernamePrepend" required placeholder="Password"/>
                  </div>
              </div>
              
              <button type="submit" className="crearcuenta btn btn-primary">Create account</button>
            </form>
            <h5>If you have an account..</h5>
            <div>
              <Link to={'/auth/signin'}> <h1 className="to-sign"> Check SignIn!</h1> </Link>

            </div>
          </div>
          
          </>     
  )
      
 
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
