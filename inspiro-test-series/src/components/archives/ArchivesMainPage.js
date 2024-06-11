import { Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
// import Navigationbar from "../homepage/Navigationbar";
// import Explorer from "../homepage/Explorer";
import { Link } from "react-router-dom";
import Appbar from "../homepage/Appbar";
import { useGetArchiveAttemptQuery, useGetArchiveMainsAttemptQuery, useGetArchivesQuery } from "../../state/apiDevelopmentSlice";
import { selectCurrentUserId } from "../../state/stateSlice";
import { useSelector } from "react-redux";

const ArchivesMainPage = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  const { isLoading: isArchivesLoading, data: archivesData } = useGetArchivesQuery({ userId: currentUserId })
  const { isLoading: isArchiveAttemptLoading, data: archiveAttemptData } = useGetArchiveAttemptQuery({
    userId: currentUserId,
  })

  const { isLoading: isArchiveMAttemptLoading, data: archiveMainsAttempt } = useGetArchiveMainsAttemptQuery({
    userId: currentUserId,
  })

  const includeIds = new Set(archiveAttemptData
    ?.psQuestionDescription
    ?.map(desc => desc.questionDescId)
  );

  const includeMainsIds = new Set(archiveMainsAttempt
    ?.msQuestionDescription
    ?.map(desc => desc.questionDescId)
  )

  const filteredArchiveData = !isArchivesLoading ? archivesData?.prelims.filter(item => {
    return includeIds.has(item?.seriesDesc?._id)
  }) : [];

  const filteredMainsArchiveData = !isArchivesLoading ? archivesData?.mains
    ?.filter(item => {
      return includeMainsIds.has(item?.seriesDesc?._id)
    }) : []

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
            isArchivesLoading || isArchiveAttemptLoading ? <h1>Loading...</h1> :
              filteredArchiveData?.map((data) => (
                <Card
                  direction={"column"}
                  sx={{
                    width: "500px",
                    minHeight: filteredArchiveData.length < 3 ? "300px" : "auto",
                    height: filteredArchiveData.length < 3 ? "200px" : "auto",
                    textAlign: "center",
                    margin: "10px",
                    borderColor: "ButtonShadow",
                    marginTop: "100px"
                  }}
                >

                  <Grid direction={"column"}>
                    <Grid item>
                      <h2>{data.seriesDesc?.title}</h2>
                      <p>{data.seriesDesc?.description}</p>
                    </Grid>
                    <Grid>
                      <Stack direction={"row"} justifyContent={"space-evenly"}>
                        <Stack direction={"column"}>
                          <h4 style={{ marginBottom: "0rem" }}>Subject</h4>
                          <p>{data?.seriesDesc?.subject}</p>
                        </Stack>
                        <Stack>
                          <h4 style={{ marginBottom: "0rem" }}>no.of question</h4>
                          <p>{data.seriesDesc?.nQuestions}</p>
                        </Stack>
                        <Stack>
                          <h4 style={{ marginBottom: "0rem" }}>Time Allocated</h4>
                          <p>{data.seriesDesc?.alottedTime}</p>
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
                              state={{
                                data: data?.seriesDesc,
                                seriesName: "prelims",
                              }}
                              style={{ textDecoration: "none", color: "#ffffff" }}
                            >
                              Start Exam
                            </Link>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography>Attempt: 1/2</Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Card>
              ))
          }
          {
            isArchivesLoading || isArchiveMAttemptLoading ? <h1>Loading...</h1> :
              filteredMainsArchiveData?.map((data) => (
                <Card
                  direction={"column"}
                  sx={{
                    width: "500px",
                    minHeight: filteredMainsArchiveData.length < 3 ? "300px" : "auto",
                    height: filteredMainsArchiveData.length < 3 ? "200px" : "auto",
                    textAlign: "center",
                    margin: "10px",
                    borderColor: "ButtonShadow",
                    marginTop: "100px"
                  }}
                >
                  <Grid direction={"column"}>
                    <Grid item>
                      <h2>{data.seriesDesc?.title}</h2>
                      <p>{data.seriesDesc?.description}</p>
                    </Grid>
                    <Grid>
                      <Stack direction={"row"} justifyContent={"space-evenly"}>
                        <Stack direction={"column"}>
                          <h4 style={{ marginBottom: "0rem" }}>Subject</h4>
                          <p>{data?.seriesDesc?.subject}</p>
                        </Stack>
                        <Stack>
                          <h4 style={{ marginBottom: "0rem" }}>Time Allocated</h4>
                          <p>{data.seriesDesc?.alottedTime}</p>
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
                              state={{
                                data: data?.seriesDesc,
                                seriesName: "mains",
                                seriesId: data?.seriesId
                              }}
                              style={{ textDecoration: "none", color: "#ffffff" }}
                            >
                              Start Exam
                            </Link>
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography>Attempt: 1/2</Typography>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                </Card>
              ))
          }
        </Stack>
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
};
export default ArchivesMainPage;
