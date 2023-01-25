import React, { useState, useEffect} from "react";
import axios from "axios";
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate  } from "react-router-dom";

function AdminLogin(props) {
  let navigate = useNavigate();
  useEffect(()=>{
  if (reactLocalStorage.get('token')) {
    if (reactLocalStorage.get("user_role") === "student") {
      navigate(`/student`);
    }else if(reactLocalStorage.get("user_role") === "admin"){
      navigate(`/admin`);
    }else if(reactLocalStorage.get("user_role") === "teacher"){
      navigate(`/teacher`);
    } 
  }
},[])

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    axios
      .post("http://localhost:5000/admin/login", formdata)
      .then(function (response) {
        if (response.data.token) {
          reactLocalStorage.set('token', response.data.token);
          reactLocalStorage.set('user_id', response.data.user_id);
          reactLocalStorage.set('user_role', response.data.user_role);
          reactLocalStorage.set('user_avatar', response.data.avatar);
          reactLocalStorage.set('user_name', response.data.name);
          navigate('/admin')
        }
        else if (response.data.error) {
          setError(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-1 col-sm-2 col-md-3"></div>
        <div className="col-10  col-sm-8   col-md-6 align-self-center login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit} >
            <div className="row">
              <div className="form-group col-md-12">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`input form-control ${error ? "is-invalid" : ""}`}
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formdata.email}
                  required
                />
              </div>
              <div className="form-group col-md-12">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`input form-control ${error ? "is-invalid" : ""}`}
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formdata.password}
                  required
                />
                {error && (
                  <div className="invalid-feedback mt-2">{error}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 mt-2">
                <button type="submit" className="input form-control btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
