import { useState, useEffect } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let illegalUserName = /\W/;
let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let validName = /^[A-Za-z]+$/;
let ValidContact = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
let ValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
let validNumbers = /^\d+$/;

function StudentSignup() {
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
    name: "",
    email: "",
    password: "",
    password1: "",
    firstname: "",
    lastname: "",
    rollnumber: "",
    cgpa: "",
    age: "",
    contact: "",
    discipline: "",
    session: "",
    address: "",
    gender: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
    firstname: "",
    lastname: "",
    rollnumber: "",
    age: "",
    cgpa: "",
    discipline: "",
    session: "",
    contact: "",
    address: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoto = (e) => {
    setFormData({ ...formdata, avatar: e.target.files[0] });
  };
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setLoading(true);
    let getSessionData = async () => {
      await axios
        .get(`http://localhost:5000/sessions`)
        .then((response) => {
          if (response.data) {
            setSessions(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSessionData();
  }, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      // checking user name
      case "name":
        if (value.length < 5) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "User Name length must be atleast 5 characters",
          }));
        } else if (value.length > 18) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "User Name must not exceed 18 characters",
          }));
        } else if (illegalUserName.test(value)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "The username contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking email
      case "email":
        if (!value.match(validEmail)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Email",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking first name
      case "firstname":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "First Name length must be atleast 3 characters",
          }));
        } else if (value.length > 15) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "First Name must not exceed 15 characters",
          }));
        } else if (!value.match(validName)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "The First Name contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking last name
      case "lastname":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Last Name length must be atleast 3 characters",
          }));
        } else if (value.length > 15) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Last Name must not exceed 15 characters",
          }));
        } else if (!value.match(validName)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "The Last Name contains illegal characters.",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // checking password
      case "password":
        if (value.length < 8) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Password length must be atleast 8 characters",
          }));
        } else if (value.length > 32) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Last Name must not exceed 32 characters",
          }));
        } else if (!value.match(ValidPassword)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]:
              "Password must contain at least one lowercase letter, one uppercase letter and one numeric digit",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // checking confirm password
      case "password1":
        if (value.length < 8) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Password length must be atleast 8 characters",
          }));
        } else if (value.length > 32) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Last Name must not exceed 32 characters",
          }));
        } else if (!value.match(ValidPassword)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]:
              "Password must contain at least one lowercase letter, one uppercase letter and one numeric digit",
          }));
        } else if (formdata.password !== value) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Passwords does not match",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // Roll Numbers
      case "rollnumber":
        if (!value.match(validNumbers)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Roll Number",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;

      // checking CGPA
      case "cgpa":
        if (value >= 2 && value <= 4) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid CGPA",
          }));
        }
        break;

      // checking age
      case "age":
        if (value > 3 && value < 70) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Age",
          }));
        }
        break;

      // checking Contact
      case "contact":
        if (!value.match(ValidContact)) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Invalid Contact",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking address
      case "address":
        if (value.length > 5 && value.length < 120) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]:
              "Address length must be atleast 5 characters and must not exceed 120 characters",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.password1 === "" &&
      errors.firstname === "" &&
      errors.lastname === "" &&
      errors.rollnumber === "" &&
      errors.cgpa === "" &&
      errors.age === "" &&
      errors.contact === "" &&
      errors.address === "" &&
      errors.gender === ""
    ) {
      const fd = new FormData();
      fd.append("name", formdata.name);
      fd.append("email", formdata.email);
      fd.append("password", formdata.password);
      fd.append("firstname", formdata.firstname);
      fd.append("lastname", formdata.lastname);
      fd.append("rollnumber", formdata.rollnumber);
      fd.append("cgpa", formdata.cgpa);
      fd.append("age", formdata.age);
      fd.append("contact", formdata.contact);
      fd.append("address", formdata.address);
      fd.append("discipline", formdata.discipline);
      fd.append("session", formdata.session);
      fd.append("gender", formdata.gender);
      fd.append("avatar", formdata.avatar);

      await axios
        .post("http://localhost:5000/student/signup", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          if (response.data.token) {
            reactLocalStorage.set('token', response.data.token);
            reactLocalStorage.set('user_id', response.data.user_id);
            reactLocalStorage.set('user_avatar', response.data.avatar);
            reactLocalStorage.set('user_name', response.data.name);
            reactLocalStorage.set('user_role', response.data.user_role);
            navigate(`/student`);

          }
          else if (response.data.error) {
            setError(response.data.error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" noWrap component="div">
          Student Regestration
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          <div className="form-group col-md-6">
            <label for="name">User Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""
                }`}
              id="name"
              placeholder="User Name"
              onChange={handleChange}
              value={formdata.name}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""
                }`}
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={formdata.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-3">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""
                }`}
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={formdata.password}
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group col-md-3">
            <label for="password1">Confirm Password</label>
            <input
              type="password"
              name="password1"
              className={`form-control ${errors.password1 ? "is-invalid" : ""
                }`}
              id="inputPassword1"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formdata.password1}
              required
            />
            {errors.password1 && (
              <div className="invalid-feedback">{errors.password1}</div>
            )}
          </div>
          <div className="form-group col-md-3">
            <label for="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              className={`form-control ${errors.firstname ? "is-invalid" : ""
                }`}
              id="firstname"
              placeholder="First Name"
              onChange={handleChange}
              value={formdata.firstname}
              required
            />
            {errors.firstname && (
              <div className="invalid-feedback">{errors.firstname}</div>
            )}
          </div>
          <div className="form-group col-md-3">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              className={`form-control ${errors.lastname ? "is-invalid" : ""
                }`}
              id="lastname"
              placeholder="last Name"
              onChange={handleChange}
              value={formdata.lastname}
              required
            />
            {errors.lastname && (
              <div className="invalid-feedback">{errors.lastname}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="form-lgroup col-md-3">
            <label for="rollnumber">Roll Number</label>
            <input
              name="rollnumber"
              className={`form-control ${errors.rollnumber ? "is-invalid" : ""
                }`}
              type="text"
              id="rollnumber"
              placeholder="Roll Number"
              onChange={handleChange}
              value={formdata.rollnumber}
              required
            />
            {errors.rollnumber && (
              <div className="invalid-feedback">{errors.rollnumber}</div>
            )}
          </div>
          <div className="form-group col-md-3">
            <label for="cgpa">CGPA</label>
            <input
              name="cgpa"
              className={`form-control ${errors.cgpa ? "is-invalid" : ""
                }`}
              type="text"
              id="cgpa"
              placeholder="CGPA"
              onChange={handleChange}
              value={formdata.cgpa}
              required
            />
            {errors.cgpa && (
              <div className="invalid-feedback">{errors.cgpa}</div>
            )}
          </div>

          <div className="form-group col-md-3">
            <label for="age">Age</label>
            <input
              name="age"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              type="number"
              id="age"
              placeholder="Age"
              onChange={handleChange}
              value={formdata.age}
              required
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          <div className="form-group col-md-3">
            <label for="contact">Contact Number</label>
            <input
              type="text"
              name="contact"
              className={`form-control ${errors.contact ? "is-invalid" : ""
                }`}
              id="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              value={formdata.contact}
              required
            />
            {errors.contact && (
              <div className="invalid-feedback">{errors.contact}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-3">
            <label for="discipline">Discipline</label>
            <select
              id="discipline"
              name="discipline"
              className={`form-control ${errors.discipline ? "is-invalid" : ""
                }`}
              value={formdata.discipline}
              onChange={handleChange}
              required
            >
              <option value="">Select Discipline</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
            {errors.discipline && (
              <div className="invalid-feedback">{errors.discipline}</div>
            )}
          </div>
          <div className="form-group col-md-3">
            <label for="session">Session</label>
            <select
              id="session"
              name="session"
              className={`form-control ${errors.session ? "is-invalid" : ""
                }`}
              value={formdata.session}
              onChange={handleChange}
              required
            >
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option value={session.name}>{session.name}</option>
              ))}
            </select>
            {errors.session && (
              <div className="invalid-feedback">{errors.session}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label for="address">Address</label>
            <input
              type="text"
              name="address"
              className={`form-control ${errors.address ? "is-invalid" : ""
                }`}
              id="address"
              placeholder="Address"
              onChange={handleChange}
              value={formdata.address}
              required
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6 mt-1">
            <label for="avatar"> Profile Photo </label>
            <br />
            <input
              id="avatar"
              type="file"
              name="avatar"
              className="form-control-file input"
              onChange={handlePhoto}
            />
          </div>
          <div className="form-group col-md-6">
            <p style={{ marginBottom: "2px" }}>Gender</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleChange}
                required
              />
              <label className="form-check-label" for="female" value="female">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          {error && (
            <div className="form-group col-md-12">
              <div class="alert alert-warning" role="alert">
                {error}
              </div>
            </div>
          )}
          <div className="form-group col-md-12 mt-1">
            <button
              type="submit"
              className="form-control btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default StudentSignup;
