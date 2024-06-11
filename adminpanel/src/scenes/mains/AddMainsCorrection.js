import React, { useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { useUpdateMainCorrectMutation } from 'state/apiDevelopmentSlice';
import InvisibleFileUploader from 'components/InvisibleFileUploader';


const AddMainsCorrection = () => {
    const isNonMobile = useOutletContext();
    const navigate = useNavigate();

    const theme = useTheme();
    const [searchParams] = useSearchParams();

    const mQDesId = decodeURIComponent(searchParams.get('id'));
    const title = decodeURIComponent(searchParams.get('title'));
    const description = decodeURIComponent(searchParams.get('description'));
    const userName = decodeURIComponent(searchParams.get('userName'));
    const userId = decodeURIComponent(searchParams.get('userId'));
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const [selectedFile, setSelectedFile] = useState('');

    const [updateMainCorrect] = useUpdateMainCorrectMutation();

    const handleReset = () => {
        setSelectedFile('');
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("All fields are mandatory");
            return;
        }
        setIsSubmitDisabled(true);
        const formData = new FormData();
        formData.append('schedule', selectedFile);
        formData.append("mQDesId", mQDesId);

        try {
            await updateMainCorrect({ userId, formData }).unwrap();
            handleReset();
            navigate(-1);
        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
        finally {
            setIsSubmitDisabled(false);
        }
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="MAINS" subtitle="Mains Submission" isNavigate={true} />

            <Box m="1rem 2.5rem"
                component={'form'}
                sx={{
                    mt: isNonMobile ? undefined : '20%',
                    backgroundColor: theme.palette.background.alt
                }}>

                {/* Title */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Title : ${title}`}</Typography>
                </Box>

                {/* Description */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Description : ${description}`}</Typography>
                </Box>

                {/* Student */}
                <Box p={'1rem 2rem'}>
                    <Typography variant='h5' >{`Student :   ${userName}`}</Typography>
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
                        disabled={isSubmitDisabled}
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

export default AddMainsCorrection