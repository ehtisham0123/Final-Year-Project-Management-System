import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Teacher() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/admin/teachers/profile/${id}`, {
          headers: {
            token: token,
          },
        })
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
                Teacher Profile
              </Typography>
             </Box>  
            <div className="col-md-4 mb-3">
              <div className="card -berry edge--bottom">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={`/uploads/${teacher.avatar}`}
                      alt={teacher.name}
                      className=""
                      height="235"
                    />
                    <div className="mt-3">
                      <h4 className=" mb-3">{teacher.name}</h4>
                      <Link
                        to={`../teachers/edit/${teacher.id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mr: 1 }}
                          style={{ background: "orange" }}
                          startIcon={<EditIcon />}
                        >
                          Edit Profile
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
                      <h6 class="mb-0">ID</h6>
                    </div>
                    <div class="col-sm-9 mb-4">{teacher.id}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Name</h6>
                    </div>
                    <div class="col-sm-9 mb-4">
                      {teacher.firstname} {teacher.lastname}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 mb-4">{teacher.email}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Gender</h6>
                    </div>
                    <div class="col-sm-9  mb-4">{teacher.gender}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Age</h6>
                    </div>
                    <div class="col-sm-9  mb-4">{teacher.age}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9  mb-4">{teacher.contact}</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Address</h6>
                    </div>
                    <div class="col-sm-9  mb-4">{teacher.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  );
}

export default Teacher;
