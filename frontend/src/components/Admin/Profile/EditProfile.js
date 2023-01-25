import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let illegalUserName = /\W/;
let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let validName = /^[A-Za-z]+$/;
let ValidContact = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
let ValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
let validNumbers = /^\d+$/;

function EditAdminProfile() {
  const token = reactLocalStorage.get("token");
  let { id } = useParams();
  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    contact: "",
    address: "",
    gender: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    email: "",
    firstname: "",
    lastname: "",
    age: "",
    contact: "",
    address: "",
    gender: "",
    avatar: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState('');
  const [oldEmail, setOldEmail] = useState('');

  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/admin/profile/`, {
          headers: {
            token: token,
          }
        })
        .then((response) => {
          if (response.data) {
            setFormData(response.data.result);
            setOldEmail(response.data.result.email);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [success]);

  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
  };

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
            [name]: "Address length must be atleast 5 characters and must not exceed 120 characters",
          }));
        }
        break;

      default:
        break;

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.firstname === "" &&
      errors.lastname === "" &&
      errors.age === "" &&
      errors.contact === "" &&
      errors.address === "" &&
      errors.gender === ""
    ) {

      const fd = new FormData();
      fd.append("id", formdata.id);
      fd.append("name", formdata.name);
      fd.append("email", formdata.email);
      fd.append("password", formdata.password);
      fd.append("firstname", formdata.firstname);
      fd.append("lastname", formdata.lastname);
      fd.append("gender", formdata.gender);
      fd.append("age", formdata.age);
      fd.append("contact", formdata.contact);
      fd.append("address", formdata.address);
      fd.append("avatar", formdata.avatar);
      fd.append('file', file);
      fd.append("oldEmail", oldEmail);

      await axios.put(`http://localhost:5000/admin/update/`, fd, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }).then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
            reactLocalStorage.set('user_avatar', response.data.avatar);
            reactLocalStorage.set('user_name', response.data.name);
            setFormData((prevState) => ({
              ...prevState,
              avatar: response.data.avatar,
            }));
          } else if (response.data.error) {
            setError(response.data.error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
        <>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" noWrap component="div">
        Edit Profile
      </Typography>
    </Box>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          <div className="form-group col-md-6">
            <label for="name">User Name</label>
            <input
              type="text"
              name="name"
              className={`form-control input ${errors.name ? "is-invalid" : ""}`}
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
              className={`form-control input ${errors.email ? "is-invalid" : ""}`}
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
            <label for="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              className={`form-control input ${errors.firstname ? "is-invalid" : ""}`}
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
              className={`form-control input ${errors.lastname ? "is-invalid" : ""}`}
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
          <div className="form-group col-md-3">
            <label for="age">Age</label>
            <input
              name="age"
              className={`form-control input ${errors.age ? "is-invalid" : ""}`}
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
              className={`form-control input ${errors.contact ? "is-invalid" : ""}`}
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
          <div className="form-group col-md-12">
            <label for="address">Address</label>
            <input
              type="text"
              name="address"
              className={`form-control input ${errors.address ? "is-invalid" : ""}`}
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
          <div className="form-group col-md-6 mt-1 ">
            <div className="row d-flex align-items-center">
              <div className="form-group col-md-5">
                <div style={{ width: "100%" }}>
                  <img src={`/uploads/${formdata.avatar}`} alt={formdata.name} style={{ width: "100%" }} />
                </div>
              </div>
              <div className="form-group col-md-7 mt-1">
                <label for="avatar"> Profile Photo </label>
                <br />
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  className="form-control-file  input"
                  onChange={handlePhoto}
                />
              </div>
            </div>
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
                checked={formdata.gender === 'male'}

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
                checked={formdata.gender === 'female'}
              />
              <label className="form-check-label" for="female" value="female">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          {success && (
            <div className="form-group col-md-12">
              <div class="alert alert-primary" role="alert">
                {success}
              </div>
            </div>
          )}
          {error && (
            <div className="form-group col-md-12">
              <div class="alert alert-warning" role="alert">
                {error}
              </div>
            </div>
          )}
          <div className="form-group col-md-12">
            <button type="submit" className="form-control btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
      </>
  );
}

export default EditAdminProfile;
