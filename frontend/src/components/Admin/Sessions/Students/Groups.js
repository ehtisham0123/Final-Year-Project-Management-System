import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../../Spinner.png";
import axios from "axios";
import { Link, useParams, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";


function Groups() {
  let navigate = useNavigate();
  let { id, discipline, session } = useParams();
  const token = reactLocalStorage.get("token");
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/admin/students/groups/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            if (response.data.students) {
              setStudents(response.data.students);
            }
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);


  const deleteGroup = async (id) => {
    await axios.delete(`http://localhost:5000/admin/groups/${id}`, {
      headers: {
        token: token,
      },
    }).then((response) => { 
       if (response.data.success) {
        navigate(`/admin/sessions/students/${discipline}/${session}/profile/${id}`);
       } 
    });
  };  



   function getFullName(params) {
    return `${params.row.firstname || ""} ${params.row.lastname || ""}`;
  }
  
    const studentsColumns = [
    { field: "rollnumber", headerName: "#", width: 80 },
    {
      field: "image",
      headerName: "Photo",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Avatar src={"/uploads/" + params.row.avatar} />, // renderCell will render the component
    },
    { field: "name", headerName: "User Name", width: 150, hide: true },
    {
      field: "fullname",
      headerName: "Full name",
      width: 160,
      valueGetter: getFullName,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", width: 120, hide: true },
    { field: "gender", headerName: "Gender", width: 120, hide: true },
    { field: "contact", headerName: "Contact", width: 120, hide: true },
    { field: "address", headerName: "Address", width: 200 },
    { field: "cgpa", headerName: "CGPA", width: 100, hide: true },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 270,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (   
            <>
            <Link
              to={`/admin/sessions/students/${params.row.session}/${params.row.discipline}/profile/${params.id}`}
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

            <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setOpen(true)
                }}
                className="mr-1"
                style={{ background: "red" }}
              >
                Delete Group
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
        {loading ? (
          <div className="loading">
            <img src={Spinner} className="loader" alt="loader" />
            <h2>Loading</h2>
          </div>
        ) : (

         <>
          <Box>
            <Typography variant="h4" noWrap component="div" sx={{mb:3}}>
                Group Members
            </Typography>
          </Box>
            <>
              <DataGrid
                style={{ height: 230, width: "100%" }}
                rows={students}
                columns={studentsColumns}
                pageSize={2}
                loading={loading}
                pagination={false}
              />
            </> 
        <Dialog
          open={open}
          onClose={()=>{setOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete group ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               When Group is deleted all data related to Group is completely removed, and it can not be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false);deleteGroup(students[0].id);}}>Yes</Button>
            <Button onClick={()=>{setOpen(false)}}>No</Button>
          </DialogActions>
        </Dialog>
        </>
        )}
    </>
  );
}

export default Groups;