import React from "react";
import { connect } from "react-redux";
import userActions from "../../redux/action/userAction";


function SignUp(props) {
  console.log(props);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      fullName: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      from: "signup",
    };

    props.signUpUser(userData);
    console.log(userData)
  };
  console.log(props.message);

  return (
      
        <div className="contenedorform">
            
            <form className="px-4 py-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="input-group">
                    <span className="gris input-group-text"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg></span>
                    <input type="text" className="form-control" aria-describedby="validationTooltipUsernamePrepend" required placeholder="Nombre de usuario"/>
                  </div>
              </div>
          
              <div className="mb-3">
                <div className="input-group">
                    <span className="gris input-group-text"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg></span>
                    <input type="email" className="form-control" aria-describedby="validationTooltipUsernamePrepend" required placeholder="Email"/>
                  </div>
              </div>

              <div className="mb-3">
                <div className="input-group">
                    <span className="gris input-group-text"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg></span>
                    <input type="password" className="form-control" aria-describedby="validationTooltipUsernamePrepend" required placeholder="Contraseña"/>
                  </div>
              </div>
              
              <button type="submit" className="crearcuenta btn btn-primary">Crear cuenta</button>
            </form>
          </div>
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
