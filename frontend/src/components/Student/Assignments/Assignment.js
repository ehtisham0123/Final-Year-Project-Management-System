import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";
import AssignmentViewer from "./AssignmentViewer";
import moment from "moment";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatIcon from "@material-ui/icons/Chat";


function Assignment() {
  const token = reactLocalStorage.get("token");
  let { id, session, discipline } = useParams();

  const [assignment, setAssignment] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [teacher, setTeacher] = useState([]);
  const [open, setOpen] = useState(false);

  const [formdata, setFormData] = useState({
    id: "",
    file: "",
  });

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/student/assignments/show/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setAssignment(response.data.result);
            setAssignmentData(response.data.assignmentData);
            let getTeacherData = async () => {
              setLoading(true);
              await axios
                .get(
                  `http://localhost:5000/student/teachers/profile/${response.data.result.teacher_id}`,
                  {
                    headers: {
                      token: token,
                    },
                  }
                )
                .then((response) => {
                  if (response.data) {
                    setTeacher(response.data.result);
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            };
            getTeacherData();
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);

  const handlePhoto = (e) => {
    setFormData({ ...formdata, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const fd = new FormData();
    fd.append("file", formdata.file);
    fd.append("id", id);
    const url = "http://localhost:5000/student/assignments/create";
    axios
      .post(url, fd, {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          setAssignmentData(response.data.result);
          setFormData({
            file: "",
          });
        } else if (response.data.error) {
          setError(response.data.error);
        }
      });
  };

  const deleteAssignment = async (assignmentData) => {
    await axios
      .delete(
        `http://localhost:5000/student/assignments/${assignmentData.id}`,
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setAssignmentData();
        }
      });
  };

  return loading ? (
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
              src={`/uploads/${teacher.avatar}`}
              alt={teacher.name}
              className="img-fluid  mb-2"
              width="100%"
            />
            <h4 className="card-title mb-0">
              {teacher.firstname + " " + teacher.lastname}
            </h4>
            <div className="text-muted mb-2">Teacher</div>
            <div className="d-flex">
              <Link to={`/student/teachers/teacher-profile/${teacher.id}`}>
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
              <Link to={`/student/chat/${teacher.id}`}>
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
              <h3 className="mb-3">{assignment.name}</h3>
              <h6>{assignment.details}</h6>
              <div className="text-sm text-muted p-1 mt-4 mb-3">
                <div className="row ">
                  <div className="col-sm-4">
                    <h6 className="text-uppercase text-muted mute-heading">
                      Session
                    </h6>
                  </div>
                  <div className="col-sm-8">{assignment.session}</div>
                </div>
                <div className="row ">
                  <div className="col-sm-4 ">
                    <h6 className="text-uppercase text-muted mute-heading">
                      Discipline
                    </h6>
                  </div>
                  <div className="col-sm-8">{assignment.discipline}</div>
                </div>

                {assignmentData && assignmentData.obtained_marks ? (
                  <div className="row ">
                    <div className="col-sm-4">
                      <h6 className="text-uppercase text-muted mute-heading">
                        Your Marks
                      </h6>
                    </div>
                    <div className="col-sm-8">
                      {assignmentData.obtained_marks} / {assignment.marks}
                    </div>
                  </div>
                ) : (
                  <div className="row ">
                    <div className="col-sm-4">
                      <h6 className="text-uppercase text-muted mute-heading">
                        Total Marks
                      </h6>
                    </div>
                    <div className="col-sm-8">{assignment.marks}</div>
                  </div>
                )}
 
                <div className="row ">
                  <div className="col-sm-4">
                    <h6 className="text-uppercase text-muted">
                      Deadline
                    </h6>
                  </div>
                  <div className="col-sm-8">{moment(assignment.deadline)
                      .utc()
                      .format("dddd, MMMM Do YYYY, h:mm a")}</div>
                </div>
              </div>

              {assignmentData ? (
                <>
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
                        View Your Assignment
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => setOpen(true)}
                      style={{ background: "red" }}
                    >
                      Delete Your Assignment
                    </Button>
                  </div>
                  <Dialog
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to delete your assignment?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        When assignments are deleted they are completely removed, and can not
                        be recovered.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          setOpen(false);
                          deleteAssignment(assignmentData)
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="needs-validation p-3 ">
                  <div className="col-md-12">
                    <div className="person-name d-flex">
                      <i className="fa fa-user  mr-3 mt-2"></i>
                      <h3>Your Work</h3>
                    </div>
                    <div className="card bg-transparent py-3 px-2 prof-name mt-4">
                      <div className="d-flex justify-content-between">
                        <h6 className="text-info ml-3">
                          Insert you Assignment file hare
                        </h6>
                        <p className="text-danger mr-3">Missing</p>
                      </div>
                      <div className="form-group py-1 col-md-12">
                        <input
                          id="file"
                          type="file"
                          name="file"
                          className="form-control-file input"
                          onChange={handlePhoto}
                        />
                      </div>
                      <div className="form-group py-1 col-md-12 mb-3">
                        <button
                          type="submit"
                          className="input form-control btn btn-sm btn-outline-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignment;