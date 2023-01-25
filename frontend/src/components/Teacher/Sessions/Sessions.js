import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";

import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


function Sessions() {
  const token = reactLocalStorage.get("token");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:5000/teacher/students/sessions`, {
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
    getUserData();
  }, []);


  return (

     
      loading ? (
        <Box className="loading">
          <img src={Spinner} className="loader" alt="loader" />
          <h2>Loading</h2>
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2}>
          {sessions[0] ? (
              sessions.map((session) => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <Paper elevation={24} />
                  <Card sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Session
                      </Typography>
                      <Typography variant="h5" component="div">
                        {session.session}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Discipline
                      </Typography>
                      <Typography variant="h5" component="div">
                        {session.discipline}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                        to={`/teacher/sessions/students/${session.session}/${session.discipline}`}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<VisibilityOutlinedIcon />}
                          sx={{ mr: 1 }}
                        >
                          View
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                  <Paper />
                </Grid>         
            ))
            ):(
               <Box>
                  <Paper elevation={24} />
                  <Card sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        No Students Alloted Yet
                      </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card>
                  <Paper />
              </Box>    
            )
          }
          </Grid>
        </Box>
      )
   
  );
}

export default Sessions;
