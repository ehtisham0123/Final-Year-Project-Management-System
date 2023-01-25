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
        .get(`http://localhost:5000/projects/`, {
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
          .get(`http://localhost:5000/sessions`, {
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
        .get(`http://localhost:5000/projects/search`, {
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


  const columns = [
    { field: "name", headerName: "Project's Name", width: 370 },
    { field: "session", headerName: "Session", width: 200 },
    { field: "discipline", headerName: "Discipline", width: 220 },
    {
      field: "view",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
        <Link to={`/projects/view/${params.id}`}>
          <Button
            variant="contained"
            size="small"
            color="primary"
          >
            View
          </Button>
        </Link>  
        );
      },
    },
  ];









  return (
    <>

       <Box sx={{ display: "flex", justifyContent: "space-between" , mb: 2 }}>
          
        <Typography variant="h4" noWrap component="div">
          Projects Record
        </Typography>
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
      </>
  );
}

export default Projects;
