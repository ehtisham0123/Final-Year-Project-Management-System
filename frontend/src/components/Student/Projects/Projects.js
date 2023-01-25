import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Projects() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [projects, setProjects] = useState([]);
   const [pageSize, setPageSize] = useState(5);
 
 
  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/student/projects/`, {
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

    };
    getUsersData();
  }, [reloading]);




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
        <Link to={`/student/projects/view/${params.id}/${params.row.session}/${params.row.discipline}`}
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
        );
      },
    },
  ];

  return (
   <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" noWrap component="div">
          Projects Record
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
