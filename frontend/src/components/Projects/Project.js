import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../Spinner.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


function Project() {
  let { id, discipline, session } = useParams();
  const token = reactLocalStorage.get("token");
  const [project, setProject] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [teachers, setTeachers] = useState();
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/project/${id}`, {
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
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);


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
    { field: "cgpa", headerName: "CGPA", width: 100 },
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
    { field: "contact", headerName: "Contact", width: 120 },
    { field: "address", headerName: "Address", width: 250 },
  ];

  return (
      <div className="container">
        {loading ? (
          <div className="loading">
            <img src={Spinner} className="loader" alt="loader" />
            <h2>Loading</h2>
          </div>
        ) : (
         <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" noWrap component="div">
              {project.name}
            </Typography>
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
          </>
        )}
      </div>
  
  );
}

export default Project;
