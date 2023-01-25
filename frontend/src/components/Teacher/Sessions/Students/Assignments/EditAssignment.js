import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Typography from "@mui/material/Typography";

function EditAssignment() {
  const token = reactLocalStorage.get("token");
  const [formdata, setFormData] = useState({
    name: "",
    details: "",
    marks: "",
    deadline: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    details: "",
    marks: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  let { id } = useParams();

  useEffect(() => {
    let getAssignmentData = async () => {
      await axios
        .get(`http://localhost:5000/teacher/assignments/show/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setFormData(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAssignmentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      // checking assignment name
      case "name":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Assignment Name length must be atleast 3 characters",
          }));
        } else if (value.length > 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Assignment Name must not exceed 100 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking assignment details
      case "details":
        if (value.length < 8) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Assignment Details length must be atleast 8 characters",
          }));
        } else if (value.length > 1000) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Assignment Details must not exceed 1000 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking age
      case "marks":
        if (value => 5 && value <= 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Marks must enterd between 5 and 100",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    if (errors.name == "" && errors.details == "" && errors.marks == "") {
      await axios.put(`http://localhost:5000/teacher/assignments/update`, formdata, {
        headers: {
          token: token,
        },
      }).then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
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
      <Typography variant="h4" noWrap component="div" sx={{mb:2}}>
        Edit Assignment
      </Typography>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          <div className="form-group col-md-12">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              className={`input form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Name"
              onChange={handleChange}
              value={formdata.name}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group col-md-12">
            <label for="marks">Marks</label>
            <input
              name="marks"
              className={`form-control input ${errors.marks ? "is-invalid" : ""}`}
              type="number"
              id="marks"
              placeholder="Marks"
              onChange={handleChange}
              value={formdata.marks}
              required
            />
            {errors.marks && <div className="invalid-feedback">{errors.marks}</div>}
          </div>
          <div className="form-group col-md-12">
            <label for="marks">Deadline</label>
            <input
              name="deadline"
              className={`form-control input ${errors.deadline ? "is-invalid" : ""}`}
              type="datetime-local"
              id="deadline"
              placeholder="Deadline"
              onChange={handleChange}
              value={formdata.deadline}
              required
            />
            {errors.deadline && <div className="invalid-feedback">{errors.deadline}</div>}
          </div>
          <div className="form-group col-md-12">
            <label for="details">Details</label>
            <textarea
              name="details"
              className={`input form-control ${errors.details ? "is-invalid" : ""}`}
              id="details"
              placeholder="Details"
              onChange={handleChange}
              value={formdata.details}
              rows="5"
            ></textarea>
            {errors.details && (
              <div className="invalid-feedback">{errors.details}</div>
            )}
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
            <button type="submit" className="input form-control btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditAssignment;
