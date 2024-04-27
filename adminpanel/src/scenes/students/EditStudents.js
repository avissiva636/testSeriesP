import { useTheme } from '@emotion/react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
// import { subject as subjectData } from 'data';
import { useGetBatchesQuery, useGetCoursesQuery, useGetStudentQuery, useUpdateStudentMutation } from 'state/apiDevelopmentSlice';

const EditStudents = () => {
    const isNonMobile = useOutletContext();
    const [searchParams] = useSearchParams();

    const urlUserId = searchParams.get('userId');

    const theme = useTheme();
    const navigate = useNavigate();

    const { isLoading: isCourseLoading, data: courseData } = useGetCoursesQuery();
    const { isLoading: isBatchLoading, data: batchData } = useGetBatchesQuery();
    const { isLoading: isStudentLoading, data: studentList } = useGetStudentQuery({
        sid: decodeURIComponent(urlUserId),
    });
    const [updateStudent] = useUpdateStudentMutation();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('Male');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState('');
    const [batch, setBatch] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [telephone, setTelephone] = useState('');
    const [status, setStatus] = useState('pending');

    useEffect(() => {

        if (!isStudentLoading && studentList) {
            // console.log(studentList.course.name)
            // console.log(studentList.batch.name)
            setName(studentList.name);
            setAge(studentList.age);
            setSex(studentList.sex);
            setUserName(studentList.userName);
            setCourse(studentList?.course || '');
            setBatch(studentList?.batch || '');
            setEmail(studentList.email);
            setMobile(studentList.mobile);
            setTelephone(studentList.telephone);
            setStatus(studentList.status);
        }
    }, [isStudentLoading, studentList]);



    const handleReset = () => {
        setName('');
        setAge('');
        setSex('Male');
        setUserName('');
        setPassword('');
        setCourse('');
        setBatch('');
        setEmail('')
        setStatus('pending');
        setMobile('');
        setTelephone('');
    }

    const handleUpdate = async () => {

        if (!name || !age || !sex || !userName ||
            !email || !mobile || !status) {
            alert("All fields are mandatory");
            return;
        }
        try {
            await updateStudent({ studentId: decodeURIComponent(urlUserId), updateStudentData: { name, age, sex, userName, password, course, batch, email, mobile, telephone, status } }).unwrap();
            handleReset();
            navigate('/liststudents', { replace: true });
        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }

    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="STUDENTS" subtitle="Edit Students" />

            {isStudentLoading ? <p>Loading...</p> :
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
                                onKeyDown={(e) => {
                                    // Allow only numeric input
                                    const isNumericInput = ((e.key >= '0' && e.key <= '9') ||
                                        e.key === 'Backspace' ||
                                        e.key === 'Delete' ||
                                        e.key === 'ArrowLeft' ||
                                        e.key === 'ArrowRight' ||
                                        e.key === 'Home' ||
                                        e.key === 'End'
                                    );
                                    if (!isNumericInput) {
                                        e.preventDefault();
                                    }
                                }}
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
                                <MenuItem key="Others" value={"Others"}>
                                    Others
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
                                children={
                                    !isCourseLoading && courseData ? courseData?.map((dataChunk) => (
                                        <MenuItem key={`course${dataChunk._id}`} value={dataChunk._id}>
                                            {dataChunk.name}
                                        </MenuItem>
                                    )) : <MenuItem value="">Select a Course</MenuItem>
                                }
                            />
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
                                children={
                                    !isBatchLoading && batchData ? batchData?.map((dataChunk) => (
                                        <MenuItem key={`batch${dataChunk._id}`} value={dataChunk._id}>
                                            {dataChunk.name}
                                        </MenuItem>
                                    )) : <MenuItem value="">Select a Batch</MenuItem>
                                }
                            />
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
                                <MenuItem key="pending" value={"pending"}>
                                    Pending
                                </MenuItem>
                                <MenuItem key="approved" value={"approved"}>
                                    Approved
                                </MenuItem>
                                <MenuItem key="reject" value={"reject"}>
                                    Reject
                                </MenuItem>
                                <MenuItem key="lock" value={"lock"}>
                                    Lock
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
                            disabled={isStudentLoading}
                            onClick={handleReset}
                            sx={{
                                ml: 'auto', width: '120px',
                                backgroundColor: theme.palette.neutral.main
                            }}>
                            Reset
                        </Button>

                        <Button variant="contained" color="success"
                            size='large'
                            disabled={isStudentLoading}
                            onClick={handleUpdate}
                            sx={{ mr: '1rem', width: '120px' }}
                        >
                            Update
                        </Button>
                    </FlexBetween>

                </Box>
            }
        </Box>
    )
}

export default EditStudents