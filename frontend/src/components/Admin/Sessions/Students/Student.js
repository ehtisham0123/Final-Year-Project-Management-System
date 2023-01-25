import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../../Spinner.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Student() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([]);
  let { id , session , discipline } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/admin/students/profile/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setStudent(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);
  return (
      loading ? (
        <div className="loading">
          <img src={Spinner} className="loader" alt="loader" />
          <h2>Loading</h2>
        </div>
      ) : (

       <div className="container">
        <div className="row">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" noWrap component="div">
              Student Profile
            </Typography>
          </Box>
          <div className="col-md-4 mb-3">
              <div className="card -berry edge--bottom">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={`/uploads/${student.avatar}`}
                      alt={student.name}
                      height="235"
                    />
                    <div className="mt-3">
                      <h4 className=" mb-2">{student.name}</h4>
                      <Link
                        to={`/admin/sessions/students/${session}/${discipline}/edit/${student.id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mr: 1 }}
                          style={{ background: "orange" }}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Link>
                    <Link
                        to={`groups`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          View Groups
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-8">
              <div class="card mb-3 -berry edge--bottom">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Name</h6>
                    </div>
                    <div class="col-sm-9 mb-4">
                      {student.firstname} {student.lastname}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 mb-4">{student.email}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9  mb-4">
                      {student.gender}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Age</h6>
                    </div>
                    <div class="col-sm-9  mb-4">
                      {student.age}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Roll Number</h6>
                    </div>
                    <div class="col-sm-9 mb-4">
                      {student.rollnumber}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">CGPA</h6>
                    </div>
                    <div class="col-sm-9  mb-4">
                      {student.cgpa}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Discipline</h6>
                    </div>
                    <div class="col-sm-9  mb-4">
                      {student.discipline}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Session</h6>
                    </div>
                    <div class="col-sm-9 mb-4">
                      {student.session}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9  mb-4">{student.contact}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9  mb-4">{student.address}</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      )
  );
}

export default Student;
