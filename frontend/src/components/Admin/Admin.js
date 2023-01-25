// Home
import Home from "./Home";

// Profile
import EditProfile from "./Profile/EditProfile";
import Profile from "./Profile/Profile";

// Teachers
import Teachers from "./Teachers/Teachers";
import CreateTeacher from "./Teachers/CreateTeacher";
import EditTeacher from "./Teachers/EditTeacher";
import Teacher from "./Teachers/Teacher";

// Students
import Sessions from "./Sessions/Sessions";
import Students from "./Sessions/Students/Students";
import CreateStudent from "./Sessions/Students/CreateStudent";
import EditStudent from "./Sessions/Students/EditStudent";
import Student from "./Sessions/Students/Student";
import Groups from "./Sessions/Students/Groups";

// Project Organizers
import ProjectOrganizers from "./ProjectOrganizers/ProjectOrganizers";
import CreateProjectOrganizer from "./ProjectOrganizers/CreateProjectOrganizer";

// Projects
import Projects from "./Projects/Projects";
import CreateProject from "./Projects/CreateProject";
import EditProject from "./Projects/EditProject";
import Project from "./Projects/Project";

// Posts
import Posts from "./Posts/Posts";
import CreatePost from "./Posts/CreatePost";
import EditPost from "./Posts/EditPost";

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

function Admin() {
  const navigate  = useNavigate();
  const location = useLocation();
  const avatar = reactLocalStorage.get("user_avatar");
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  useEffect(()=>{
    if (!reactLocalStorage.get('token')) {
      navigate('/admin-login');
    }
    if (reactLocalStorage.get('user_role') !== "admin") {
      navigate('/admin-login');
    }
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("user_id");
    reactLocalStorage.remove("user_name");
    reactLocalStorage.remove("user_role");
    navigate('/admin-login')
  };



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
            to={`/admin/profile`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button selected={location.pathname.includes("admin/profile")}>
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
            to={`/admin`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button selected={location.pathname == `/admin`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Home
              </ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/admin/teachers`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button  selected={location.pathname.includes("admin/teachers")}>
              <ListItemIcon>
                 <PeopleIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Teachers</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/admin/sessions`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button  selected={location.pathname.includes("admin/sessions")}>
              <ListItemIcon>
                  <SchoolIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Students</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/admin/project-organizers`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
           <ListItem button  selected={location.pathname.includes("admin/project-organizers")}>
              <ListItemIcon>
                 <PeopleIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Project Organizers</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/admin/projects`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
             <ListItem button  selected={location.pathname.includes("admin/projects")}>
              <ListItemIcon>
                  <ListAltIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Projects</ListItemText>
            </ListItem>
          </Link>
          <Link
            to={`/admin/posts`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <ListItem button  selected={location.pathname.includes("admin/posts")}>
              <ListItemIcon>
                <NotificationsActiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>Posts</ListItemText>
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
            <Route exact path={`/`} element={<Home />} />

            {/* Profile */}
            <Route path={`/profile/edit/`} element={<EditProfile />} />
            <Route path={`/profile/`} element={<Profile />} />

            {/* Teachers */}
            <Route exact path={`/teachers`} element={<Teachers />} />
            <Route path={`/teachers/create`} element={<CreateTeacher />} />
            <Route path={`/teachers/profile/:id`} element={<Teacher />} />
            <Route path={`/teachers/edit/:id`} element={<EditTeacher />} />

            {/* Students */}
            <Route exact path={`/sessions`} element={<Sessions />} />
            <Route
              exact
              path={`/sessions/students/:session/:discipline`}
              element={<Students />}
            />
            <Route
              path={`/sessions/students/:session/:discipline/profile/:id`}
              element={<Student />}
            />
            <Route
              exact
              path={`/sessions/students/:session/:discipline/profile/:id/groups`}
              element={<Groups />}
            />
            <Route
              path={`/sessions/students/:session/:discipline/create`}
              element={<CreateStudent />}
            />
            <Route
              path={`/sessions/students/:session/:discipline/edit/:id`}
              element={<EditStudent />}
            />

            {/* Project Organizers */}
            <Route
              exact
              path={`/project-organizers`}
              element={<ProjectOrganizers />}
            />
            <Route
              path={`/project-organizers/create`}
              element={<CreateProjectOrganizer />}
            />

            {/* Projects */}
            <Route exact path={`/projects`} element={<Projects />} />
            <Route path={`/projects/create`} element={<CreateProject />} />
            <Route
              path={`/projects/view/:id/:session/:discipline`}
              element={<Project />}
            />
            <Route
              path={`/projects/edit/:id/:session/:discipline`}
              element={<EditProject />}
            />

            {/* Posts */}
            <Route exact path={`/posts`} element={<Posts />} />
            <Route
              path={`/posts/create`}
              element={<CreatePost />}
            />
            <Route
              path={`/posts/edit/:id`}
              element={<EditPost />}
            />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default Admin;
