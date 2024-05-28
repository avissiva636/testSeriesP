import {
  AppBar,
  Button,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
const Navigationbar = () => {
  const navigate = useNavigate();
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
            <Stack spacing={3} direction={"row"} onClick={()=>{navigate("/")}}>
              <HomeOutlinedIcon />
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
                  {}
                </Stack>
                <Button color="error" variant="contained" sx={{ ml: "auto" }}>
                  Sign Out
                </Button>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};
export default Navigationbar;
