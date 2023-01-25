import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../../Spinner.png";
import moment from "moment";

import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Assignment() {
  let navigate = useNavigate();
  const token = reactLocalStorage.get("token");
  const [assignment, setAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assignmentId, setAssignmentId] = useState();
  const [open, setOpen] = useState(false);

  let { project_id, id } = useParams();

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/teacher/projects/assignments/show/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setAssignment(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);

  const deleteAssignment = async (id) => {
    await axios
      .delete(`http://localhost:5000/teacher/projects/assignments/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        navigate(
          `/teacher/projects/view/${project_id}/assignments`
        );
      });
  };

  return (
      loading ? (
        <div className="loading">
          <img src={Spinner} className="loader" alt="loader" />
          <h2>Loading</h2>
        </div>
      ) : (
        <>
          <h3 className="mb-3">{assignment.name}</h3>
          <h6 className="mb-4">{assignment.details}</h6>
          <div className="row mb-4 ">
            <div className="col-4">
              <h6 className="text-uppercase text-muted">Submission Date</h6>
            </div>
            <div className="col-8 mt-2">
              {moment(assignment.deadline)
                .utc()
                .format("dddd, MMMM Do YYYY, h:mm a")}
            </div>
            <div className="col-4">
              <h6 className="text-uppercase text-muted">Added on</h6>
            </div>
            <div className="col-8 mt-2">
              {moment(assignment.created_at)
                .utc()
                .format("dddd, MMMM Do YYYY, h:mm a")}
            </div>
            <div className="col-4">
              <h6 className="text-uppercase text-muted mute-heading">
                Total Marks
              </h6>
            </div>
            <div className="col-8 mt-2">{assignment.marks}</div>
          </div>

          <div className="d-flex">
            <Link
              to={`assignment-submissions`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                startIcon={<VisibilityOutlinedIcon />}
                color="primary"
              >
                View Assignment Submittions
              </Button>
            </Link>
            <Link
              to={`/teacher/projects/view/${id}/assignments/edit/${assignment.id}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                style={{ background: "orange" }}
                startIcon={<EditIcon />}
              >
                Edit Assignment
              </Button>
            </Link>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setAssignmentId(assignment.id);
                setOpen(true);
              }}
              style={{ background: "red" }}
            >
              Delete Assignment
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
              {"Are you sure you want to delete this assignment?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                When asignments are deleted they are completely removed, and
                they can not be recovered.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                  deleteAssignment(assignmentId);
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
      )
  );
}

export default Assignment;
