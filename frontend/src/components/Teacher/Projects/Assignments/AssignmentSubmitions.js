import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../Spinner.png";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


function AssignmentSubmitions() {
  const token = reactLocalStorage.get("token");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  let { id, project_id } = useParams();

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(
          `http://localhost:5000/teacher/projects/assignments/show/assignment-submissions`,
          {
            headers: {
              token: token,
            },
            params: {
              project_id: project_id,
              assignment_id: id,
            },
          }
        )
        .then((response) => {
          if (response.data.result) {
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
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "contact", headerName: "Contact", width: 120, hide: true },
    { field: "address", headerName: "Address", width: 220, hide: true },
    { field: "cgpa", headerName: "CGPA", width: 100, hide: true },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (params.row.supervisor_assignment_submissions[0]) {
          return <p className="badge badge-success px-3 py-1 mt-3">Submitted</p>;
        } else {
          return <p className="badge badge-danger px-3 py-1 mt-3">Pending</p>;
        }
      },
    },
    {
      field: "marking",
      headerName: "Marking",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if (params.row.supervisor_assignment_submissions[0]) {
          if (params.row.supervisor_assignment_submissions[0].obtained_marks) {
            return <p className="badge badge-success px-3 py-1 mt-3">Graded</p>;
          } else {
            return <p className="badge badge-danger px-3 py-1 mt-3">Pending</p>;
          }
        } else {
          return <p className="badge badge-danger px-3 py-1 mt-3">Pending</p>;
        }
      },
    },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            {params.row.supervisor_assignment_submissions[0] && (
              <Link
                to={`assignment/${params.id}`}
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
            )}
          </>
        );
      },
    },
  ];



  return (
    <>
      <Typography variant="h4" noWrap component="div" sx={{ mb: 2 }}>
         Assignment Submittions
      </Typography>
      <DataGrid
        style={{ height: 230, width: "100%" }}
        rows={students}
        columns={columns}
        pageSize={2} 
        loading={loading}
      />
    </>
  );
}

export default AssignmentSubmitions;
