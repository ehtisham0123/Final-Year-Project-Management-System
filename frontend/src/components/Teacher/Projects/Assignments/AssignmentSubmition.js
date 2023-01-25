import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../../Spinner.png";
import ChatIcon from "@material-ui/icons/Chat";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import moment from "moment";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

function AssignmentSubmition() {
  const token = reactLocalStorage.get("token");
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assignmentData, setAssignmentData] = useState([]);
  const [student, setStudent] = useState([]);
  const [success, setSuccess] = useState("");

  const [formdata, setFormData] = useState({
    id: "",
    obtained_marks: "",
  });
  const [errors, setErrors] = useState({
    obtained_marks: "",
  });

  let { id, session, discipline, student_id } = useParams();

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/teacher/projects/assignments/view-Students-assignnmet/${id}/${student_id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setAssignmentData(response.data.assignmentData)
            setAssignment(response.data.result);
            setFormData((prevState) => ({
              ...prevState,
              id: response.data.assignmentData.id,
              obtained_marks: response.data.assignmentData.obtained_marks,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      let getStudentData = async () => {

        await axios
          .get(
            `http://localhost:5000/teacher/students/profile/${student_id}`,
            {
              headers: {
                token: token,
              },
            }
          )
          .then((response) => {
            if (response.data) {
              setStudent(response.data.result);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getStudentData();
    };
    getUserData();
    setLoading(false);

  }, []);


  const handleChange = (e) => {
    setSuccess('');
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    switch (name) {
      case "obtained_marks":
        if (value <= assignment.marks) {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "",
          }));
        } else {
          setErrors((prevState) => ({
            ...prevState,
            [name]: "Obtained Marks must be less then total marks"
          }));
        }
        break;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    if (errors.obtained_marks == "") {
      await axios
        .put(`http://localhost:5000/teacher/projects/assignments/view-Students-assignnmet/assign-marks`, formdata, {
          headers: {
            token: token,
          },
        })
        .then(
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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <div className="loading">
                <img src={Spinner} className="loader" alt="loader" />
                <h2>Loading</h2>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-3">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title mb-0 text-center">Profile</h5>
                    </div>
                    <div className="card-body text-center">
                      <img
                        src={`/uploads/${student.avatar}`}
                        alt={student.name}
                        className="img-fluid  mb-2"
                        width="100%"
                      />
                      <h4 className="card-title mb-0">
                        {student.firstname + " " + student.lastname}
                      </h4>
                      <div className="text-muted mb-2">Student</div>
                      <div className="d-flex">
                        <Link
                          to={`/teacher/sessions/students/${session}/${discipline}/student-profile/${student.id}`}
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            size="small"
                            startIcon={<VisibilityOutlinedIcon />}
                            color="primary"
                          >
                            View
                          </Button>
                        </Link>
                        <Link
                          to={`/teacher/chat/${student.id}`}
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1 }}
                            style={{ background: "green" }}
                            startIcon={<ChatIcon />}
                          >
                            Massage
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <hr className="my-0" />
                  </div>
                </div>
                <div className="card col-md-9">
                  <div className="card-body h-100">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="mb-3">
                          <i className="fa fa-tasks"></i> {assignment.name}
                        </h3>
                        <h6>
                          {assignment.details}
                          <i
                            className="fa fa-question-circle"
                            aria-hidden="true"
                          ></i>
                        </h6>
                        <div className="text-sm text-muted p-1 mt-4 mb-3">                                     
                          <div className="row">
                            <div className="col-sm-4">
                              <h6 className="text-uppercase text-muted mute-heading">
                                Total Marks
                              </h6>
                            </div>
                            <div className="col-sm-8 mt-2">
                              {assignment.marks}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <h6 className="text-uppercase text-muted mute-heading">
                                Obtained Marks
                              </h6>
                            </div>
                            <div className="col-sm-8 mt-2 d-flex">
                              <form onSubmit={handleSubmit} className="">
                                <input
                                  name="obtained_marks"
                                  style={{
                                    padding: "10px",
                                    height: "30px",
                                    border: "1px solid black",
                                    marginTop: "-4px",
                                    textDecoration: "inherit",
                                  }}
                                  type="number"
                                  onChange={handleChange}
                                  value={formdata.obtained_marks}
                                  id="obtained_marks"
                                  placeholder="Obtained Marks"
                                  className={`is-invalid`}
                                  required
                                />
                                {errors.obtained_marks && (
                                  <div className="text-danger text-sm mx-1 mb-2">
                                    {errors.obtained_marks}
                                  </div>
                                )}
                                {success && (
                                  <div className="text-primary my-1 mb-2">
                                    {success}
                                  </div>
                                )}
                                <button
                                  type="submit hidden"
                                  className="d-123 input form-control btn btn-primary"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4">
                              <h6 className="text-uppercase text-muted">
                                Submission Date
                              </h6>
                            </div>
                            <div className="col-sm-8 mt-2">
                               {moment(assignmentData.created_at)
                      .utc()
                      .format("dddd, MMMM Do YYYY, h:mm a")}     
                            </div>
                            {assignmentData && (
                              <div className=" d-flex">
                                <Link
                                  to={`${assignmentData.file}/${assignmentData.file_type}`}
                                  style={{
                                    color: "inherit",
                                    textDecoration: "inherit",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    sx={{ mr: 1 }}
                                    startIcon={<VisibilityOutlinedIcon />}
                                    color="primary"
                                  >
                                    View Student's Assignment
                                  </Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmition;
