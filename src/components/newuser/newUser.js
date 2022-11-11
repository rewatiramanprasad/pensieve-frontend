import react, { useEffect, useState  } from "react";
import "./newUser.css";
import { useNavigate } from "react-router-dom";

const Newuser = () => {
  const initialValue = { email: "", password: "" };
  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const[error,setError]=useState("");
  const[isError,setIsError]=useState(false);
  const[isSuccess,setIsSuccess]=useState(false);
  let navigator=useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validation(formValue));
    setisSubmit(true);
  };
  const submitHandler = async () => {
    try {
      const response = await fetch("https://pensieve0203.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValue.email,
          password: formValue.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if(data.success){
        setIsSuccess(true);
        setTimeout(function() {
          navigator('/login');
        }, 3000);
        
      }
      else{
      setIsError(true);
      setError(data.message||"something went Wrong");
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
      setError(err.message||"something went Wrong");
    }
  };
  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formError);
      submitHandler();
    } else {
      console.log("else submit");
    }
  });

  const validation = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email) {
      errors.email = "Email is required";
    }else if(!regex.test(values.email)){
        errors.email = "This is not valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (<div> 
    {(isError&&error.length>1)?(<div className=" alert alert-danger" role='alert'>{error}</div>):(
          (isSuccess)?(<div className=" alert alert-danger" role='alert'>sign up successfully</div>):(<></>))}
        
    <form method="post" onSubmit={handleSubmit}>
      <div className="signupmain">
        <div className="signupsub-main">
          <table className="signuptable">
            <tr className="signuptr">
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="signupInput"
                value={formValue.email}
                onChange={handleChange}
              />
              <p>{formError.email}</p>
            </tr>
            <tr className="signuptr">
              <div className="signuppass-wrapper">
                <input
                  name="password"
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  className="signupInput"
                  value={formValue.password}
                  onChange={handleChange}
                />
                {/* <i className="ifont" onClick={togglePasswordVisiblity}>{eye}</i> */}
                <i
                  onClick={togglePasswordVisiblity}
                  
                  class="fa fa-eye signupi"
                />
              </div>
              <p>{formError.password}</p>
            </tr>
            <tr className="signuptr">
              <button className="signupbutton">Sign up</button>
            </tr>
          </table>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Newuser;
