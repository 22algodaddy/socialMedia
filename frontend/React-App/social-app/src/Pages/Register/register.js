import"./register.css"
import {Link,useNavigate} from "react-router-dom"
import {useRef} from "react";
import axios from "axios";


export default function Register(){
  const navigate = useNavigate();
  const username = useRef();
  const email=useRef();
  const password=useRef();{/*useRef returns an object, containing all details of a field*/}
  const passwordAgain = useRef();
  const handleClick= async (e) => {
    e.preventDefault(); {/*To stop re-rendering*/}
    if(passwordAgain.current.value!==password.current.value) {
      password.current.setCustomValidity("Password don't match");
    }
    else{
      const user={
        username: username.current.value,
        password: password.current.value,
        email: email.current.value
      };
      try{
        const res= await axios.post("/auth/registration",user)
        navigate("/login")
      }
      catch(err){
        console.log(err);
      }
    }

  }

  return(
    <section className="vh-100 bg-image"
             style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{borderRadius: "15px"}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form onSubmit={handleClick}>

                    <div className="form-outline mb-4">
                      <input  type="text" id="form3Example1cg" required className="form-control form-control-lg" ref={username}/>
                      <label className="form-label" htmlFor="form3Example1cg">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3cg" required className="form-control form-control-lg" ref={email}/>
                      <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4cg" required className="form-control form-control-lg" ref={password}/>
                      <label className="form-label" htmlFor="form3Example4cg">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4cdg" required className="form-control form-control-lg" ref={passwordAgain}/>
                      <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg"/>
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                              className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                                                                                                className="fw-bold text-body"><u>Login
                      here</u></Link></p>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
