import { Button, Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import PieChart from "./PieChart";
import VerticalTable from "./VerticalTable";
import { useNavigate } from "react-router-dom";

const ProgressCard = () => {
  const navigate = useNavigate();
    const data = {
        totalQuestions: 50,
        unAttended: 10,
        questionsWrong: 10,
        questionsCorrect: 30,
        marks: 75,
      };
      const data1 = [
        { qno: 1, result: 'correct', difficulty: 'easy' },
        { qno: 2, result: 'wrong', difficulty: 'medium' },
        { qno: 3, result: 'correct', difficulty: 'hard' },
        // Add more data entries as needed
      ];
      const exitHandler = () => {
        navigate("/")
      }
  return (
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      <Stack direction={"row"} spacing={35} sx={{ backgroundColor: "#fafafa" }}>
        <Stack sx={{ position: "fixed", overflow: "auto" }}>
          <Explorer />
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <Stack>
            <Card sx={{ height: "100vh", width: "88vh" }}>
              <Stack sx={{ alignItems: "center" }}>
                <h1>Exam Title</h1>
              </Stack>
              <Stack spacing={2}>
              <Stack sx={{margin:"0px 40px 0px 40px"}}>
              <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Total Questions
            </TableCell>
            <TableCell align="right">{data.totalQuestions}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Questions unattended
            </TableCell>
            <TableCell align="right">{data.unAttended}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Questions Wrong
            </TableCell>
            <TableCell align="right">{data.questionsWrong}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Questions Correct
            </TableCell>
            <TableCell align="right">{data.questionsCorrect}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Marks
            </TableCell>
            <TableCell align="right">{data.marks}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
              </Stack>
              <Stack>
                <VerticalTable data={data1}/>
              </Stack>
              <Stack sx={{alignItems:"center"}} ><Button color="success" variant="contained" sx={{width:"10px"}} onClick={exitHandler}>Exit</Button></Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack>
            <Card sx={{ height: "100vh", width: "50vh", position: "fixed" }}>
              <PieChart data={data} />
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default ProgressCard;
