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
import { useGetPurchasedSeriesQuery } from "../../state/apiDevelopmentSlice";

const DiscussionMainPage = () => {  
  const navigate = useNavigate();

  // const { isLoading: isPrelimsLoading, data: prelimsData } = useGetPrelimsSeriesQuery({ userId: "66279432cc5ed3267265fd5d" });
  // const { isLoading: isMainsLoading, data: mainsData } = useGetMainsSeriesQuery({ userId: "66279432cc5ed3267265fd5d" });
  const { isLoading: isPurchasedLoading, data: purchasedData } = useGetPurchasedSeriesQuery({ userId: "66279432cc5ed3267265fd5d" });

  const viewDetailsHandler = (title,id) => {
    navigate("/DiscussionCard", { state: { data: { title,id } } });
  };
  const downloadHandler = () => {

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
          isPurchasedLoading ? <h1>Loading...</h1> :
            purchasedData.prelims.map((data) => (
              data?.question.map((question)=>(
              <Card
                variant="outlined"
                sx={{
                  width: "100vh",
                  minHeight: purchasedData.prelims.length < 2 ? "380px" : "auto",
                  height: purchasedData.prelims.length < 2 ? "200px" : "auto",
                  textAlign: "center",
                  margin: "10px",
                  borderColor: "ButtonShadow",
                  marginTop: "100px"
                }}
              >
                <Grid sx={{ marginTop: "10px" }}>
                  <Stack direction={"column"}>
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
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
                            <TableCell>Subject</TableCell>
                            <TableCell>No of questions</TableCell>
                            <TableCell>Time Alloted</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{question.subject}</TableCell>
                            <TableCell>{question.nQuestions}</TableCell>
                            <TableCell>{question.alottedTime}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack sx={{ alignItems: "center", margin: "10px" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ width: "auto" }}
                      onClick={() => viewDetailsHandler(question.title,question._id)}
                    >
                      Start Discussion
                    </Button>
                  </Stack>
                </Grid>
              </Card>))
            ))}

        {
          isPurchasedLoading ? <h1>Loading...</h1> :
            purchasedData.mains.map((data) => (
              data?.question.map((question)=>(
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
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
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
                            <TableCell>Subject</TableCell>
                            {/* <TableCell>No of questions</TableCell> */}
                            <TableCell>Time Alloted</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{question.subject}</TableCell>
                            {/* <TableCell>{question.nQuestions}</TableCell> */}
                            <TableCell>{question.alottedTime}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack sx={{ alignItems: "center", margin: "10px" }}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ width: "auto" }}
                      onClick={() => downloadHandler(data.title)}
                    >
                      Download PDF
                    </Button>
                  </Stack>
                </Grid>
              </Card>))
            ))}
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
};
export default DiscussionMainPage;
