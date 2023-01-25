// Home
import Home from "./Home";

// Chat
import Chat from "./Chat/Chat";

// Project Organizers Assignments
import Sessions from "./Sessions/Sessions";
import Assignments from "./Sessions/Students/Assignments/Assignments";
import CreateAssignment from "./Sessions/Students/Assignments/CreateAssignment";
import EditAssignment from "./Sessions/Students/Assignments/EditAssignment";
import Assignment from "./Sessions/Students/Assignments/Assignment";
import AssignmentSubmitions from "./Sessions/Students/Assignments/AssignmentSubmitions";
import AssignmentSubmition from "./Sessions/Students/Assignments/AssignmentSubmition";
import AssignmentViewer from "./Sessions/Students/Assignments/AssignmentViewer";

// Project Organizers Assignments
import SupervisorAssignments from "./Projects/Assignments/Assignments";
import SupervisorCreateAssignment from "./Projects/Assignments/CreateAssignment";
import SupervisorEditAssignment from "./Projects/Assignments/EditAssignment";
import SupervisorAssignment from "./Projects/Assignments/Assignment";
import SupervisorAssignmentSubmitions from "./Projects/Assignments/AssignmentSubmitions";
import SupervisorAssignmentSubmition from "./Projects/Assignments/AssignmentSubmition";
import SupervisorAssignmentViewer from "./Projects/Assignments/AssignmentViewer";


// Projects
import Projects from "./Projects/Projects";
import Project from "./Projects/Project";

// Posts
import Posts from "./Posts/Posts";
import CreatePost from "./Posts/CreatePost";
import EditPost from "./Posts/EditPost";

// Profile
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";

// Students
import Student from "./Sessions/Students/Student";
import Students from "./Sessions/Students/Students";

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



function Teacher() {
  const navigate  = useNavigate();
  const location = useLocation();
  const token = reactLocalStorage.get("token");
  const avatar = reactLocalStorage.get("user_avatar");
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  useEffect(()=>{
    if (!reactLocalStorage.get('token')) {
      navigate('/teacher-login');
    }
    if (reactLocalStorage.get('user_role') !== "teacher") {
      navigate('/teacher-login');
    }
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    reactLocalStorage.remove('token');
    reactLocalStorage.remove('user_id');
    reactLocalStorage.remove('user_name');
    reactLocalStorage.remove('user_role');
    reactLocalStorage.remove('user_avatar');
    navigate('/teacher-login');
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
            to={`/teacher/profile`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button selected={location.pathname.includes("teacher/profile")}>
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
            to={`/teacher`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/teacher`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Home
              </ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/teacher/sessions`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button  selected={location.pathname.includes("teacher/sessions")}>
              <ListItemIcon>
                  <SchoolIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Students</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/teacher/projects`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button  selected={location.pathname.includes("teacher/projects")}>
              <ListItemIcon>
                  <ListAltIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Projects</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/teacher/posts`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button  selected={location.pathname.includes("teacher/posts")}>
              <ListItemIcon>
                <NotificationsActiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Posts</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/teacher/chat`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button selected={location.pathname.includes("teacher/chat")}>
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

            {/* Students */}
            <Route exact path={'/sessions'} element={ <Sessions />} />
            <Route exact path={'/sessions/students/:session/:discipline'} element={ <Students />} />
            <Route path={'/sessions/students/:session/:discipline/student-profile/:id'} element={ <Student />} />
            <Route exact path={'/sessions/students/:session/:discipline/assignments'} element={ <Assignments />} />
            <Route path={'/sessions/students/:session/:discipline/assignments/create'} element={ <CreateAssignment />} />
            <Route exact path={'/sessions/students/:session/:discipline/assignments/view/:id'} element={ <Assignment />} />
            <Route exact path={'/sessions/students/:session/:discipline/assignments/edit/:id'} element={ <EditAssignment />} />
            <Route exact path={'/sessions/students/:session/:discipline/assignments/view/:id/assignment-submissions'} element={ <AssignmentSubmitions />} />
            <Route exact path={'/sessions/students/:session/:discipline/assignments/view/:id/assignment-submissions/assignment/:student_id'} element={ <AssignmentSubmition />} />
            <Route exact path={'/sessions/students/:session/:discipline/assignments/view/:id/assignment-submissions/assignment/:student_id/:file/:file_type'} element={ <AssignmentViewer />} />

            {/* Projects */}
            <Route exact path={'/projects'} element={ <Projects />} />
            <Route exact path={'/projects/view/:project_id/assignments'} element={ <SupervisorAssignments />} />
            <Route exact path={'/projects/view/:project_id'} element={ <Project />} />
            <Route exact path={'/projects/view/:project_id/assignments/create'} element={ <SupervisorCreateAssignment />} />
            <Route exact path={'/projects/view/:project_id/assignments/view/:id'} element={ <SupervisorAssignment />} />
            <Route exact path={'/projects/view/:project_id/assignments/edit/:id'} element={ <SupervisorEditAssignment />} />
            <Route exact path={'/projects/view/:project_id/assignments/view/:id/assignment-submissions'} element={ <SupervisorAssignmentSubmitions />} />
            <Route exact path={'/projects/view/:project_id/assignments/view/:id/assignment-submissions/assignment/:student_id'} element={ <SupervisorAssignmentSubmition />} />
            <Route exact path={'/projects/view/:project_id/assignments/view/:id/assignment-submissions/assignment/:student_id/:file/:file_type'} element={ <SupervisorAssignmentViewer />} />

            {/* Posts */}
            <Route exact path={'/posts'} element={ <Posts />} />
            <Route path={'/posts/create'} element={ <CreatePost />} />
            <Route path={'/posts/edit/:id'} element={ <EditPost />} />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default Teacher;
