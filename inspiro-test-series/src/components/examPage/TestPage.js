import { Button, Card, Stack, Typography } from "@mui/material";
import TestPageNav from "./TestPageNav";
import { useLocation, useNavigate } from "react-router-dom";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useEffect, useState } from "react";
import { useGetPrelimsQuestionQuery } from "../../state/apiDevelopmentSlice";

const TestPage = () => {
  const location = useLocation();
  const testDetails = location.state?.data;

  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const prelimsQuestions = archiveQuestions;

  const { isLoading: isQuestionLoading, data: prelimsQuestionData } = useGetPrelimsQuestionQuery({ qNo: testDetails?._id });

  const question = !isQuestionLoading ? prelimsQuestionData?.questions[currentQuestionIndex] : "";
  const option = !isQuestionLoading ? prelimsQuestionData?.questions[currentQuestionIndex]?.options : {
    "option1": "",
    "option2": "",
    "option3": "",
    "option4": ""
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(testDetails.alottedTime * 60); // Convert minutes to seconds

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTimeLeft) => {
  //       if (prevTimeLeft === 0) {
  //         clearInterval(timer);
  //         handleSubmit();
  //         return 0;
  //       }
  //       return prevTimeLeft - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  useEffect(() => {
    // Function to update timeLeft every second
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer); // Stop the timer when time runs out
          handleSubmit();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleMarkForReview = (questionNumber) => {
    if (markedQuestions.includes(questionNumber)) {
      setMarkedQuestions(
        markedQuestions.filter((num) => num !== questionNumber)
      );
    } else {
      setMarkedQuestions([...markedQuestions, questionNumber]);
    }
  };

  const handleOptionSelect = (optionKey) => {
    setSelectedOption((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question?.sno]: optionKey,
    }));
  };

  const handleClear = () => {
    setSelectedOption((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [question?.sno]: "",
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < prelimsQuestionData?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const confirmation = window.confirm("Are you sure you want to submit?");
    if (confirmation) {
      navigate("/ProgressCard", { replace: true });
    } else {
      console.log("selectedOption", selectedOption)
    }
  };

  return (
    <Stack>
      <Stack spacing={9} direction={"column"}>
        {" "}
        //includes nav bar & below section
        <Stack>
          <TestPageNav title={testDetails.title} />
        </Stack>
        <Stack>
          <Card>
            <Stack direction={"row"} spacing={0}>
              <Stack sx={{ width: "70%" }}>
                {" "}
                {/*contains 2 main cards left questions, right q.no. */}
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
                            {prelimsQuestionData?.questions.length}
                          </h4>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          onClick={() => {
                            toggleMarkForReview(question?.sno);
                          }}
                        >
                          <Stack>
                            {markedQuestions.includes(question?.sno) ? ( // Conditionally render CheckBoxIcon
                              <CheckBoxIcon />
                            ) : (
                              <CheckBoxOutlineBlankIcon />
                            )}
                          </Stack>
                          <Stack>
                            <h4 style={{ margin: 0 }}>Mark for review</h4>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Card>
                  </Stack>

                  <Stack sx={{ margin: "10px" }}>
                    <Card>
                      <Stack sx={{ margin: "5px 15px", minHeight: "500px" }}>
                        <Typography variant="h6">
                          {question?.question}
                        </Typography>
                        {!isQuestionLoading && Object.keys(option).map((optionKey, index) => (
                          <Stack
                            key={optionKey}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            onClick={() => handleOptionSelect(optionKey)}
                            sx={{ cursor: "pointer" }}
                          >
                            {selectedOption[question?.sno] === optionKey ? (
                              <RadioButtonCheckedIcon color="primary" />
                            ) : (
                              <RadioButtonUncheckedIcon color="disabled" />
                            )}
                            <Typography>{option[optionKey]}</Typography>
                          </Stack>
                        ))}
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
                            Clear
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
                <Stack sx={{ margin: "10px" }}>
                  <Card>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ width: "100%", height: "100%" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Card>
                </Stack>
                <Stack sx={{ margin: "10px" }}>
                  <Card>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: "100%", height: "100%" }}
                    >
                      Time Left: {minutes.toString().padStart(2, "0")}:
                      {seconds.toString().padStart(2, "0")}
                    </Button>
                  </Card>
                </Stack>
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
                      {
                        isQuestionLoading ? <h1>Loading...</h1> :
                          prelimsQuestionData.questions.map((question, index) => (
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
                                    ? "#6C22A6" // Purple for currently displayed question
                                    : markedQuestions.includes(question.sno)
                                      ? "red" // Background color red if question is marked for review
                                      : selectedOption[question.sno]
                                        ? "#65B741" // Green if question is selected
                                        : "transparent",
                                color:
                                  currentQuestionIndex === index
                                    ? "#fff" // White text color for currently displayed question
                                    : markedQuestions.includes(question.sno) ||
                                      selectedOption[question.sno]
                                      ? "#fff" // White text color if question is marked or selected
                                      : "#000", // Black text color for default
                              }}
                              onClick={() => setCurrentQuestionIndex(index)}
                            >
                              {question.sno}
                            </div>
                          ))}
                    </Stack>
                  </Card>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default TestPage;
