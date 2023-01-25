import "./App.css";

import Home from "./Home";
import About from "./About";

import AdminLogin from "./components/Admin/AdminLogin";
import TeacherLogin from "./components/Teacher/TeacherLogin";
import StudentLogin from "./components/Student/StudentLogin";
import StudentSignup from "./components/Student/StudentSignup";
import NotFound from "./components/NotFound";

import Projects from "./components/Projects/Projects";
import Project from "./components/Projects/Project";

import { useState } from "react";
import { Link, Routes, Route , useLocation} from "react-router-dom";

import logo_background from "./logo_background.jpg";
import logo from "./logo.png";
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
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

function App() {

  const location = useLocation();

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

   return (
    <Box sx={{ display: 'flex' }}>    
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
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
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to={`/`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname == `/`}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Home
              </ListItemText>
            </ListItem> 
            </Link>
               <Link to={`/projects`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname.includes(`projects`)}>
              <ListItemIcon>
                <ListAltIcon /> 
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>  
                Projects
              </ListItemText>
            </ListItem>
             </Link> 
        <Divider />

          <Link to={`/admin-login`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname == `/admin-login`}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Admin Login
              </ListItemText>
            </ListItem>
          </Link>     

       
          <Link to={`/student-login`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname == `/student-login`}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Student Login
              </ListItemText>
            </ListItem>
            </Link>
        
          <Link to={`/teacher-login`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname == `/teacher-login`}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Teacher Login
              </ListItemText>
            </ListItem>
            </Link>
              <Link to={`/student-signup`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname == `/student-signup`}>
              <ListItemIcon >
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                Student Regestration
              </ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to={`/about`} style={{ color: "inherit", textDecoration: "inherit" }} >
            <ListItem button selected={location.pathname == `/about`}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize: '19px'}}>
                About Developers
              </ListItemText>
            </ListItem> 
            </Link> 
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          <Box sx={{ p: 2 }}>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/projects" element={<Projects />} />
              <Route path={`/projects/view/:id`} element={<Project />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/teacher-login" element={<TeacherLogin />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/student-signup" element={<StudentSignup />} />
              <Route path="/*" element={<NotFound />} />
          </Routes>
          </Box>
      </Main>
    </Box>
  );
}

export default App;
