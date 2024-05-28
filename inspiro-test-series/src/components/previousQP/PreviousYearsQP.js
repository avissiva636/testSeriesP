import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

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
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PreviousYearsQP() {
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/${name}`);
  };

  const mainListItems = (
    <React.Fragment>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("Dashboard")}>
          <ListItemIcon>
            <ImportantDevicesIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("PurchasedTestSeries")}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Purchased Test Series" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("PrelimsTestStore")}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Prelims Test Store" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("MainsTestStore")}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary="Mains Test Store" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("ScheduledTestStore")}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Scheduled Test Store" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("PreviousYearsQP")}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Previous Year QP's" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("DiscussionMainPage")}>
          <ListItemIcon>
            <ForumRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Discussion" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("ProgressCardMain")}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Progress Card" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("ArchivesMainPage")}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archives" />
        </ListItemButton>
      </Box>
      <Box sx={{ margin: "20px 0" }}>
        <ListItemButton onClick={() => handleClick("Settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </Box>
    </React.Fragment>
  );
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Inspiro Test Series
            </Typography>
            <Stack spacing={70} direction={"row"}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button variant="contained" color="error">
                Sign Out
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <h3>Username</h3>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
          <Divider />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
