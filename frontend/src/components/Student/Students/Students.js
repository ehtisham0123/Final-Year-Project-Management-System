import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";

import { Link } from "react-router-dom";


import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import BookIcon from "@material-ui/icons/Book";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";



function Students() {
  const token = reactLocalStorage.get("token");
  const user_id = reactLocalStorage.get("user_id");
  const [loading, setLoading] = useState(false);
  const [alone, setAlone] = useState(false);
  const [students, setStudents] = useState([]);
  const [groupMemberId, setGroupMemberId] = useState();
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setLoading(true);
    let getUsersData = async () => {
      await axios
        .get(`http://localhost:5000/student/students/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            if (response.data.group_member_id) {      
              setGroupMemberId( response.data.group_member_id);
            } else if (response.data.alone == true) {
              setAlone(true);
            }
            setStudents(
              response.data.result.filter(
                (student) =>
                  student.id !== user_id
              )
            );
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
      width: 100,
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
    {
      field: "role",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
      if (groupMemberId) { 
        if (params.id === groupMemberId) { 
          return (    
            <Typography sx={{color:"green"}}>
              Group Member
            </Typography>
            );
          }else{
            return (    
              <Typography sx={{color:"red"}}>
                Class Mate
              </Typography>
            );
        }
      }
      },
    },
  ];


  return (
    <>

       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" noWrap component="div">
          Class Mates Record
        </Typography>

          {groupMemberId ? (
            <></>
          ) : alone ? (  
          <Typography variant="h5" noWrap component="div" sx={{color:"red"}}>
          No Group Members
         </Typography>
          ) : (
            <Link to={`requests`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                size="small"
                startIcon={<VisibilityOutlinedIcon />}
                color="primary"
              >
                Group Requests
              </Button>
            </Link>
          )}
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
    </>
  );
}

export default Students;
