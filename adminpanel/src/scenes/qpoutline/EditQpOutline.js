import React, { useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useOutletContext } from 'react-router-dom';

const EditQpOutline = () => {
    const isNonMobile = useOutletContext();

    const theme = useTheme();

    const [qpTitle, setQpTitle] = useState();
    const [qpDes, setQpDes] = useState();
    const [noOfOption, setNoOfOption] = useState();
    const [noOfQuestions, setNoOfQuestions] = useState();
    const [correctMark, SetCorrectMark] = useState();
    const [wrongMark, SetWrongMark] = useState();
    const [timeAllotted, setTimeAlotted] = useState();
    const [random, setRandom] = useState('Free');

    const [instruction, setInstruction] = useState();

    const [selectedCourse, SetSelectedCourse] = useState('Free');
    const [selectedBatch, SetSelectedBatch] = useState('Free');
    const [selectedSubject, SetSelectedSubject] = useState('Free');

    const handleReset = () => {
        setQpTitle('');
        setQpDes('');
        setNoOfOption('');
        setNoOfQuestions('');
        SetCorrectMark('');
        SetWrongMark('');
        setTimeAlotted('');
        setRandom('Free');

        setInstruction('');

        SetSelectedCourse('Free');
        SetSelectedBatch('Free');
        SetSelectedSubject('Free');
    }

    const handleSubmit = () => {
        alert("button clicked");
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="QUESTION PAPER OUTLINE" subtitle="Edit Question Paper Outline Details" />

            <Box m="1rem 2.5rem"
                component={'form'}
                sx={{
                    mt: isNonMobile ? undefined : '20%',
                    backgroundColor: theme.palette.background.alt
                }}>

                {/* Title */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Title`}</Typography>
                    <TextField
                        label={`Enter Title`}
                        fullWidth
                        onChange={(e) => setQpTitle(e.target.value)}
                        value={qpTitle}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>

                {/* Description */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Description`}</Typography>
                    <TextField
                        label={`Enter Description`}
                        fullWidth
                        onChange={(e) => setQpDes(e.target.value)}
                        value={qpDes}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>

                {/* Course Batch Subject */}
                <FlexBetween >
                    {/* Course */}
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Course</Typography>
                        <TextField
                            id="qpOutlineCourse"
                            select
                            fullWidth
                            value={selectedCourse}
                            onChange={(e) => SetSelectedCourse(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem key="Free" value={"Free"}>
                                Free
                            </MenuItem>
                            <MenuItem key="Paid" value={"Paid"}>
                                Paid
                            </MenuItem>
                        </TextField>
                    </Box>

                    {/* Batch */}
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Batch</Typography>
                        <TextField
                            id="qpOutlineBatch"
                            select
                            fullWidth
                            value={selectedBatch}
                            onChange={(e) => SetSelectedBatch(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem key="Free" value={"Free"}>
                                Free
                            </MenuItem>
                            <MenuItem key="Paid" value={"Paid"}>
                                Paid
                            </MenuItem>
                        </TextField>
                    </Box>

                    {/* Subject */}
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Subject</Typography>
                        <TextField
                            id="qpOutlineSubject"
                            select
                            fullWidth
                            value={selectedSubject}
                            onChange={(e) => SetSelectedSubject(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem key="Free" value={"Free"}>
                                Free
                            </MenuItem>
                            <MenuItem key="Paid" value={"Paid"}>
                                Paid
                            </MenuItem>
                        </TextField>
                    </Box>
                </FlexBetween>

                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`No Of Options`}</Typography>
                        <TextField
                            label={`Enter Total Options`}
                            fullWidth
                            onChange={(e) => setNoOfOption(e.target.value)}
                            value={noOfOption}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`No Of Questions`}</Typography>
                        <TextField
                            label={`Enter Total Questions`}
                            fullWidth
                            onChange={(e) => setNoOfQuestions(e.target.value)}
                            value={noOfQuestions}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                </FlexBetween>

                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Marks for correct answer`}</Typography>
                        <TextField
                            label={`Enter Mark`}
                            fullWidth
                            onChange={(e) => SetCorrectMark(e.target.value)}
                            value={correctMark}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Marks for wrong answer`}</Typography>
                        <TextField
                            label={`Enter Mark`}
                            fullWidth
                            onChange={(e) => SetWrongMark(e.target.value)}
                            value={wrongMark}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                </FlexBetween>

                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Time Allotted`}</Typography>
                        <TextField
                            label={`Time Allotted`}
                            fullWidth
                            onChange={(e) => setTimeAlotted(e.target.value)}
                            value={timeAllotted}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Random</Typography>
                        <TextField
                            id="qpOutlineRandom"
                            select
                            fullWidth
                            value={random}
                            onChange={(e) => setRandom(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem key="Free" value={"Free"}>
                                Free
                            </MenuItem>
                            <MenuItem key="Paid" value={"Paid"}>
                                Paid
                            </MenuItem>
                        </TextField>
                    </Box>
                </FlexBetween>

                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Instructions`}</Typography>
                    <TextField
                        label={`Instructions`}
                        multiline
                        fullWidth
                        onChange={(e) => setInstruction(e.target.value)}
                        value={instruction}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>

                <FlexBetween gap={'1rem'} py={'2rem'}>
                    <Button variant="contained"
                        size='large'
                        onClick={handleReset}
                        sx={{
                            ml: 'auto', width: '120px',
                            backgroundColor: theme.palette.neutral.main
                        }}>
                        Reset
                    </Button>

                    <Button variant="contained" color="success"
                        size='large'
                        onClick={handleSubmit}
                        sx={{ mr: '1rem', width: '120px' }}
                    >
                        Submit
                    </Button>
                </FlexBetween>

            </Box>


        </Box>
    )
}

export default EditQpOutline