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
import { useNavigate } from "react-router-dom";

const TestPageNav = (props) => {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      white: {
        main: "#FFFFFF",
      },
    },
  });
  return (
    <Stack>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color="white">
          <Toolbar>
            <Stack
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
              direction={"row"}
            >
              <Stack>
                <Typography variant="h5">INSPIRO</Typography>
              </Stack>
              <Stack>
                <Typography
                  variant="h4"
                  sx={{
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "0px 30px 0px 30px",
                    color: "blue",
                  }}
                >
                  {props.title}
                </Typography>
              </Stack>
              <Stack>
                {" "}
                <Button color="error" variant="contained">
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
export default TestPageNav;
