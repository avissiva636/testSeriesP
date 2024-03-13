import React, { useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useOutletContext } from 'react-router-dom';
import { subject as subjectData } from 'data';

const AddStudents = () => {
    const isNonMobile = useOutletContext();

    const theme = useTheme();

    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [sex, setSex] = useState('Male');
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [course, setCourse] = useState();
    const [batch, setBatch] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [telephone, setTelephone] = useState();
    const [status, setStatus] = useState();


    const handleReset = () => {
        setName('');
        setAge('');
        setSex('Male');
        setUserName('');
        setPassword('');
        setCourse('');
        setBatch('');
        setEmail('')
        setStatus('');
        setMobile('');
        setTelephone('');
    }

    const handleSubmit = () => {
        alert("button clicked");
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="ADD STUDENTS" subtitle="Add Students Details" />

            <Box m="1rem 2.5rem"
                component={'form'}
                sx={{
                    mt: isNonMobile ? undefined : '20%',
                    backgroundColor: theme.palette.background.alt
                }}>

                {/* Name */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Name`}</Typography>
                    <TextField
                        label={`Enter Name`}
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>

                {/* Age Sex */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Age`}</Typography>
                        <TextField
                            label={`Age`}
                            fullWidth
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Sex</Typography>
                        <TextField
                            id="studentSex"
                            select
                            fullWidth
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem key="Male" value={"Male"}>
                                Male
                            </MenuItem>
                            <MenuItem key="Female" value={"Female"}>
                                Female
                            </MenuItem>
                        </TextField>
                    </Box>
                </FlexBetween>

                {/* Username Password */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Username`}</Typography>
                        <TextField
                            label={`Enter Username`}
                            fullWidth
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Password`}</Typography>
                        <TextField
                            label={`Enter Password`}
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                </FlexBetween>

                {/* Course Batch */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Course</Typography>
                        <TextField
                            id="studentCourse"
                            select
                            fullWidth
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            variant="standard"
                        >
                            {subjectData.map((dataChunk) => (
                                <MenuItem key={`course${dataChunk.id}`} value={dataChunk.title}>
                                    {dataChunk.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Batch</Typography>
                        <TextField
                            id="studentBatch"
                            select
                            fullWidth
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            variant="standard"
                        >
                            {subjectData.map((dataChunk) => (
                                <MenuItem key={`batch${dataChunk.id}`} value={dataChunk.title}>
                                    {dataChunk.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </FlexBetween>

                {/* EmailId */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`EmailId`}</Typography>
                        <TextField
                            label={`Enter EmailId`}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>

                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Status</Typography>
                        <TextField
                            id="studentStatus"
                            select
                            fullWidth
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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

                {/* Mobile Telephone */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Mobile`}</Typography>
                        <TextField
                            label={`Enter Mobile`}
                            fullWidth
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Telephone`}</Typography>
                        <TextField
                            label={`Enter Telephone`}
                            fullWidth
                            onChange={(e) => setTelephone(e.target.value)}
                            value={telephone}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                </FlexBetween>

                {/* Reset Submit */}
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

export default AddStudents