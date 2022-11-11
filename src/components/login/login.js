import  { useState,useEffect } from "react";
import { Link, renderMatches } from "react-router-dom";
import "./login.css";
import { useNavigate }  from "react-router-dom";
const Login = () => {
  const initialValue={email:"",password:""};
  const [formValue,setFormValue]=useState(initialValue)
  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [isSuccess, setIsSuccess]=useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const[isError,setIsError]=useState(false);
  const[error,setError]=useState("");
  let navigator=useNavigate();
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };
  const handleSubmit = (e) => {
    // setIsInput(true);
    e.preventDefault();
    setFormError(validation(formValue));
    setisSubmit(true);
  };
  const submitHandler = async () => {
    
    try {
      const response = await fetch("https://pensieve0203.herokuapp.com/login", {
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
        console.log('login');
        setTimeout(function() {
          navigator('/gps/summary');
        }, 3000);
      }
      else if(!data.success){
      setIsError(true);
      setError(data.message||"something went wrong")
      setTimeout(function() {
        setIsError(false);
        navigator('/');
        setFormValue(initialValue);
      
      }, 3000);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setError(err.message||"something went wrong");
      setTimeout(function() {
        setIsError(false);
        setFormValue(initialValue);
        navigator('/');
      }, 3000);

    }
  };
  useEffect(() => {
    console.log('i fire once');
    console.log(formError);
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formError);
      submitHandler();
     }
    //  else {
    //   console.log("else submit");
    // }
  },[formError]);

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
          (Object.keys(formError).length===0&& isSuccess)?(<div className=" alert alert-success" role='alert'>Login In successful</div>):(<></>))}
        
    <form onSubmit={handleSubmit}>
      <div className="main">
        
        {/* <pre>{JSON.stringify(formValue,undefined,2)}</pre> */}
        <div className=" container sub-main ">
          <table>
            <tr className="tr">
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formValue.email}
                className="loginInput"
              />
              <p>{formError.email}</p>
            </tr>
            <tr className="tr">
              <div className="pass-wrapper">
                <input
                  type={passwordShown ? "text" : "password"}
                 // ref={register('password',{ required: "Password is required" })}
                 //ref={register('password',{required:""})}
                 onChange={handleChange}
                  name="password"
                  placeholder="Password"
                  value={formValue.password}
                  className="loginInput"
                />
                {/* <i className="ifont" onClick={togglePasswordVisiblity}>{eye}</i> */}
                <i
                  onClick={togglePasswordVisiblity}
                  
                  class="fa fa-eye logini"
                />
              </div>
              <p>{formError.password}</p>
            </tr>
            <tr className="tr">
              <button className="button">Log in</button>
            </tr>
            <tr className="tr">
              <Link className="textLink" to="/newuser">New User?</Link>
            </tr>
          </table>
        </div>
        
      </div>
    </form>
    </div>
  );
};

export default Login;
