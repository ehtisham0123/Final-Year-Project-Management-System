import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

function EditPost() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [formdata, setFormData] = useState({
    name: "",
    details: "",
    discipline: "",
    session: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    details: "",
  });
  const [success, setSuccess] = useState("");
  let { id } = useParams();

  useEffect(() => {
    let getPostData = async () => {
      await axios
        .get(`http://localhost:5000/admin/post/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setFormData(response.data.post);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getPostData();

    let getSessionData = async () => {
      await axios
        .get(`http://localhost:5000/admin/sessions`, {
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
            [name]: "Post Name length must be atleast 3 characters",
          }));
        } else if (value.length > 100) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Post Name must not exceed 100 characters",
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
        if (value.length < 8) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Post Details length must be atleast 8 characters",
          }));
        } else if (value.length > 1000) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Post Details must not exceed 1000 characters",
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
    e.preventDefault();
    if (errors.name == "" && errors.details == "") {
      await axios.put(`http://localhost:5000/admin/posts/update`, formdata, {
        headers: {
          token: token,
        },
      }).then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div id="content" className="">
      <div className="">
        <h3>Edit Post</h3>
      </div>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="row">
          <div className="form-group col-md-12">
            <label for="name">Post Name</label>
            <input
              type="text"
              name="name"
              className={`input form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Post Name"
              onChange={handleChange}
              value={formdata.name}
              required
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group col-md-12">
            <label for="discipline">Student's Discipline</label>
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
            <label for="session">Student's Session</label>
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
          <div className="form-group col-md-12">
            {success && (
              <div class="alert alert-primary" role="alert">
                {success}
              </div>
            )}
          </div>
          <div className="form-group col-md-12">
            <button type="submit" className="input form-control btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
