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
import { useInspiroCrud } from "../context/InspiroContext";
import { useNavigate } from "react-router-dom";

const ProgressCardMain = () => {
  const { progressCardDetails } = useInspiroCrud();
  const navigate = useNavigate();

  const viewResultHandler = () => {
    navigate("/ProgressCard");
  };
  return (
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      <Stack direction="row" spacing={4} sx={{ backgroundColor: "#fafafa" }}>
        <Stack sx={{ position: "", overflow: "auto" }}>
          <Explorer />
        </Stack>
        <Stack>
          {progressCardDetails.qPaper.map((data) => (
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
                          <TableCell>No of questions</TableCell>
                          <TableCell>Correct Answers</TableCell>
                          <TableCell>Wrong Answers</TableCell>
                          <TableCell>Marks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{data.nQuestions}</TableCell>
                          <TableCell>{data.cAnswer}</TableCell>
                          <TableCell>{data.wAnswer}</TableCell>
                          <TableCell>{data.Marks}</TableCell>
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
                    onClick={viewResultHandler}
                  >
                    View Result
                  </Button>
                </Stack>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default ProgressCardMain;
