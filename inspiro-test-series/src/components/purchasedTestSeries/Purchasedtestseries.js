import { Button, Card, Grid, Stack } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import Appbar from "../homepage/Appbar";
import { useGetPurchasedSeriesQuery } from "../../state/apiDevelopmentSlice";

const Purchasedtestseries = () => {
  const { isLoading: isPurchasedLoading, data: purchasedData } = useGetPurchasedSeriesQuery({ userId: "66279432cc5ed3267265fd5d" });
  const allData = [...(purchasedData?.prelims ?? []), ...(purchasedData?.mains ?? [])];

  return (
    <Stack direction="column" spacing={8}>
      {/* <Navigationbar /> */}
      <Stack direction={"row"}>
        <Appbar />
        {/* <Stack sx={{ position: "fixed", overflow: "auto" }}>
          <Explorer />
        </Stack> */}
        <Stack
          sx={{ marginLeft: "40px", overflow: "auto", marginTop: "100px" }}
          direction={"row"}
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {
            isPurchasedLoading ? <h1>Loading...</h1> :
              allData.map((data) => (
                <Card
                  variant="outlined"
                  sx={{
                    // maxWidth: "400px",
                    width: "auto",
                    height: "300px",
                    minHeight: "300px",
                    textAlign: "center",
                    margin: "10px",
                    borderColor: "ButtonShadow",
                  }}
                >
                  <Grid direction={"column"} spacing={1}>
                    <Grid item>
                      <h2>{data.seriesDetails.title}</h2>
                      <p>{data.seriesDetails.description}</p>
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
                            justifyContent: "space-evenly"
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
                          <a href={`${process.env.REACT_APP_BASE_URL}/images/${data?.seriesName}/${data?.seriesDetails?.schedule}`}>
                            <Button variant="contained" color="primary">
                              Schedule
                            </Button>
                          </a>
                          <h4 style={{ paddingTop: "10px" }}>{data?.totalCount} Tests</h4>                          
                          <Stack>
                            <Button variant="contained" color="success">
                              <Link
                                to={"/ViewTest"}
                                state={{
                                  data: data.question,
                                  pSeriesId: data?._id
                                }}
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
      </Stack >
    </Stack >
  );
};
export default Purchasedtestseries;
