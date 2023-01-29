import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";
function SignIn() {
  //SET ICON SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  //SET EMAIL AND PASSWORD IN ONE OBJECT
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //INSERT INTO THE EMAIL AND PASSWORD VARIABLES
  const { email, password } = formData;
  const navigae = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      //CHECK WHAT THE ID IN THE UNPUT THAT CHANGE AND INSERT USER INPUT
      //LIKE THIS YOU CAN MENAGE setText TOGETHER ON MANY
      [e.target.id]: e.target.value,
    }));
  };
  //When SubmitForm SignIn
  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigae("/");
        toast.success('Sign in Complete')
      }
    } catch (eror) {
      toast.error('Bad User Cradintial, try again');
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Wellcom Back!</p>
      </header>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          onChange={onChange}
          value={email}
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt="show password"
            className="showPassword"
            //WHEN CLICK THE FUNCTION CHANGE FROM TRUE TO FALSE DEPENDS ON PREVIOUS STATE
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Fotgot Password
        </Link>

        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>
      {/* Google Oauth Place */}
<OAuth/>
      <Link to="/sign-up" className="registerLink">
        Sign Up Insted
      </Link>
    </div>
  );
}

export default SignIn;
