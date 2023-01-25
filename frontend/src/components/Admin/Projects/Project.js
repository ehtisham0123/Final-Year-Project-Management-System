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
import DeleteIcon from "@material-ui/icons/Delete";


function Project() {
  let { id, discipline, session } = useParams();
  const token = reactLocalStorage.get("token");
  const [project, setProject] = useState([]);
  const [projectAllocation, setProjectAllocation] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [teachers, setTeachers] = useState();
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    teacher: "",
    project: id,
  });
  const [open, setOpen] = useState(false);
  const [supervisorOpen, setSupervisorOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/admin/project/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setProject(response.data.project);
            if (response.data.teachers) {
              setTeachers(response.data.teachers);
            }
            if (response.data.students) {
              setStudents(response.data.students);
            }
            if (response.data.teacher) {
              setTeacher([response.data.teacher]);
            }
              if (response.data.projectAllocation) {
              setProjectAllocation(response.data.projectAllocation);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setSuccess("");
    setError("");
    e.preventDefault();
    await axios
      .post("http://localhost:5000/admin/supervisors/create", formdata, {
        headers: {
          token: token,
        },
      })
      .then(
        (response) => {
          if (response.data.success) {
            setSuccess(response.data.success);
          } else if (response.data.error) {
            setError(response.data.error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const deleteSupervisor = async (id) => {
    await axios.delete(`http://localhost:5000/admin/supervisors/${id}/${project.id}`, {
      headers: {
        token: token,
      },
    }).then((response) => {
       if (response.data.success) { 
          setTeacher([]);
          setSuccess(response.data.success);

       } 
    });
  };

  const deleteGroup = async (id) => {
    await axios.delete(`http://localhost:5000/admin/groups/${id}`, {
      headers: {
        token: token,
      },
    }).then((response) => { 
       if (response.data.success) { 
          setStudents();
          setProjectAllocation([]);
          setSuccess(response.data.success);
       } 
    });
  };  


  const deleteProjectAllocation = async (id) => {
    await axios.delete(`http://localhost:5000/admin/project-allocation/${id}`, {
      params:{
        project_id:project.id
      },
      headers: {
        token: token,
      },
    }).then((response) => {  
       if (response.data.success) { 
          setStudents();
          setProjectAllocation([]);
          setTeacher([]);
          setSuccess(response.data.success);
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
                  setConfirmOpen(true)
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
      width: 300,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (  
          <> 
            <Link
              to={`/admin/teachers/profile/${params.id}`}
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
                  setSupervisorOpen(true)
                }}
                className="mr-1"
                style={{ background: "red" }}
              >
                Delete Supervisor
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4" noWrap component="div">
              {project.name}
            </Typography>
            <Box>
            {projectAllocation.id && (
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => setOpen(true)}
                className="mr-1"
                style={{ background: "red" }}
              >
                Remove Project Allocation
              </Button>
              )}
            </Box>
          </Box>
          <h6 className="mb-3">{project.details}</h6>
          {!teacher[0] && teachers && (
            <form onSubmit={handleSubmit} className="needs-validation mb-2">
             <Typography variant="h5" noWrap component="div" sx={{mb:2}}>
              Select Supervisor
            </Typography>
              <div className="row">
                <div className="form-group col-md-12">
                  <select
                    id="teacher"
                    name="teacher"
                    className="form-control input"
                    value={formdata.teacher}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option className="py-5" value={teacher.id}>
                        {" "}
                        Name : {teacher.firstname} {teacher.lastname}{" "}
                        ____________ Email : {teacher.email}
                      </option>
                    ))}
                  </select>
                </div>
             
                <div className="form-group col-md-12">
                  <Button
                    type="submit"
                    variant="contained"
                    className="form-control"
                  >
                    Add Supervisor
                  </Button>
                </div>
              </div>
            </form>
            )}
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
          onClose={()=>{setOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete Project Allocation?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            When Project Allocation is deleted all data related to Project is completely removed, and it can not be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false);deleteProjectAllocation(projectAllocation.id)}}>Yes</Button>
            <Button onClick={()=>{setOpen(false)}}>No</Button>
          </DialogActions>
        </Dialog>
         <Dialog
          open={supervisorOpen}
          onClose={()=>{setSupervisorOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete Supervisor?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               When Supervisor is deleted all data related to Supervisor is completely removed, and it can not be recovered.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setSupervisorOpen(false);deleteSupervisor(teacher[0].id);}}>Yes</Button>
            <Button onClick={()=>{setSupervisorOpen(false)}}>No</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={confirmOpen}
          onClose={()=>{setConfirmOpen(false)}}
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
            <Button onClick={() => { setConfirmOpen(false);deleteGroup(students[0].id);}}>Yes</Button>
            <Button onClick={()=>{setConfirmOpen(false)}}>No</Button>
          </DialogActions>
        </Dialog>
        </>
        )}
    </>
  );
}

export default Project;