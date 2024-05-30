//This page is the starting page of prelims section, navigating from explorer & Dashboard section.
import {
  Button, Card,
  // Divider,
  Grid, Stack
} from "@mui/material";
// import { useInspiroCrud } from "../context/InspiroContext";
// import Explorer from "../homepage/Explorer";
// import Navigationbar from "../homepage/Navigationbar";
import Appbar from "../homepage/Appbar";
import { useGetPrelimsSeriesQuery } from "../../state/apiDevelopmentSlice";
// import { useEffect } from "react";

const Prelimspage = () => {
  // const { prelimsTest } = useInspiroCrud();
  const { isLoading: isPrelimsLoading, data: prelimsData } = useGetPrelimsSeriesQuery({ userId: "66279432cc5ed3267265fd5d" });

  return (
    <Stack direction="row" spacing={8}>
      {/* <Navigationbar /> */}
      {/* <Stack direction={""}> */}
      <Appbar />
      {/* <Stack sx={{position:"fixed", overflow:"auto"}}><Explorer /></Stack> */}
      <Stack sx={{ marginLeft: "0px", overflow: "auto" }} direction={"row"} justifyContent="space-evenly" flexWrap="wrap">
        {
          isPrelimsLoading ? <h1>Loading...</h1> :
            prelimsData?.prelims.map((prelims) => (
              <Card
                variant="outlined"
                sx={{
                  width: "400px",
                  minHeight: prelimsData?.prelims.length < 4 ? "280px" : "auto",
                  height: prelimsData?.prelims.length < 4 ? "200px" : "auto",
                  textAlign: "center",
                  margin: "10px",
                  borderColor: "ButtonShadow",
                  marginTop: "80px",

                }}
              >
                <Grid direction={"column"} spacing={1}>
                  <Grid item>
                    <h2>{prelims.pSeriesDetails.title}</h2>
                    <p>{prelims.pSeriesDetails.description}</p>
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
                        Purchase for ₹ <b>{prelims.pSeriesDetails.price}</b>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{
                          padding: "10px 30px 0px 30px",
                          justifyContent: "space-between",
                          marginBottom: "10px"
                        }}
                      >
                        <a href={`${process.env.REACT_APP_BASE_URL}/images/prelims/${prelims.pSeriesDetails.schedule}`}>
                          <Button variant="contained" color="primary">
                            Schedule
                          </Button>
                        </a>
                        <h4 style={{ paddingTop: "10px" }}>{prelims.totalCount + " Tests"}</h4>
                        <a href={prelims.pSeriesDetails.paymentLink}>
                          <Button variant="contained" color="success">
                            Buy
                          </Button></a>
                      </Stack>
                    </Grid>
                  </Stack>
                </Grid>
              </Card>
            ))

        }
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
};
export default Prelimspage;
