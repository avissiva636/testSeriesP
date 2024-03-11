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
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import { useNavigate } from "react-router-dom";
import { useInspiroCrud } from "../context/InspiroContext";
import Appbar from "../homepage/Appbar";

const DiscussionMainPage = () => {
  const { discussionCardDetailsPrelims, discussionCardDetailsMains } = useInspiroCrud();
  const navigate = useNavigate();

  const viewDetailsHandler = (title) => {
    navigate("/DiscussionCard", { state: { data: { title } } });
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
          {discussionCardDetailsPrelims.qPaper.map((data) => (
            <Card
              variant="outlined"
              sx={{
                width: "100vh",
                minHeight: discussionCardDetailsPrelims.qPaper.length < 2 ? "380px" : "auto",
                height: discussionCardDetailsPrelims.qPaper.length < 2 ? "200px" : "auto",
                textAlign: "center",
                margin: "10px",
                borderColor: "ButtonShadow",
                marginTop:"100px"
              }}
            >
              <Grid sx={{ marginTop: "10px" }}>
                <Stack direction={"column"}>
                  <h2>{data.title}</h2>
                  <p>{data.description}</p>
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
                          <TableCell>{data.subject}</TableCell>
                          <TableCell>{data.nQuestions}</TableCell>
                          <TableCell>{data.timeAlloted}</TableCell>
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
                    onClick={() => viewDetailsHandler(data.title)}
                  >
                    Start Discussion
                  </Button>
                </Stack>
              </Grid>
            </Card>
          ))}

{discussionCardDetailsMains.qPaper.map((data) => (
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
                  <h2>{data.title}</h2>
                  <p>{data.description}</p>
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
                          <TableCell>{data.subject}</TableCell>
                          <TableCell>{data.nQuestions}</TableCell>
                          <TableCell>{data.timeAlloted}</TableCell>
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
            </Card>
          ))}
        </Stack>
      {/* </Stack> */}
    </Stack>
  );
};
export default DiscussionMainPage;
