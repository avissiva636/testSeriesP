import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import { Link, useLocation } from "react-router-dom";

const ViewTest = () => {
  const location = useLocation();
  const questionDetails = location.state?.data;
  return (
    <Stack>
      <Stack direction="column" spacing={8}>
        <Navigationbar />
        <Stack direction={"row"} sx={{ backgroundColor: "#fafafa" }}>
          <Stack sx={{ position: "fixed", overflow: "auto" }}>
            <Explorer />
          </Stack>
          <Stack
            sx={{ marginLeft: "280px" }}
            direction={"row"}
            justifyContent="space-evenly"
            flexWrap="wrap"
          >
            {questionDetails.map((data) => (
              <Card
                direction={"column"}
                sx={{
                  width: "500px",
                  minHeight: "250px",
                  height: "auto",
                  textAlign: "center",
                  margin: "10px",
                  borderColor: "ButtonShadow",
                }}
              >
                <Grid direction={"column"}>
                  <Grid item>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                  </Grid>
                  <Grid>
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                      <Stack direction={"column"}>
                        <h4 style={{ marginBottom: "0rem" }}>Subject</h4>
                        <p>{data.subject}</p>
                      </Stack>
                      <Stack>
                        <h4 style={{ marginBottom: "0rem" }}>no.of question</h4>
                        <p>{data.nQuestion}</p>
                      </Stack>
                      <Stack>
                        <h4 style={{ marginBottom: "0rem" }}>Time Allocated</h4>
                        <p>{data.time}</p>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Divider />
                  <Stack
                    direction={"row"}
                    sx={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"space-evenly"}
                    >
                      <Grid item>
                        <Button variant="contained" color="success">
                          <Link
                            to={"/InstructionPage"}
                            state={{ data: data }}
                            style={{ textDecoration: "none", color: "#ffffff" }}
                          >
                            Start Exam
                          </Link>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Typography>Attempt: 0/1</Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default ViewTest;
