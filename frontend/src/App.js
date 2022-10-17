import "./App.css";
import * as React from "react";
import { useState, useEffect} from "react";
import { styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import logo from "../src/images/keep.png"
import Box from "@mui/material/Box";
import { DragDropContext} from 'react-beautiful-dnd';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import GetNotes from "./components/getNotes";
import { IoIosSearch } from "react-icons/io";

function App() {
  const [searchNotes, setSearchNotes] = useState([]);

  const drawerWidth = 240;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  const [notes, setNotes] = useState([]);
  

  function addNote(newNote) {
    setNotes((prevValue) => {
      return [...prevValue, newNote];
    });
  }
  
  function deleteNotes(id,title) {
    console.log(title);
    axios({
      method: "GET",
      url: "http://localhost:5000/notedel",
      params: {
        title:title
    },

    })
    setNotes((preValue) => {
      return [...preValue.filter((note, index) => index !== id)];
    });
  }
  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  function searchButton(event) {
    event.preventDefault();
    let title=document.getElementById("search").value;
    axios({
      method: "POST",
      url: "http://localhost:5000/search",
      params: {
        title:title,
    },

    }).then(res => {
      setSearchNotes(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const menuId = "primary-search-account-menu";
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ background: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt=""></img>
          <Typography variant="h6" noWrap component="div">
            Keep
          </Typography>
          <div className="search">
            <form action="search" method="post">
              <input 
              id="search" 
              name="search" 
              placeholder="Search" 
              type="text"
            ></input>
            <button className="search" onClick={searchButton} ><IoIosSearch/> </button>
          </form>
          </div> 
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <ReplayOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <ViewAgendaOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
            >
              <SettingsSharpIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              color="inherit"
            >
              <AppsOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
        <List>
          {["Notes", "Remainder", "Edit Labels", "Archive", "Trash"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 ? (
                      <LightbulbOutlinedIcon />
                    ) : index === 1 ? (
                      <NotificationsNoneOutlinedIcon />
                    ) : index === 2 ? (
                      <EditOutlinedIcon />
                    ) : index === 3 ? (
                      <InboxIcon />
                    ) : (
                      <DeleteSweepOutlinedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="App">
      <CreateArea onAdd={addNote} />
    <DragDropContext>
      <GetNotes searchNotes={searchNotes}/>
      <h2 >New Note </h2><hr></hr>
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          onDelete={deleteNotes}
        />
      ))}
    </DragDropContext>
    </div>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
export default App;
