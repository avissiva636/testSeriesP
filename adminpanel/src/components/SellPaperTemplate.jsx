import React, { useEffect, useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import { useOutletContext } from 'react-router-dom';
import { useGetAllStudentsQuery } from 'state/apiDevelopmentSlice';

const SellPaperTemplate = ({ isSeriesLoading, seriesData, handleSubmit }) => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    // const { isLoading, data: courseData } = useGetCoursesQuery();
    // const { isLoading: isSeriesLoading, data: seriesData } = useGetPSeriesesQuery();
    const { isLoading: isAllStudents, data: studentList } = useGetAllStudentsQuery();

    const [student, setStudent] = useState('');
    const [series, setSeries] = useState('');
    const [price, setPrice] = useState("");

    const [seriesName, setSeriesName] = useState('')
    const [studentName, setStudentName] = useState('');

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleReset = () => {
        setStudent('');
        setSeries('');
        setSeriesName('');
        setPrice('');
    }

    useEffect(() => {
        if (!isSeriesLoading && seriesData) {
            const seriesSpecificSeries = seriesData.find(seriesSpecificData => seriesSpecificData._id === series);
            setPrice(seriesSpecificSeries?.price || '')
            setSeriesName(seriesSpecificSeries?.title || '')
        }
        // eslint-disable-next-line  
    }, [series])


    useEffect(() => {
        if (!isAllStudents && studentList) {
            const allStudent = studentList.find(specificStudent => specificStudent._id === student);
            setStudentName(allStudent?.name || '')
        }
        // eslint-disable-next-line  
    }, [student])

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
                    children={
                        !isAllStudents && studentList ? studentList?.map((dataChunk) => (
                            <MenuItem key={`prelimStudents${dataChunk._id}`} value={dataChunk._id}>
                                {dataChunk.name}
                            </MenuItem>
                        )) : <MenuItem value="">Select a Student</MenuItem>
                    }
                />

            </Box>

            <Box p={'1rem 2rem'} mt={'2rem'}>
                <Typography variant='h4' >Series:</Typography>
                <TextField
                    id="prelimsSeries"
                    select
                    fullWidth
                    value={series}
                    onChange={(e) => setSeries(e.target.value)
                    }
                    variant="standard"
                    children={
                        !isSeriesLoading && seriesData ? seriesData?.map((pSeries) => (
                            <MenuItem key={pSeries._id} value={pSeries._id} >
                                {pSeries.title}
                            </MenuItem>
                        )) : <MenuItem value="">Select a Series</MenuItem>
                    }
                />
            </Box>

            <Box p={'1rem 2rem'}>
                <Typography variant='h4' >Price:</Typography>
                <TextField
                    label={`Price`}
                    fullWidth
                    disabled
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
                    disabled={buttonDisabled}
                    onClick={() => handleSubmit(price, series, seriesName, student, studentName, handleReset, setButtonDisabled)}
                    sx={{ mr: '1rem', width: '120px' }}
                >
                    Submit
                </Button>
            </FlexBetween>

        </Box>
    )
}

export default SellPaperTemplate