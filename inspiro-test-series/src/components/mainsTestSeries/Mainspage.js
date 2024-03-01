import { Button, Card, Grid, Stack } from "@mui/material";
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import { useInspiroCrud } from "../context/InspiroContext";

const Mainspage = () => {
    const { mainsTest } = useInspiroCrud();
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
          {mainsTest.mains.map((mains) => (
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
                  <h2>{mains.title}</h2>
                  <p>{mains.description}</p>
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
                        justifyContent: "center",
                      }}
                    >
                      Purchase for ₹ <b>{mains.fee}</b>
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
                      <a href={mains.details}>
                        <Button variant="contained" color="primary">
                          Schedule
                        </Button>
                      </a>
                      <h4 style={{ paddingTop: "10px" }}>{mains.testCount+" Tests"}</h4>
                      <a href={mains.payHere}>
                        <Button variant="contained" color="success">
                          Buy
                        </Button>
                      </a>
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
export default Mainspage;
