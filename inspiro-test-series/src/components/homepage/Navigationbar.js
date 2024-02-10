import {
  AppBar,
  Badge,
  Button,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
const Navigationbar = () => {
  const theme = createTheme({
    palette: {
      white: {
        main: "#FFFFFF",
      },
    },
  });
  const notificationCount = 3;
  return (
    <Stack>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color="white">
          <Toolbar>
            <Stack spacing={69} direction={"row"}>
              <Typography variant="h5">INSPIRO</Typography>
              <Stack
                sx={{
                  padding: "4px",
                  display: "inline-flex",
                  borderRadius: "1px",
                  cursor: "pointer",
                  "&:hover": {
                    border: "1px solid",
                    color: "#FFFFFF",
                  },
                }}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsNoneOutlinedIcon color="action" />
                </Badge>
              </Stack>
              <Button color="success" variant="contained">
                Sign Out
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};
export default Navigationbar;
