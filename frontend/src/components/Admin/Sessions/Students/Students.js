import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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


function Students() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  let { session, discipline } = useParams();

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/admin/students/`, {
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
            console.log(response.data.result)
            setStudents(response.data.result);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsersData();
  }, []);

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/admin/students/${id}`, {
      headers: {
        token: token,
      },
    }).then((res) => {
      const newstudents = students.filter((student) => student.id !== id);
      setStudents(newstudents);
    });
  };


  function getFullName(params) {
      return `${params.row.firstname || ''} ${params.row.lastname || ''}`;
  }

    const columns = [
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Avatar src={"/uploads/" + params.row.avatar} />, // renderCell will render the component
    },
    { field: "rollnumber", headerName: "#", width: 80 },
    { field: "name", headerName: "User Name", width: 150 ,hide: true},
    {
      field: 'fullname',
      headerName: 'Full name',
      width: 160,
      valueGetter: getFullName,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", width: 120, hide: true },
    { field: "gender", headerName: "Gender", width: 120, hide: true },
    { field: "contact", headerName: "Contact", width: 120, hide: true },
    { field: "address", headerName: "Address", width: 220 },
    { field: "cgpa", headerName: "CGPA", width: 100 ,hide: true},
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 280,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/admin/sessions/students/${session}/${discipline}/profile/${params.id}`}
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
            <Link
              to={`/admin/sessions/students/${session}/${discipline}/edit/${params.id}`}
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" noWrap component="div">
          Students Record
        </Typography>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/admin/sessions/students/${session}/${discipline}/create`}
        >
          <Button variant="contained" className="mb-3" startIcon={<AddIcon />}>
            Add New Student
          </Button>
        </Link>
      </Box>
      <DataGrid
        style={{ height: 430, width: "100%" }}
        rows={students}
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
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When users are deleted they are completely removed, and they can not
            be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteStudent(userId);
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

export default Students;
