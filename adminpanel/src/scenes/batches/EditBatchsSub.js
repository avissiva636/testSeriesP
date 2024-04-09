import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header'
import React, { useState } from 'react'
import { useOutletContext, useSearchParams, useNavigate } from 'react-router-dom';
// import { subject as batchData } from 'data';
import { useGetCoursesQuery, useUpdateBatchMutation } from 'state/apiDevelopmentSlice';

const EditBatchsSub = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const iCourse = searchParams.get('course');
    const iBatch = searchParams.get('batch');
    const description = searchParams.get('description');

    // const [course, setCourse] = useState(decodeURIComponent(iCourse));
    const [batch, setBatch] = useState(decodeURIComponent(iBatch));
    const [batchDes, setBatchDes] = useState(decodeURIComponent(description));
    const [selectedCourse, setSelectedCourse] = useState(decodeURIComponent(iCourse));
    const navigate = useNavigate();

    const [updateBatch] = useUpdateBatchMutation();
    const { isLoading, data: courseData } = useGetCoursesQuery();

    const handleReset = () => {
        setBatch('');
        setBatchDes('');
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedBatch = await updateBatch({ batchId: id, updateBatchData: { course: selectedCourse, name: batch, description: batchDes } }).unwrap();

            setBatch(updatedBatch.name);
            setBatchDes(updatedBatch.description);
            navigate('/listbatches', { replace: true });
        } catch (error) {
            console.log("errror", error);
            if (error.status === 400) {
                alert("Give proper data");
            }
        }

    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="BATCH" subtitle="Edit BATCH" />

            <Box m="1rem 2.5rem"
                component={'form'}
                sx={{
                    mt: isNonMobile ? undefined : '20%',
                    backgroundColor: theme.palette.background.alt
                }}>
                <Box p={'1rem 2rem'} mt={'2rem'}>
                    <Typography variant='h4' >Course:</Typography>
                    <TextField
                        id="batchCourse"
                        select
                        fullWidth
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        defaultValue={decodeURIComponent(iCourse)}
                        variant="standard"
                        children={
                            !isLoading ? courseData && courseData.map((course) => (
                                <MenuItem key={course._id} value={course._id}>
                                    {course.name}
                                </MenuItem>
                            )) : <MenuItem value="">Select a course</MenuItem>
                        }
                    />
                </Box>

                <Box p={'1rem 2rem'}>
                    <Typography variant='h4' >Batch Name:</Typography>
                    <TextField
                        label={`Enter Batch Name`}
                        fullWidth
                        onChange={(e) => setBatch(e.target.value)}
                        value={batch}
                        variant='standard'
                        sx={{ mt: "1rem", mb: "0.5rem" }}
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>

                <Box p={'1rem 2rem'}>
                    <Typography variant='h4' >Batch Description:</Typography>
                    <TextField
                        label={`Enter Batch Description`}
                        fullWidth
                        onChange={(e) => setBatchDes(e.target.value)}
                        value={batchDes}
                        variant='standard'
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
                        onClick={handleUpdate}
                        sx={{ mr: '1rem', width: '120px' }}
                    >
                        Submit
                    </Button>
                </FlexBetween>

            </Box>
        </Box>
    )
}

export default EditBatchsSub