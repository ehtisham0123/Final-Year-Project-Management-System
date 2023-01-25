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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function Teachers() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/admin/project-organizers/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setTeachers(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsersData();
  }, []);

  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:5000/admin/project-organizers/${id}`, {
      headers: {
        token: token,
      },
    }).then((res) => {
      const newTeachers = teachers.filter((teacher) => teacher.id !== id);
      setTeachers(newTeachers);
    });
  };


  function getFullName(params) {
      return `${params.row.teacher.firstname || ''} ${params.row.teacher.lastname || ''}`;
  }

  function getEmail(params) {
    return `${params.row.teacher.email || ''}`;
  }
    const columns = [
    { field: "name", headerName: "Name", width: 150 , valueGetter: getFullName},
    { field: "email", headerName: "Email", width: 250 , valueGetter: getEmail},
    { field: "session", headerName: "Session", width: 150 },
    { field: "discipline", headerName: "Discipline", width: 200 },
    {
      field: "delete",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 260,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setUserId(params.id);
                  setOpen(true);
                }}
                className="mr-1"
                style={{ background: "red" }}
              >
                Remove as PO
              </Button>
        );
      },
    },
  ];

  return (
    <>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h4" noWrap component="div">
            Project Organizers Record
          </Typography>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }} to={`/admin/project-organizers/create`}>
            <Button variant="contained" className="mb-3" startIcon={<AddIcon />}>
              Assign New Project Organizer
            </Button>
          </Link>
        </Box>
        <DataGrid
        style={{ height: 430, width: "100%" }}
        rows={teachers}
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
          onClose={()=>{setOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this user?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
           When users are deleted they are completely removed, and they can not be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false);deleteTeacher(userId);}}>Yes</Button>
            <Button onClick={()=>{setOpen(false)}}>No</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}

export default Teachers;
