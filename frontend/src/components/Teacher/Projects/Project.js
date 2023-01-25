import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import Spinner from "../../Spinner.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import BookIcon from "@material-ui/icons/Book";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Project() {
  let { project_id, discipline, session } = useParams();
  const token = reactLocalStorage.get("token");
  const [project, setProject] = useState([]);
  const [students, setStudents] = useState();

  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    teacher: "",
    project: project_id,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/teacher/project/${project_id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setProject(response.data.project);
            setStudents(response.data.students);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, [success]);

  function getFullName(params) {
    return `${params.row.firstname || ""} ${params.row.lastname || ""}`;
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
    { field: "address", headerName: "Address", width: 220 },
    { field: "cgpa", headerName: "CGPA", width: 100, hide: true },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 240,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/teacher/sessions/students/${session}/${discipline}/student-profile/${params.id}`}
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
              to={`/teacher/chat/${params.id}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{ mr: 1 }}
                style={{ background: "green" }}
                startIcon={<ChatIcon />}
              >
                Massage
              </Button>
            </Link>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h4" noWrap component="div">
              {project.name}
            </Typography>
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={`assignments`}
            >
              <Button
                variant="contained"
                className="mb-3"
                startIcon={<BookIcon />}
              >
                Assignments
              </Button>
            </Link>
          </Box>
          <h6 className="mb-3">{project.details}</h6>
          {students && (
            <>
              <Typography variant="h5" noWrap component="div" sx={{ mb: 1 }}>
                Group Members
              </Typography>
              <DataGrid
                style={{ height: 230, width: "100%" }}
                rows={students}
                columns={columns}
                pageSize={2}
                loading={loading}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Project;
