import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Projects() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/teacher/projects/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setProjects(response.data.result);
            console.log(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });


    };
    getUsersData();
  }, []);

  function getName(params) {
    return `${params.row.project.name || ''}`;
  }
  function getSession(params) {
    return `${params.row.project.session || ''}`;
  }
  function getDiscipline(params) {
    return `${params.row.project.discipline || ''}`;
  }
  function getDate(params) {
    return `${moment(params.created_at).utc().format("dddd, MMMM Do YYYY, h:mm a") || ''}`;
  }



  const columns = [

    { field: "name", headerName: "Project Name", width: 250, valueGetter: getName },
    { field: "session", headerName: "Session", width: 100, valueGetter: getSession },
    { field: "discipline", headerName: "Discipline", width: 200, valueGetter: getDiscipline },
    { field: "created_at", headerName: "Alloted On", width: 280, valueGetter: getDate },
    {
      field: "view",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/teacher/projects/view/${params.row.project.id}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
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
          </>
        );
      },
    },
  ];


  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" noWrap component="div">
          Alloted Projects
        </Typography>
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
