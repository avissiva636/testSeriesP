import {
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import BackButton from "../homepage/BackButton";

const InstructionPage = () => {

  const location = useLocation();
  const questionDetails = location.state?.data;
  const archiveQuestions = location.state?.archiveQuestions;
  
  return (
    <Stack>
      <Stack direction="column" spacing={8}>
        <Navigationbar />
        <Stack direction={"row"} sx={{ backgroundColor: "#fafafa" }}>
          <Stack sx={{ position: "fixed", overflow: "auto" }}>
            <Explorer />
          </Stack>
          <Stack sx={{ marginLeft: "300px" }} direction={"row"}>
            <Card
              direction={"column"}
              sx={{
                width: "90%", // 90% of the viewport width
                maxWidth: "400%", // Maximum width for larger screens
                minHeight: "250px",
                height: "auto",
                textAlign: "center",
                margin: "10px auto",
                padding: "20px",
                borderColor: "ButtonShadow",
              }}
            >
              <Grid direction={"column"}>
                <Grid item>
                  <h2>{questionDetails.title}</h2>
                  <p>{questionDetails.description}</p>
                </Grid>
                <Grid>
                  <TableContainer
                    component={Paper}
                    style={{ overflowX: "auto" }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <b>Subject</b>
                          </TableCell>
                          <TableCell>
                            <b>no.of question</b>
                          </TableCell>
                          <TableCell>
                            <b>Time Allocated</b>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ alignItems: "center" }}>
                          <TableCell>{questionDetails.subject}</TableCell>
                          <TableCell>{questionDetails.nQuestion}</TableCell>
                          <TableCell>{questionDetails.time}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <p>{questionDetails.instruction}</p>
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
                      <BackButton />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="success">
                        <Link
                          to={"/TestPage"}
                          state={{
                            data: questionDetails, archiveQuestions: archiveQuestions,
                          }}
                          style={{ textDecoration: "none", color: "#ffffff" }}
                        >
                          Start Exam
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default InstructionPage;
