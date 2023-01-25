import { useState, useEffect } from "react";
import Spinner from "../../Spinner.png";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

function EditProject() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  let { id, discipline, session } = useParams();

  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    details: "",
    discipline: "",
    session: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    details: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/admin/project/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setFormData(response.data.project);
          }
        }
        )
    }

    getUserData();

    let getSessionData = async () => {
      await axios
        .get(`http://localhost:5000/admin/sessions/`, {
          headers: {
            token: token,
          },
        })
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
      // checking post name
      case "name":
        if (value.length < 3) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Project Name length must be atleast 3 characters",
          }));
        } else if (value.length > 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Project Name must not exceed 100 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        }
        break;
      // checking post details
      case "details":
        if (value.length < 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Project Details length must be atleast 100 characters",
          }));
        } else if (value.length > 3000) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Project Details must not exceed 3000 characters",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
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
    if (errors.name == "" && errors.details == "") {
      await axios
        .put("http://localhost:5000/admin/projects/update", formdata, {
          headers: {
            token: token,
          },
        })
        .then(
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
        Edit Project
      </Typography>
      {loading ? (
        <div className="loading">
          <img src={Spinner} className="loader" alt="loader" />
          <h2>Loading</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="row">
            <div className="form-group col-md-12">
              <label for="name">Project Name</label>
              <input
                type="text"
                name="name"
                className={`input form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Project Name"
                onChange={handleChange}
                value={formdata.name}
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group col-md-12">
              <label for="discipline">Discipline</label>
              <select
                id="discipline"
                name="discipline"
                className="form-control input"
                value={formdata.discipline}
                onChange={handleChange}
                required
              >
                <option value="">Select Discipline</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
              </select>
            </div>
            <div className="form-group col-md-12">
              <label for="session">Session</label>
              <select
                id="session"
                name="session"
                className="form-control input"
                value={formdata.session}
                onChange={handleChange}
                required
              >
                <option value="">Select Session</option>
                {sessions.map((session) => (
                  <option value={session.name}>{session.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-12">
              <label for="details">Project Details</label>
              <textarea
                name="details"
                className={`input form-control ${errors.details ? "is-invalid" : ""}`}
                id="details"
                placeholder="Project Details"
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
              <button
                type="submit"
                className="input form-control btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default EditProject;
