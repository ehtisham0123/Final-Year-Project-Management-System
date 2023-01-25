// Home
import Home from "./Home";

// Chat
import Chat from "./Chat/Chat";

// Projects
import Projects from "./Projects/Projects";
import Project from "./Projects/Project";

// Posts
import Posts from "./Posts/Posts";

// Profile
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";

// Groups
import Students from "./Students/Students";
import ClassMate from "./Students/Student";
import GroupRequests from "./Students/GroupRequests";
import SentGroupRequests from "./Students/SentGroupRequests";
import CreateGroupRequest from "./Students/CreateGroupRequest";

// Teachers
import Teachers from "./Teachers/Teachers";
import Teacher from "./Teachers/Teacher";

// PO Assignments
import Assignments from "./Assignments/Assignments";
import Assignment from "./Assignments/Assignment";
import AssignmentViewer from "./Assignments/AssignmentViewer";

// Supervisor Assignments
import SupervisorAssignments from "./SupervisorAssignments/Assignments";
import SupervisorAssignment from "./SupervisorAssignments/Assignment";
import SupervisorAssignmentViewer from "./SupervisorAssignments/AssignmentViewer";



import axios from "axios";
import  { useState,useEffect } from "react";
import { Link, Routes, Route ,useNavigate , useLocation} from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SchoolIcon from '@mui/icons-material/School';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import BookIcon from "@material-ui/icons/Book";

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Student() {
  const navigate  = useNavigate();
  const location = useLocation();
  const token = reactLocalStorage.get("token");
  const avatar = reactLocalStorage.get("user_avatar");
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [listOpen, setListOpen] = useState(false);

  useEffect(()=>{
    if (!reactLocalStorage.get('token')) {
      navigate('/student-login');
    }
    if (reactLocalStorage.get('user_role') !== "student") {
      navigate('/student-login');
    }
  },[])


  const handleDrawerOpen = () => {
    setOpen(true);
  };
 
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setListOpen(!listOpen);
  };

  const logout = () => {
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_name');
    reactLocalStorage.remove('user_role');
    reactLocalStorage.remove('user_avatar');
    navigate('/student-login');
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Final Year Project Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link
            to={`/student/profile`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button selected={location.pathname.includes("student/profile")}>
              <ListItemIcon>
                 <img src={`/uploads/${avatar}`} className=" user_img mr-2" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>{reactLocalStorage.get("user_name")}</ListItemText>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
            </ListItem>
          </Link>
          <Divider />
          <Link
            to={`/student`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/student`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Home
              </ListItemText>
            </ListItem>
          </Link>
           <Link
            to={`/student/teachers`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button selected={location.pathname.includes("student/teachers")}>
              <ListItemIcon>
                  <PeopleIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Teachers</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/student/students`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button  selected={location.pathname.includes("student/students")}>
              <ListItemIcon>
                  <SchoolIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Class Mates</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/student/projects`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button  selected={location.pathname.includes("student/projects")}>
              <ListItemIcon>
                  <ListAltIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Projects</ListItemText>
            </ListItem>
          </Link> 
        <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Assignments" primaryTypographyProps={{fontSize: '19px'}} />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
              <Link
            to={`/student/supervisor-assignments`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button  selected={location.pathname.includes("student/supervisor-assignments")}>
              <ListItemIcon>
                  <BookIcon />
              </ListItemIcon>
              <ListItemText>Assignments By Supervisor</ListItemText>
            </ListItem>
          </Link>   
          <Link
            to={`/student/assignments`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button  selected={location.pathname.includes("student/assignments")}>
              <ListItemIcon>
                  <BookIcon />
              </ListItemIcon>
              <ListItemText>
                Assignments By Project Organizer
              </ListItemText>
            </ListItem>
          </Link>
        </List>
      </Collapse>




      
          <Link
            to={`/student/posts`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button  selected={location.pathname.includes("student/posts")}>
              <ListItemIcon>
                <NotificationsActiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Posts</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/student/chat`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button selected={location.pathname.includes("student/chat")}>
              <ListItemIcon>
                  <ChatIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Chat</ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Logout</ListItemText>
        </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ p: 2 }}>
          <Routes>   
            {/* Home */}
            <Route exact path={'/'} element={ <Home />} />

            {/* Chat */}
            <Route path={'/chat/:id'} element={ <Chat />} />
            <Route path={'/chat/'} element={ <Chat />} />

            {/* Profile */}
            <Route path={'/profile/edit/'} element={ <EditProfile />} />
            <Route path={'/profile/'} element={ <Profile />} />

            {/* Projects */}
            <Route exact path={'/projects'} element={ <Projects />} />
            <Route exact path={'/projects/view/:id/:session/:discipline'} element={ <Project />} />

            {/* Groups And Classmates */}
            <Route exact path={'/students/requests/sent'} element={<SentGroupRequests />} />
            <Route exact path={'/students'} element={<Students />} />
            <Route exact path={'/students/requests'} element={<GroupRequests />} />
            <Route exact path={'/students/requests/create'} element={<CreateGroupRequest />} />     
            <Route path={'/students/student-profile/:id'} element={< ClassMate  />} />

            {/* Posts */}
            <Route exact path={'/posts'} element={<Posts />} />

            {/* Teachers */}
            <Route exact path={`/teachers`} element={<Teachers />} />
            <Route
              path={`/teachers/teacher-profile/:id`}
              element={<Teacher />}
            />

            {/* PO Assignments */}
            <Route
              exact
              path={`/assignments`}
              element={ <Assignments />}
            />
            <Route
              exact
              path={`/assignments/view/:id`}
              element={ <Assignment />}
            />
            <Route
              path={`/assignments/view/:id/:file/:file_type`}
              element={ <AssignmentViewer />}
            />

            {/* PO Assignments */}
            <Route
              exact
              path={`/supervisor-assignments`}
              element={ <SupervisorAssignments />}
            />
            <Route
              exact
              path={`/supervisor-assignments/view/:id`}
              element={ <SupervisorAssignment />}
            />
            <Route
              path={`/supervisor-assignments/view/:id/:file/:file_type`}
              element={ <SupervisorAssignmentViewer />}
            />

          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default Student;
