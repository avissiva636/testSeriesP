import {
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Appbar from "../homepage/Appbar";
import { useGetProgressMainsResultsQuery, useGetProgressPrelimResultsQuery } from "../../state/apiDevelopmentSlice";
import { selectCurrentUserId } from "../../state/stateSlice";
import { useSelector } from "react-redux";

const ProgressCardMain = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  const { isLoading: isProgressprelimsLoading, data: progressPrelimsData } = useGetProgressPrelimResultsQuery({ userId: currentUserId });
  const { isLoading: isProgressMainsLoading, data: progressMainsData } = useGetProgressMainsResultsQuery({ userId: currentUserId });

  const navigate = useNavigate();

  const viewResultHandler = (data) => {    
    navigate("/ProgressCard", {
      state: { Progress: data }
    });
  };
  const downloadHandler = (correctedAnswer) => {
    console.log(correctedAnswer);
  }
  return (
    <Stack direction="row" spacing={8}>
      {/* <Navigationbar />
      <Stack direction="row" spacing={4} sx={{ backgroundColor: "#fafafa" }}>
        <Stack sx={{ position: "", overflow: "auto" }}>
          <Explorer />
        </Stack> */}
      <Appbar />
      <Stack>
        {
          isProgressprelimsLoading ? <h1>Loading...</h1> :
            progressPrelimsData?.prelimResult.map((data) => (
              <Card
                variant="outlined"
                sx={{
                  width: "100vh",
                  minHeight: progressPrelimsData.prelimResult.length < 2 ? "380px" : "auto",
                  height: progressPrelimsData.prelimResult.length < 2 ? "200px" : "auto",
                  textAlign: "center",
                  margin: "10px",
                  borderColor: "ButtonShadow",
                  marginTop: "100px"
                }}
              >
                <Grid sx={{ marginTop: "10px" }}>
                  <Stack direction={"column"}>
                    <h2>{data.questionDescriptionId.title}</h2>
                    <p>{data.questionDescriptionId.description}</p>
                  </Stack>
                </Grid>
                <Grid>
                  <Stack>
                    <TableContainer
                      component={Paper}
                      sx={{ margin: "10px", width: "auto" }}
                    >
                      <Table
                        sx={{
                          border: "0.5px solid",
                          borderColor: "ButtonShadow",
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>No of questions</TableCell>
                            <TableCell>Correct Answers</TableCell>
                            <TableCell>Wrong Answers</TableCell>
                            <TableCell>Marks</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{data.questionDescriptionId.nQuestions}</TableCell>
                            <TableCell>{data.correctCount}</TableCell>
                            <TableCell>{data.questionDescriptionId.nQuestions - data.correctCount}</TableCell>
                            <TableCell>{
                              (data.correctCount * data.questionDescriptionId.cMarks) -
                              ((data.submitCount - data.correctCount) * data.questionDescriptionId.wMarks)
                            }</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack sx={{ alignItems: "center", margin: "10px" }}>
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ width: "auto" }}
                      onClick={() => viewResultHandler(data)}
                    >
                      View Result
                    </Button>
                  </Stack>
                </Grid>
              </Card>
            ))}

        {
          isProgressMainsLoading ? <h1>Loading...</h1> :
            progressMainsData?.mainResult.map((data) => (
              <Card
                variant="outlined"
                sx={{
                  width: "100vh",
                  minHeight: "200px",
                  height: "auto",
                  textAlign: "center",
                  margin: "10px",
                  borderColor: "ButtonShadow",
                }}
              >
                <Grid sx={{ marginTop: "10px" }}>
                  <Stack direction={"column"}>
                    <h2>{data.questionDescriptionId.title}</h2>
                    <p>{data.questionDescriptionId.description}</p>
                  </Stack>
                </Grid>
                <Grid>
                  <Stack>
                    <TableContainer
                      component={Paper}
                      sx={{ margin: "10px", width: "auto" }}
                    >
                      <Table
                        sx={{
                          border: "0.5px solid",
                          borderColor: "ButtonShadow",
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>No of questions</TableCell>
                            <TableCell>Correct Answers</TableCell>
                            <TableCell>Wrong Answers</TableCell>
                            <TableCell>Marks</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{data?.nQuestions}</TableCell>
                            <TableCell>{data?.cAnswer}</TableCell>
                            <TableCell>{data?.wAnswer}</TableCell>
                            <TableCell>{data?.Marks}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack sx={{ alignItems: "center", margin: "10px" }}>
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ width: "auto" }}
                      onClick={() => downloadHandler(data?.correctedAnswer)}
                    >
                      Download Result
                    </Button>
                  </Stack>
                </Grid>
              </Card>
            ))}

      </Stack>
      {/* </Stack> */}
    </Stack>
  );
};
export default ProgressCardMain;
