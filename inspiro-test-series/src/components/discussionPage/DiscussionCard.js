import { Button, Card, Stack, Typography } from "@mui/material";
import Navigationbar from "../homepage/Navigationbar";
import Explorer from "../homepage/Explorer";
import { useInspiroCrud } from "../context/InspiroContext";
import { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";

const DiscussionCard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { prelimsAnswers } = useInspiroCrud();
  const question = prelimsAnswers.Answer[currentQuestionIndex];
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const title = location.state?.data?.title;
  const optionLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const handleClear = () => {
    // setSelectedOption((prevSelectedOptions) => ({
    //   ...prevSelectedOptions,
    //   [question.qno]: "",
    // }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < prelimsAnswers.Answer.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  return (
    <Stack direction="column" spacing={8}>
      <Navigationbar />
      <Stack direction="row" spacing={4} sx={{ backgroundColor: "#fafafa" }}>
        <Stack sx={{ position: "", overflow: "" }}>
          <Explorer />
        </Stack>
        <Stack>
          <Card>
            <Stack>
              <Card>
                <Stack
                  sx={{
                    textAlign: "center",
                    justifyContent: "space-evenly",
                    color: "blue",
                    fontSize: "34px",
                  }}
                >
                  {title} | Discussion
                </Stack>
              </Card>
            </Stack>
            <Stack direction={"row"} spacing={0}>
              <Stack sx={{ width: "70%" }}>
                <Card>
                  <Stack sx={{ margin: "10px" }}>
                    <Card>
                      <Stack
                        direction={"row"}
                        sx={{
                          textAlign: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Stack>
                          <h4>
                            Question: {currentQuestionIndex + 1}/
                            {prelimsAnswers.Answer.length}
                          </h4>
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>
                  <Stack sx={{ margin: "10px" }}>
                    <Card>
                      <Stack sx={{ margin: "5px 15px", minHeight: "500px" }}>
                        <Typography variant="h6" sx={{ fontSize: "15px" }}>
                          {question.qno}. {question.question}
                        </Typography>
                        {Object.keys(question.options).map(
                          (optionKey, index) => (
                            <Stack
                              key={optionKey}
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ cursor: "pointer" }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  paddingLeft: "50px",
                                  paddingTop: "10px",
                                  color:
                                    index + 1 === question.cOption
                                      ? "red"
                                      : "inherit",
                                }}
                              >
                                {optionLetters[index]}.{" "}
                                {question.options[optionKey]}
                              </Typography>
                            </Stack>
                          )
                        )}
                        <Stack>
                          <Typography>
                            <Stack sx={{ color: "#7F27FF" }}>
                              <h4>Explanation:</h4>
                            </Stack>
                            <Stack>{question.explanation}</Stack>
                          </Typography>
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>
                  <Stack sx={{ margin: "10px" }}>
                    <Card>
                      <Stack
                        direction={"row"}
                        sx={{ justifyContent: "space-evenly", margin: "10px" }}
                      >
                        <Stack>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#0A1D56" }}
                            onClick={handleClear}
                          >
                            Download PDF
                          </Button>
                        </Stack>
                        <Stack
                          direction={"row"}
                          spacing={8}
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Stack>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "#1B1A55" }}
                              onClick={handlePreviousQuestion}
                            >
                              <ArrowBackIcon />
                              Previous
                            </Button>
                          </Stack>
                          <Stack>
                            {" "}
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "#6C22A6" }}
                              onClick={handleNextQuestion}
                            >
                              Next
                              <ArrowForwardIcon />
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>
                </Card>
              </Stack>
              <Stack sx={{ width: "30%" }}>
                <Stack sx={{ margin: "0px" }}>
                  <Card>
                    <Stack
                      direction="row"
                      sx={{
                        minHeight: "505px",
                        margin: "20px",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                      }}
                    >
                      {prelimsAnswers.Answer.map((question, index) => (
                        <div
                          key={index + 1}
                          style={{
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            padding: "8px",
                            margin: "5px",
                            width: "10px",
                            height: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                              currentQuestionIndex === index
                                ? "#6C22A6"
                                : markedQuestions.includes(question.qno)
                                ? "red"
                                : "transparent",
                            color:
                              currentQuestionIndex === index
                                ? "#fff"
                                : markedQuestions.includes(question.qno)
                                ? "#fff"
                                : "#000",
                          }}
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          {question.qno}
                        </div>
                      ))}
                    </Stack>
                  </Card>
                </Stack>
                <Stack sx={{ alignItems: "center", marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "100px" }}
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default DiscussionCard;
