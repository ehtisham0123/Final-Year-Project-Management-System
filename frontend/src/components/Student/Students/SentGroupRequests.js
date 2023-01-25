import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link } from "react-router-dom";

  import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
  import Button from "@mui/material/Button";
  import Avatar from "@mui/material/Avatar";
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
  import Dialog from "@mui/material/Dialog";
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
  import DialogContentText from "@mui/material/DialogContentText";
  import DialogTitle from "@mui/material/DialogTitle";
  import DeleteIcon from "@material-ui/icons/Delete";


function SentGroupRequests() {
  const token = reactLocalStorage.get("token");
  const user_id = reactLocalStorage.get("user_id");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/student/students/group-requests/sent`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setStudents(response.data.result.filter((student) => student.id !== user_id));
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsersData();
  }, []);


  const deleteRequest = async (id) => {
    await axios.delete(`http://localhost:5000/student/students/group-requests/sent/${id}`, {
      headers: {
        token: token,
      },
    }).then((res) => {
      const newStudents = students.filter((student) => student.id !== id);
      setStudents(newStudents);
    });
  }; 


    function getFullName(params) {
      return `${params.row.firstname || ''} ${params.row.lastname || ''}`;
    }

      const columns = [
    { field: "rollnumber", headerName: "#", width: 80 },
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Avatar src={"/uploads/" + params.row.avatar} />, // renderCell will render the component
    },
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
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 200,
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
                Delete
              </Button>

        );
      },
    },
  ];


  return (
    <>
        <Box sx={{ mb: 2 }}>  
          <Typography variant="h4" noWrap component="div">
            Sent Requests Record
          </Typography>
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
          onClose={()=>{setOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this request?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
           When requests are deleted they are completely removed, and they can not be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false);deleteRequest(userId);}}>Yes</Button>
            <Button onClick={()=>{setOpen(false)}}>No</Button>
          </DialogActions>
        </Dialog>

      
    </>
  );
}

export default SentGroupRequests;
