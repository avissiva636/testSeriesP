import { Box, Button, Card, Divider, Stack, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useLoginMutation } from "../../state/apiDevelopmentSlice";
import { setCredentials } from "../../state/stateSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      await login({ username, password })
        .unwrap()
        .then((response) => {
          if (response.message === "proceeded") {
            navigate("/Homepage");
            const userid = response.userid;
            const username = response.username;

            dispatch(setCredentials({ user: username, userid: userid }));
          } else {
            alert("Please try again");
          }
        });

    } catch (error) {      
      if (error.status === 401) {
        if (error?.data?.message === "unApproved"
        ) {
          alert("Student Not Approved");
        }
        else {
          alert("Ivalid username or password");
        }
      }
    }
  };
  return (
    // <Stack>
    <Stack>
      <Card>
        <Stack
          direction="row"
          sx={{
            height: "710px",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* <Grid2>Hi</Grid2> */}
          <Divider></Divider>
          <Grid2>
            <Box
              border={1}
              borderRadius={2}
              p={2}
              width={400}
              maxWidth={800}
              margin="auto"
              marginTop={4}
            >
              <Stack
                spacing={2}
                sx={{
                  width: "400px",
                  maxWidth: 800,
                  margin: "auto",
                  paddingTop: "0vh",
                }}
              >
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  color="success"
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  // onClick={handleLogin}
                  onClick={() => navigate("/register")}
                  color="success"
                >
                  Register
                </Button>
              </Stack>
            </Box>
          </Grid2>
        </Stack>
      </Card>
    </Stack>
    // </Stack>
  );
};
export default LoginPage;
