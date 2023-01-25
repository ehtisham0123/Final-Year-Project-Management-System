import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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

function Project() {
  let { id, discipline, session } = useParams();
  const token = reactLocalStorage.get("token");
  const [project, setProject] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [students, setStudents] = useState();
  const [project_alloted, setProjectAlloted] = useState(false);
  const [success, setSuccess] = useState("");
  const [group, setGroup] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setLoading(true);
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/student/project/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setProject(response.data.project);
            if (response.data.students) {
              setStudents(response.data.students);
            }
            if (response.data.project_alloted) {
              setProjectAlloted(true);
            }
            if (response.data.group) {
              setGroup(response.data.group);
            }
            if (response.data.teacher) {
              setTeacher([response.data.teacher]);
            }
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [success]);


  const selectProject = async () => {
    await axios
      .post("http://localhost:5000/student/projects/select", {
        project_id: id,
        group_id: group.id,
      }, {
        headers: {
          token: token,
        },
      })
      .then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
    { field: "address", headerName: "Address", width: 250 },
    { field: "cgpa", headerName: "CGPA", width: 100, hide: true },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (   
            <Link
              to={`/student/students/student-profile/${params.id}`}
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
        );
      },
    },
  ];

  const teachersColumns = [
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
    { field: "address", headerName: "Address", width: 250 },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (   
            <Link
              to={`/student/teacher-profile/${params.id}`}
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
        );
      },
    },
  ];



  return (
   
        loading ? (
          <div className="loading">
            <img src={Spinner} className="loader" alt="loader" />
            <h2>Loading</h2>
          </div>
        ) : (
          <>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4" noWrap component="div">
              {project.name}
            </Typography>
            <Box>
              {!students && !project_alloted && group && (
                <Button 
                  variant="contained" 
                  className="mb-3" 
                  onClick={(e) => setOpen(true)}

                >
                  Select this Project as your FYP
                </Button>
              )}
            </Box>
          </Box>
          <h6 className="mb-3">{project.details}</h6>
           {teacher[0] && (
            <>
              <Typography variant="h5" noWrap component="div" sx={{ mb: 1 }}>
                Supervisor
              </Typography>
              <DataGrid
                style={{ height: 170, width: "100%" }}
                rows={teacher}
                columns={teachersColumns}
                pageSize={2}
                loading={loading}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {students && (
            <>
              <Typography variant="h5" noWrap component="div" sx={{ mb: 1 }}>
                Group Members
              </Typography>
              <DataGrid
                style={{ height: 230, width: "100%" }}
                rows={students}
                columns={studentsColumns}
                pageSize={2}
                loading={loading}
                pagination={false}
              />
            </>
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
         {"Are you sure you want to select this Project as your Final Year Project ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you confirm this project as your Final Year Project,It will be alloted to your group and you can not change it. It can only be changed by Admin.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              selectProject();
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
        )
  );
}

export default Project;
