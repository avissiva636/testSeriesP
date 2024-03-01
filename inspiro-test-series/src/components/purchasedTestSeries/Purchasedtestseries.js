import { Button, Card, Grid, Stack } from "@mui/material";
import { useInspiroCrud } from "../context/InspiroContext";
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";

const Purchasedtestseries = () => {
  const { purchasedTest } = useInspiroCrud();

  const allData = [...purchasedTest.prelims, ...purchasedTest.mains];

  return (
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      <Stack direction={"row"}>
        <Stack sx={{ position: "fixed", overflow: "auto" }}>
          <Explorer />
        </Stack>
        <Stack
          sx={{ marginLeft: "280px", overflow: "auto" }}
          direction={"row"}
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {allData.map((data) => (
            <Card
              variant="outlined"
              sx={{
                width: "400px",
                minHeight: "200px",
                height: "auto",
                textAlign: "center",
                margin: "10px",
                borderColor: "ButtonShadow",
              }}
            >
              <Grid direction={"column"} spacing={1}>
                <Grid item>
                  <h2>{data.title}</h2>
                  <p>{data.description}</p>
                </Grid>
                {/* <Divider /> */}
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{ marginTop: "10px" }}
                >
                  <Grid container justifyContent="center">
                    <Grid
                      item
                      sx={{
                        backgroundColor: "#f0f0f0",
                        width: "300px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <TaskAltIcon />
                      <AccessTimeIcon />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{
                        padding: "10px 30px 0px 30px",
                        justifyContent: "space-between",
                      }}
                    >
                      <a href={data.details}>
                        <Button variant="contained" color="primary">
                          Schedule
                        </Button>
                      </a>
                      <h4 style={{ paddingTop: "10px" }}>20 Tests</h4>

                      <Stack>
                        <Button variant="contained" color="success">
                          <Link
                            to={"/ViewTest"}
                            state={{ data: data.question }}
                            style={{ textDecoration: "none", color: "#ffffff" }}
                          >
                            View Test
                          </Link>
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                </Stack>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Purchasedtestseries;
