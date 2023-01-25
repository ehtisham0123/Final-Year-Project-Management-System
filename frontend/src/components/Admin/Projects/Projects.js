import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


function Projects() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [sessions, setSessions] = useState([]);  
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/admin/projects/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setProjects(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });

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
              console.log(response.data.result)
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
  }, [reloading]);

  const setNewProjects = async (e) => {
    if (e.target.value == "All") {
      setReloading(!reloading);
    } else {
      let data = e.target.value.split("|");
      let session = data[0];
      let discipline = data[1];
      setLoading(true);
      await axios
        .get(`http://localhost:5000/admin/projects/search`, {
          headers: {
            token: token,
          },
          params: {
            session: session,
            discipline: discipline,
          },
        })
        .then((response) => {
          if (response.data) {
            setProjects(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  
  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:5000/admin/projects/${id}`, {
      headers: {
        token: token,
      },
    }).then((res) => {
      const newProjects = projects.filter((project) => project.id !== id);
      setProjects(newProjects);
    });
  };



   const columns = [
    { field: "name", headerName: "Project's Name", width: 300 },
    { field: "session", headerName: "Session", width: 200 },
    { field: "discipline", headerName: "Discipline", width: 220 },
    {
      field: "view",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 290, 
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
        <Link to={`/admin/projects/view/${params.id}/${params.row.session}/${params.row.discipline}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<VisibilityOutlinedIcon />}  
            sx={{ mr: 1 }}
          >
            View
          </Button>
        </Link> 
        <Link to={`/admin/projects/edit/${params.id}/${params.row.session}/${params.row.discipline}`}
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
         <Button
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setUserId(params.id);
                setOpen(true);
              }}
              style={{ background: "red" }}
            >
              Delete
            </Button>
          </>

        );
      },
    },
  ];




  return (
    <>
        <Box sx={{ display: "flex", justifyContent: "space-between" , mb: 1 }}>
            <label>
              <select
                class="form-control"
                onChange={setNewProjects}
              >
                <option value="All">ALL</option>
                {sessions.map((session) => (
                  <>
                    <option value={`${session.name}|Computer Science`}>Computer Science {session.name}</option>
                    <option value={`${session.name}|Software Engineering`}>Software Engineering {session.name}</option>
                  </>
                ))}
              </select>
            </label> 
            <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/admin/projects/create`}
        >
          <Button variant="contained" startIcon={<AddIcon />}>
            Add New Project
          </Button>
        </Link>
      </Box> 
        <DataGrid
        style={{ height: 430, width: "100%" }}
        rows={projects}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        loading={loading}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When projects are deleted they are completely removed, and they can not
            be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteProject(userId);
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
  );
}

export default Projects;
