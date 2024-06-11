import React from 'react'
import { Button, Card, Stack, Typography } from "@mui/material";
import TestPageNav from "./TestPageNav";
import { useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { useEffect, useState } from "react";
import { useSubmitMainsQuestionMutation } from "../../state/apiDevelopmentSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../state/stateSlice";
import InvisibleFileUploader from './InvisibleFileUploader';

const MainsTestPage = () => {
    const location = useLocation();
    const testDetails = location.state?.data;
    const currentUserId = useSelector(selectCurrentUserId)
    const seriesId = location.state?.seriesId;
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();
    const [mainsQuestion] = useSubmitMainsQuestionMutation();

    const [timeLeft, setTimeLeft] = useState(testDetails.alottedTime * 60);

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
    },  // eslint-disable-next-line
        []);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('uid', currentUserId);
        formData.append('mSeries', seriesId);
        formData.append('mqDesc', testDetails?._id);
        formData.append('mainsAnswer', selectedFile);

        // if (!selectedFile) {
        //     alert("Please attach file");
        //     return;
        // }

        const confirmation = window.confirm("Are you sure you want to submit?");
        if (confirmation) {
            try {
                await mainsQuestion({
                    formData
                }).unwrap()
                    .then(() => {
                        navigate("/PurchasedTestSeries", {
                            replace: true
                        });
                    });
            }
            catch (error) {
                if (error.status === 400) {
                    alert("Give proper data");
                }
            }
        }
    };

    return (
        <Stack>
            <Stack spacing={9} direction={"column"}>
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
                                            <Stack sx={{ margin: "5px 15px", minHeight: "500px" }}>
                                                {/* <Typography variant="h6">
                                                    {testDetails?.question}
                                                </Typography> */}
                                                <Typography variant="h6" component="div" dangerouslySetInnerHTML={{ __html: testDetails?.question }} />
                                            </Stack>
                                        </Card>
                                    </Stack>

                                </Card>
                            </Stack>
                            <Stack sx={{ width: "30%" }}>
                                <Stack sx={{ margin: "10px" }}>
                                    <Card>
                                        <Button
                                            // disabled={isQuestionLoading}
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

                                <Stack sx={{ margin: "10px" }}>
                                    <Card>
                                        <Button
                                            component="label"
                                            role={'Schedule File Upload Button'}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload file
                                            <InvisibleFileUploader type="file" onChange={handleFileChange} />
                                        </Button>
                                        {selectedFile && selectedFile.name}
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
export default MainsTestPage;
