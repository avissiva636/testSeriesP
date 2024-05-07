import React, { useEffect, useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { useGetBatchesQuery, useGetCoursesQuery, useGetOutlinesQuery, useGetPseriesDesQuery, useGetSubjectsQuery, useUpdatePSeriesDesMutation } from 'state/apiDevelopmentSlice';
import InvisibleFileUploader from 'components/InvisibleFileUploader';

const EditPrelimsQpDes = () => {
    const isNonMobile = useOutletContext();

    const theme = useTheme();

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const pQDesId = decodeURIComponent(searchParams.get('id'));
    const pSeriesId = decodeURIComponent(searchParams.get('pSeriesId'));
    const title = decodeURIComponent(searchParams.get('title'));


    const [qpSeries, setQpSeries] = useState(title || '');
    const [qpOutline, setQpOutline] = useState('');
    const [qpTitle, setQpTitle] = useState('');
    const [qpDescription, setQpDescription] = useState('');
    const [course, setCourse] = useState('');
    const [batch, setBatch] = useState('');
    const [subject, setSubject] = useState('');
    const [nQuestions, setNQuestions] = useState('');
    const [noptions, setNOptions] = useState('');
    const [alottedTime, setAlottedTIme] = useState('');
    const [cMarks, setCMarks] = useState('');
    const [wMarks, setWMarks] = useState('');
    const [random, setRandom] = useState('');
    const [instructions, setInstructions] = useState('');
    const [selectedFile, setSelectedFile] = useState('');


    const { isLoading: isCourseLoading, data: courseData } = useGetCoursesQuery();
    const { isLoading: isBatchLoading, data: batchData } = useGetBatchesQuery();
    const { isLoading: isSubjectLoading, data: subjectData } = useGetSubjectsQuery();
    const { isLoading: isOutlineLoading, data: outlineData } = useGetOutlinesQuery();
    const { isLoading: isSpecificPdescLoading, data: sPDescData } = useGetPseriesDesQuery({ pDesId: pQDesId });
    const [updatePSeriesDes] = useUpdatePSeriesDesMutation();

    /* eslint-disable */
    useEffect(() => {
        const selectedOutline = !isOutlineLoading ? outlineData?.filter(dataChunk => dataChunk._id === qpOutline) : [];
        const selectedSpecificPDesc = !isSpecificPdescLoading ? sPDescData : null;

        if (selectedOutline.length > 0) {
            setQpTitle(selectedOutline[0].title);
            setQpDescription(selectedOutline[0].description);
            setCourse(selectedOutline[0].course);
            setBatch(selectedOutline[0].batch);
            setSubject(selectedOutline[0].subject);
            setNQuestions(selectedOutline[0].nQuestions);
            setNOptions(selectedOutline[0].nOptions);
            setAlottedTIme(selectedOutline[0].allottedTime);
            setCMarks(selectedOutline[0].cMarks);
            setWMarks(selectedOutline[0].wMarks);
            setRandom(selectedOutline[0].random);
            setInstructions(selectedOutline[0].instruction);
        }
        else if (selectedSpecificPDesc) {
            setQpTitle(selectedSpecificPDesc?.title || '');
            setQpDescription(selectedSpecificPDesc?.description || '');
            setCourse(selectedSpecificPDesc?.course || '');
            !isBatchLoading && setBatch(selectedSpecificPDesc?.batch || '');
            setSubject(selectedSpecificPDesc?.subject || '');
            setNQuestions(selectedSpecificPDesc?.nQuestions || '');
            setNOptions(selectedSpecificPDesc?.nOptions || '');
            setAlottedTIme(selectedSpecificPDesc?.alottedTime || '');
            setCMarks(selectedSpecificPDesc?.cMarks || '');
            setWMarks(selectedSpecificPDesc?.wMarks || '');
            setRandom(selectedSpecificPDesc?.random || '');
            setInstructions(selectedSpecificPDesc?.instruction || '');
        }
    },
        [qpOutline, sPDescData, batchData])

    const handleReset = () => {
        setQpOutline('');
        setQpSeries('');
        setQpTitle('');
        setQpDescription('');
        setCourse('');
        setBatch('');
        setSubject('');
        setNQuestions('');
        setNOptions('');
        setAlottedTIme('');
        setCMarks('');
        setWMarks('');
        setRandom('');
        setInstructions('');
        setSelectedFile('');
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {

        if (!pQDesId || !qpSeries || !qpTitle ||
            !qpDescription || !nQuestions ||
            !noptions || !alottedTime ||
            !cMarks ||
            !(wMarks !== null && wMarks !== undefined)) {
            alert("All fields are mandatory");
            return;
        }

        const formData = new FormData();
        formData.append('pSeries', pSeriesId);
        formData.append('series', qpSeries);
        formData.append('title', qpTitle);
        formData.append('description', qpDescription);
        formData.append('course', course);
        formData.append('batch', batch);
        formData.append('subject', subject);
        formData.append('nOptions', noptions);
        formData.append('nQuestions', nQuestions);
        formData.append('alottedTime', alottedTime);
        formData.append('cMarks', cMarks);
        formData.append('wMarks', wMarks);
        formData.append('random', random);
        formData.append('instruction', instructions);
        if (selectedFile) {
            formData.append('schedule', selectedFile);
        }

        try {
            await updatePSeriesDes({
                pDesId: pQDesId,
                updateFormData: formData
            }).unwrap()
                .then(() => {
                    const queryString = new URLSearchParams({
                        id: pSeriesId,
                        title: title,
                    }).toString();
                    navigate(`/list_prelims_qp_description?${queryString}`,
                        { replace: true });
                });
            // handleReset();

        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="ADD QUESTION" subtitle="Add Question Paper Details" />

            <Box m="1rem 2.5rem"
                component={'form'}
                sx={{
                    mt: isNonMobile ? undefined : '20%',
                    backgroundColor: theme.palette.background.alt
                }}>

                {/* series, outline */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Series`}</Typography>
                        <TextField
                            label={`series`}
                            fullWidth
                            onChange={(e) => setQpSeries(e.target.value)}
                            value={qpSeries}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                            disabled
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Outline</Typography>
                        <TextField
                            id="PQpoutline"
                            select
                            fullWidth
                            value={qpOutline}
                            onChange={(e) => setQpOutline(e.target.value)}
                            variant="standard"
                            children={
                                !isOutlineLoading && outlineData ? outlineData?.map((dataChunk) => (
                                    <MenuItem key={`PQpoutline${dataChunk._id}`} value={dataChunk._id}>
                                        {dataChunk.title}
                                    </MenuItem>
                                )) : <MenuItem value="">Select a Outline</MenuItem>
                            }
                        />

                    </Box>
                </FlexBetween>

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
                        onChange={(e) => setQpDescription(e.target.value)}
                        value={qpDescription}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>


                {/* Course Batch Subject*/}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Course</Typography>
                        <TextField
                            id="PQpCourse"
                            select
                            fullWidth
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            variant="standard"
                            children={
                                !isCourseLoading && courseData ? courseData?.map((dataChunk) => (
                                    <MenuItem key={`PQpcourse${dataChunk._id}`} value={dataChunk._id}>
                                        {dataChunk.name}
                                    </MenuItem>
                                )) : <MenuItem value="">Select a Course</MenuItem>
                            }
                        />

                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Batch</Typography>
                        <TextField
                            id="PQpBatch"
                            select
                            fullWidth
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            variant="standard"
                            children={
                                !isBatchLoading && batchData ? batchData?.map((dataChunk) => (
                                    <MenuItem key={`PQpbatch${dataChunk._id}`} value={dataChunk._id}>
                                        {dataChunk.name}
                                    </MenuItem>
                                )) : <MenuItem value="">Select a Batch</MenuItem>
                            }
                        />
                    </Box>

                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Subject</Typography>
                        <TextField
                            id="PQpSubject"
                            select
                            fullWidth
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            variant="standard"
                            children={
                                !isSubjectLoading && subjectData ? subjectData?.map((dataChunk) => (
                                    <MenuItem key={`PQpsubject${dataChunk._id}`} value={dataChunk._id}>
                                        {dataChunk.name}
                                    </MenuItem>
                                )) : <MenuItem value="">Select a Subject</MenuItem>
                            }
                        />
                    </Box>
                </FlexBetween>

                {/* nquestions noptions */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`No Of Questions`}</Typography>
                        <TextField
                            label={`nquestions`}
                            fullWidth
                            onChange={(e) => setNQuestions(e.target.value)}
                            value={nQuestions}
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
                                if ((!isNumericInput || nQuestions.length >= 1)) {
                                    if (e.key !== 'Backspace')
                                        e.preventDefault();
                                }
                            }}
                        />
                    </Box>

                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`nOptions`}</Typography>
                        <TextField
                            label={`nOptions`}
                            fullWidth
                            onChange={(e) => setNOptions(e.target.value)}
                            value={noptions}
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
                                if ((!isNumericInput || noptions.length >= 1)) {
                                    if (e.key !== 'Backspace')
                                        e.preventDefault();
                                }
                            }}
                        />
                    </Box>
                </FlexBetween>

                {/* TimeAllotted marksCrtAns */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Time Alotted`}</Typography>
                        <TextField
                            label={`Alotted Time`}
                            fullWidth
                            onChange={(e) => setAlottedTIme(e.target.value)}
                            value={alottedTime}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>

                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Correct Marks`}</Typography>
                        <TextField
                            label={`cMarks`}
                            fullWidth
                            onChange={(e) => setCMarks(e.target.value)}
                            value={cMarks}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                </FlexBetween>

                {/* mwrngans random */}
                <FlexBetween>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >{`Wrong Answer`}</Typography>
                        <TextField
                            label={`Wrong Answer`}
                            fullWidth
                            onChange={(e) => setWMarks(e.target.value)}
                            value={wMarks}
                            variant='standard'
                            InputProps={{ style: { fontSize: '20px' } }}
                        />
                    </Box>
                    <Box p={'1rem 2rem'} flexGrow={1}>
                        <Typography variant='h5' >Random</Typography>
                        <TextField
                            id="PQpRandom"
                            select
                            fullWidth
                            value={random}
                            onChange={(e) => setRandom(e.target.value)}
                            variant="standard"
                        >
                            <MenuItem key="Yes" value={"yes"}>
                                Yes
                            </MenuItem>
                            <MenuItem key="No" value={"no"}>
                                No
                            </MenuItem>
                        </TextField>
                    </Box>
                </FlexBetween>

                {/* Instructions */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Instructions`}</Typography>
                    <TextField
                        label={`Enter Instructions`}
                        fullWidth
                        onChange={(e) => setInstructions(e.target.value)}
                        value={instructions}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>

                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Explanation:`}</Typography>
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
                </Box>


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

export default EditPrelimsQpDes