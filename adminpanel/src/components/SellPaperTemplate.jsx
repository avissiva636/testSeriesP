import React, { useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import { useOutletContext } from 'react-router-dom';
import { subject as courseData } from 'data';

const SellPaperTemplate = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const [student, setStudent] = useState(courseData[0].title);
    const [series, setSeries] = useState(courseData[1].title);
    const [price, setPrice] = useState("somedata");

    const handleReset = () => {
        setStudent(courseData[0].title);
        setSeries(courseData[1].title);
    }

    const handleSubmit = () => {
        alert("button clicked");
    }

    return (
        <Box m="1rem 2.5rem"
            component={'form'}
            sx={{
                mt: isNonMobile ? undefined : '20%',
                backgroundColor: theme.palette.background.alt
            }}>
            <Box p={'1rem 2rem'} mt={'2rem'}>
                <Typography variant='h4' >User/Student:</Typography>
                <TextField
                    id="prelimsStudents"
                    select
                    fullWidth
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                    variant="standard"
                >
                    {courseData.map((course) => (
                        <MenuItem key={course.id} value={course.title}>
                            {course.title}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box p={'1rem 2rem'} mt={'2rem'}>
                <Typography variant='h4' >Series:</Typography>
                <TextField
                    id="prelimsSeries"
                    select
                    fullWidth
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    variant="standard"
                >
                    {courseData.map((course) => (
                        <MenuItem key={course.id} value={course.title}>
                            {course.title}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box p={'1rem 2rem'}>
                <Typography variant='h4' >Price:</Typography>
                <TextField
                    label={`Price`}
                    fullWidth
                    disabled
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    variant='outlined'
                    sx={{ mt: "1rem", mb: "0.5rem" }}
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
    )
}

export default SellPaperTemplate