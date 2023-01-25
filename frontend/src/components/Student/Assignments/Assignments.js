import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";
import moment from "moment";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Assignments() {
  const token = reactLocalStorage.get("token");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  let { session, discipline } = useParams();

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/student/assignments`, {
          headers: {
            token: token,
          },
          params: {
            session: session,
            discipline: discipline,
          },
        })
        .then((response) => {
          if (response.data.result) {
            setAssignments(response.data.result);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);


  return (
      <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" noWrap component="div">
          Assignments By Project Organizer
        </Typography>
      </Box>
      <Box>
        {loading ? (
          <Box className="loading">
            <img src={Spinner} className="loader" alt="loader" />
            <h2>Loading</h2>
          </Box>
        ) : assignments[0] ? (
          assignments.map((assignment) => (
            <Box className="border mb-2">
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                className="d-flex justify-content-between p-4"
                to={`view/${assignment.id}`}
              >
                <Typography>{assignment.name}</Typography>
                <Typography className="text-danger d-flex font-weight-bold">
                  {" "}
                  Due:
                  <Typography className="ml-2">
                    {moment(assignment.deadline)
                      .utc()
                      .format("dddd, MMMM Do YYYY, h:mm a")}
                  </Typography>
                </Typography>
              </Link>
            </Box>
          ))
        ) : (
          <Box className="border p-4">
            <Typography>No assignments allotted yet</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Assignments;
