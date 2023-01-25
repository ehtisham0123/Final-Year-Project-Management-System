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
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Sessions() {
  const token = reactLocalStorage.get("token");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    name: "",
  });
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let getSessionData = async () => {
      setLoading(true);
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
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setSuccess("");
    e.preventDefault();
    await axios
      .post("http://localhost:5000/admin/sessions/create", formdata, {
        headers: {
          token: token,
        },
      })
      .then(
        (response) => {
          if (response.data.success) {
            setFormData({
              name: "",
            });
            setSuccess(response.data.success);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteSession = async (id) => {
    await axios
      .delete(`http://localhost:5000/admin/sessions/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        const newSessions = sessions.filter((session) => session.id !== id);
        setSessions(newSessions);
      });
  };

  return (
    <Box>
      {loading ? (
        <div className="loading">
          <img src={Spinner} className="loader" alt="loader" />
          <h2>Loading</h2>
        </div>
      ) : (
        <div class="sessions">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Paper elevation={24} />
              <Card sx={{ padding: 2, height: 227 }}>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      Create New Session
                    </Typography>
                    <FormControl
                      sx={{ mt: 1, width: "100%" }}
                      variant="outlined"
                    >
                      <TextField
                        label="Session Name"
                        id="name"
                        name="name"
                        size="small"
                        onChange={handleChange}
                        value={formdata.name}
                        required
                      />
                    </FormControl>
                  </CardContent>
                  <CardActions>
                    <FormControl
                      sx={{ ml: 1, width: "96%" }}
                      variant="outlined"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        startIcon={<AddIcon />}
                        startIcon={<AddIcon />}
                      >
                        Add Session
                      </Button>
                    </FormControl>
                  </CardActions>
                </form>
              </Card>
              <Paper />
            </Grid>

            {sessions.map((session) => (
              <>
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
                        Computer Science
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Discipline
                      </Typography>
                      <Typography variant="h5" component="div">
                        {session.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                        to={`/admin/sessions/students/${session.name}/Computer Science`}
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

                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setUserId(session.id);
                          setOpen(true);
                        }}
                        style={{ background: "red" }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                  <Paper />
                </Grid>
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
                        Software Engineering
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Discipline
                      </Typography>
                      <Typography variant="h5" component="div">
                        {session.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        style={{
                          color: "inherit",
                          textDecoration: "inherit",
                        }}
                        to={`/admin/sessions/students/${session.name}/Software Engineering`}
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

                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setUserId(session.id);
                          setOpen(true);
                        }}
                        className="mr-1"
                        sx={{ mr: 1 }}
                        style={{ background: "red" }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                  <Paper />
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Session?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When Session is deleted all students in this session are completely
            removed, and they can not be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteSession(userId);
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
    </Box>
  );
}

export default Sessions;
