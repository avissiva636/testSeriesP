import React, { useState } from 'react'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useCreateMSeriesDesMutation } from 'state/apiDevelopmentSlice';
import InvisibleFileUploader from 'components/InvisibleFileUploader';
import JodithEditor from 'components/JodithEditor';

const AddMainsQpDes = () => {
    const isNonMobile = useOutletContext();

    const theme = useTheme();
    const [searchParams] = useSearchParams();

    const mQDesId = decodeURIComponent(searchParams.get('id'));
    const title = decodeURIComponent(searchParams.get('title'));

    const [qpTitle, setQpTitle] = useState('');
    const [qpDescription, setQpDescription] = useState('');
    const [alottedTime, setAlottedTIme] = useState('');
    const [instructions, setInstructions] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    //Jodith Editor
    const [content, setContent] = useState('');

    const [createMSeriesDes] = useCreateMSeriesDesMutation();

    const handleReset = () => {
        setQpTitle('');
        setQpDescription('');
        setAlottedTIme('');
        setInstructions('');
        setSelectedFile('');
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {

        if (!mQDesId || !title || !qpTitle || !qpDescription ||
            !alottedTime || !instructions || !selectedFile) {
            alert("All fields are mandatory");
            return;
        }

        const formData = new FormData();
        formData.append('mSeries', mQDesId);
        formData.append('series', title);
        formData.append('title', qpTitle);
        formData.append('description', qpDescription);
        formData.append('alottedTime', alottedTime);
        formData.append('instruction', instructions);
        formData.append('question', content);
        formData.append('schedule', selectedFile);

        try {
            await createMSeriesDes(formData).unwrap();
            handleReset();
        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="ADD QUESTION" subtitle="Add Question Paper Details" isNavigate={true} />

            <Box m="1rem 2.5rem"
                component={'form'}
                sx={{
                    mt: isNonMobile ? undefined : '20%',
                    backgroundColor: theme.palette.background.alt
                }}>

                {/* series*/}
                <Box p={'1rem 2rem'} flexGrow={1}>
                    <Typography variant='h5' >{`Series`}</Typography>
                    <TextField
                        label={`series`}
                        fullWidth
                        value={title}
                        variant='standard'
                        InputProps={{ style: { fontSize: '20px' } }}
                        disabled
                    />
                </Box>

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


                {/* TimeAllotted */}
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

                {/* Question */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Question`}</Typography>
                    <Box
                        sx={{
                            "& .jodit-toolbar__box": {
                                backgroundColor: `${theme.palette.background.default} !important`,
                            },
                            "& .jodit-container": {
                                // backgroundColor: 'red',
                                borderColor: `${theme.palette.background.default}`
                            },
                            "& .jodit-container .jodit-workplace": {
                                backgroundColor: `${theme.palette.background.alt}`,
                            },
                            "& .jodit-status-bar": {
                                backgroundColor: `${theme.palette.background.default}`,
                                color: `${theme.palette.primary[200]}`
                            },
                            "& .jodit-workplace+ .jodit-status-bar": {
                                borderTop: `1px solid ${theme.palette.background.default}`
                            },
                            "& .jodit-status-bar .jodit-status-bar__item a": {
                                display: 'none'
                            },
                        }}
                    >
                        <JodithEditor content={content} setContent={setContent} />
                    </Box>
                </Box>

                {/* explanation or schedule */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Explantion:`}</Typography>
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


        </Box >
    )
}

export default AddMainsQpDes