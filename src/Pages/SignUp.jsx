import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {db} from '../firebase.config';
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";
function SignUp() {
  //SET ICON SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  //SET EMAIL AND PASSWORD IN ONE OBJECT
  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: "",
  });
  //INSERT INTO THE EMAIL AND PASSWORD VARIABLES
  const {name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
setFormData((prevState)=>({
  ...prevState,
  //CHECK WHAT THE ID IN THE UNPUT THAT CHANGE AND INSERT USER INPUT
  //LIKE THIS YOU CAN MENAGE setText TOGETHER ON MANY TARGETS
  [e.target.id]: e.target.value,
}))

  };
  
  const onSubmit = async (e) => {
    e.preventDefault()
 
    try {
      const auth = getAuth()
 
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
 
      const user = userCredential.user
 
      updateProfile(auth.currentUser, { displayName: name })
 
const formDataCopy = {...formData}
delete formDataCopy.password
formDataCopy.timestamp = serverTimestamp()

await setDoc(doc(db,'users',user.uid),formDataCopy)

      navigate("/")
    } catch (error) {
      toast.error('Bad Cardictionals details,try again')
    }
  }


  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Wellcom Back!</p>
      </header>

      <form onSubmit={onSubmit}>
      <input
          type="text"
          className="nameInput"
          placeholder="Name"
          id="name"
          onChange={onChange}
          value={name}
        />
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
            onClick={()=>setShowPassword((prevState) => 
              !prevState
            )}
          />
        </div>
        <Link to='/forgot-password' className="forgotPasswordLink">Fotgot Password</Link>

        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>
{/* Google Oauth Place */}
<OAuth/>

<Link to='/sign-in' className="registerLink">Sign In Insted</Link>
    </div>
  );
}

export default SignUp;
