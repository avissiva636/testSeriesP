import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
// import Navigationbar from "../homepage/Navigationbar";
// import Explorer from "../homepage/Explorer";
import { Link, useLocation } from "react-router-dom";
import Appbar from "../homepage/Appbar";
import { useGetPrelimAttemptQuery } from "../../state/apiDevelopmentSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../state/stateSlice";

const ViewTest = () => {
  const location = useLocation();
  const questionDetails = location.state?.data;
  const seriesName = location.state?.seriesName;
  const pSeriesId = location.state?.pSeriesId;
  const currentUserId = useSelector(selectCurrentUserId);

  const { isLoading: isAttempLoading, data: attemptData } = useGetPrelimAttemptQuery({
    userId: currentUserId,
    seriesId: pSeriesId
  })

  const excludeIds = new Set(attemptData
    ?.psQuestionDescription
    ?.map(desc => desc.questionDescriptionId)
  );
  const filteredQuestionDetails = questionDetails.filter(item => !excludeIds.has(item._id));

  return (
    <Stack>
      <Stack direction="row" spacing={8}>
        {/* <Navigationbar />
        <Stack direction={"row"} sx={{ backgroundColor: "#fafafa" }}>
          <Stack sx={{ position: "fixed", overflow: "auto" }}>
            <Explorer />
          </Stack> */}
        <Appbar />
        <Stack
          sx={{ marginLeft: "280px" }}
          direction={"row"}
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {
            isAttempLoading ? <h1>Loading...</h1> :
              filteredQuestionDetails.map((data) => (
                <Card
                  direction={"column"}
                  sx={{
                    width: "500px",
                    minHeight: filteredQuestionDetails.length < 3 ? "300px" : "auto",
                    height: filteredQuestionDetails.length < 3 ? "200px" : "auto",
                    textAlign: "center",
                    margin: "10px",
                    borderColor: "ButtonShadow",
                    marginTop: "100px",
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
                          <p>{data.nQuestions}</p>
                        </Stack>
                        <Stack>
                          <h4 style={{ marginBottom: "0rem" }}>Time Allocated</h4>
                          <p>{data.alottedTime}</p>
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
                              state={{ data: data,
                                seriesName
                               }}
                              style={{ textDecoration: "none", color: "#ffffff" }}
                            >
                              Start Exam
                            </Link>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography>Attempt: 0/2</Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Card>
              ))}
        </Stack>
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
};
export default ViewTest;
