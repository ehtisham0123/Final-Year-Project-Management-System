import { useState, useEffect } from "react";
import Spinner from '../../Spinner.png';
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import Typography from "@mui/material/Typography";


function CreateProjectOrganizer() {
  const token = reactLocalStorage.get("token");
  const [teachers, setTeachers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formdata, setFormData] = useState({
    discipline: "",
    session: "",
    teacher: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/admin/teachers/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setTeachers(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });

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
    };
    getUsersData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    await axios
      .post("http://localhost:5000/admin/project-organizers/create", formdata, {
        headers: {
          token: token,
        },
      })
      .then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
            setFormData({
              session: "",
              discipline: "",
              teacher: "",
            });
          }
          else if (response.data.error) {
            setError(response.data.error);
          }
        },
        (error) => {
          console.log(error);
        }
      );

  };

  return (
    <>
    <Typography variant="h4" noWrap component="div" sx={{mb:2}}>
        Assign New Project Organizer
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
                <option value="Software Engineering">Software Engineering</option>
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
          </div>

          <div className="row mb-4">
            <div className="form-group col-md-12">
              <label for="teacher">Teacher</label>
              <select
                id="teacher"
                name="teacher"
                className="form-control input"
                value={formdata.teacher}
                onChange={handleChange}
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option className="py-5" value={teacher.id}> Name : {teacher.firstname} {teacher.lastname} ____________  Email : {teacher.email}</option>
                ))}
              </select>
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
      )}
    </>
  );
}

export default CreateProjectOrganizer;
