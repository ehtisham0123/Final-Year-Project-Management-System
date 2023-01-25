import { useState, useEffect } from "react";
import Spinner from "../../Spinner.png";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";

function CreateGroupRequest() {
  const token = reactLocalStorage.get("token");
  const user_id = reactLocalStorage.get("user_id");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formdata, setFormData] = useState({
    student: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/student/students/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setStudents(
              response.data.result.filter((student) => student.id !== user_id)
            );
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
      .post("http://localhost:5000/student/students/group-requests/new", formdata, {
        headers: {
          token: token,
        },
      })
      .then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
            setFormData({
              student: "",
            });
          } else if (response.data.error) {
            setError(response.data.error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div id="content" className="mx-5">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4" noWrap component="div">
            Send New Group Request
          </Typography>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }} to={`/student/students/requests/sent`}>
            <Button variant="contained" className="mb-3" startIcon={<AddIcon />}>
              View Sent Requests
            </Button>
          </Link>
        </Box>
      {loading ? (
        <div className="loading">
          <img src={Spinner} className="loader" alt="loader" />
          <h2>Loading</h2>
        </div>
      ) : (
        <div className="my-5">
          <div className="row ">
            <div className="col-md-2"></div>
            <div className="col-md-8 border p-5 my-5">
              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row mb-2">
                  <div className="form-group col-md-12">
                    <label for="student">Select Class Mates</label>
                    <select
                      id="student"
                      name="student"
                      className="form-control input"
                      value={formdata.student}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Student</option>
                      {students.map((student) => (
                        <option className="py-5" value={student.id}>
                          {" "}
                          Name : {student.firstname} {student.lastname}{" "}
                          ____________ Email : {student.email}
                        </option>
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
                    <button
                      type="submit"
                      className="input form-control btn btn-primary"
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGroupRequest;
