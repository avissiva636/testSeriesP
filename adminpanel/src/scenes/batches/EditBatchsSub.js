import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header'
import React, { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Batch as batchData } from 'data';

const EditBatchsSub = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const [searchParams] = useSearchParams();
    // const id = searchParams.get('id');
    const iCourse = searchParams.get('course');
    const iBatch = searchParams.get('batch');
    const description = searchParams.get('description');

    console.log(iCourse)
    console.log(decodeURIComponent(iCourse))

    // const [course, setCourse] = useState(decodeURIComponent(iCourse));
    const [batch, setBatch] = useState(decodeURIComponent(iBatch));
    const [batchDes, setBatchDes] = useState(decodeURIComponent(description));

    const handleReset = () => {
        setBatch('');
        setBatchDes('');
    }

    const handleSubmit = () => {
        alert("button clicked");
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
                        defaultValue={decodeURIComponent(iCourse)}
                        variant="standard"
                    >
                        {batchData.map((batch) => (
                            <MenuItem key={batch.id} value={batch.course}>
                                {batch.course}
                            </MenuItem>
                        ))}
                    </TextField>
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

export default EditBatchsSub