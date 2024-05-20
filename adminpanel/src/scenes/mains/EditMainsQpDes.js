import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { useCreateMSeriesDesMutation, useGetMseriesDesQuery, useGetPseriesDesQuery, useGetSubjectsQuery, useUpdateMSeriesDesMutation } from 'state/apiDevelopmentSlice';
import InvisibleFileUploader from 'components/InvisibleFileUploader';
import JodithEditor from 'components/JodithEditor';

const EditMainsQpDes = () => {
    const isNonMobile = useOutletContext();

    const theme = useTheme();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const mQDesId = decodeURIComponent(searchParams.get('id'));
    const mSeriesId = decodeURIComponent(searchParams.get('mSeriesId'));
    const title = decodeURIComponent(searchParams.get('title'));

    const [qpTitle, setQpTitle] = useState('');
    const [qpDescription, setQpDescription] = useState('');
    const [alottedTime, setAlottedTIme] = useState('');
    const [instructions, setInstructions] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    //Jodith Editor
    const [content, setContent] = useState('');

    const { isLoading: isSpecificMdescLoading, data: mPDescData } = useGetMseriesDesQuery({ mDesId: mQDesId });
    const [updateMSeriesDes] = useUpdateMSeriesDesMutation();

    // mSeries, series,
    //  title, description,
    //     alottedTime, instruction, question
    useEffect(() => {
        const selectedSpecificMDesc = !isSpecificMdescLoading ? mPDescData : null;
        if (selectedSpecificMDesc) {
            setQpTitle(selectedSpecificMDesc?.title || '');
            setQpDescription(selectedSpecificMDesc?.description || '');
            setAlottedTIme(selectedSpecificMDesc?.alottedTime || '');
            setInstructions(selectedSpecificMDesc?.instruction || '');
            setContent(selectedSpecificMDesc?.question || '');
        }
    }, [mPDescData])

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

    const handleUpdate = async () => {

        if (!mQDesId || !title || !qpTitle || !qpDescription ||
            !alottedTime || !instructions) {
            alert("All fields are mandatory");
            return;
        }

        const formData = new FormData();
        formData.append('mSeries', mSeriesId);
        formData.append('series', title);
        formData.append('title', qpTitle);
        formData.append('description', qpDescription);
        formData.append('alottedTime', alottedTime);
        formData.append('instruction', instructions);
        formData.append('question', content);
        if (selectedFile) {
            formData.append('schedule', selectedFile);
        }

        try {
            await updateMSeriesDes({
                mDesId: mQDesId,
                updateFormData: formData
            }).unwrap()
                .then(() => {
                    const queryString = new URLSearchParams({
                        id: mSeriesId,
                        title: title,
                    }).toString();
                    navigate(`/list_mains_qp_description?${queryString}`,
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
            <Header title="EDIT QUESTION" subtitle="Edit Question Paper Details" isNavigate={true} />

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
                        onClick={handleUpdate}
                        sx={{ mr: '1rem', width: '120px' }}
                    >
                        Update
                    </Button>
                </FlexBetween>

            </Box>


        </Box >
    )
}

export default EditMainsQpDes
