import React, { useState } from 'react'
import { Box, Button, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InvisibleFileUploader from './InvisibleFileUploader';
import FlexBetween from 'components/FlexBetween';


const AddPaperTemplate = ({ isNonMobile, seriesName,
    series, setSeries,
    seriesDes, setSeriesDes,
    seriesPrice, setSeriesPrice,
    seriesPaymentLink, setSeriesPaymentLink }) => {
    const theme = useTheme();

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedValue, setSelectedValue] = useState('Free');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleReset = () => {
        setSeries('');
        setSeriesDes('');
        setSeriesPrice('');
        setSeriesPaymentLink('');
        setSelectedFile(null);
        setSelectedValue('Free')
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

            <Box p={'1rem 2rem'}>
                <Typography variant='h5' >{`Title:`}</Typography>
                <TextField
                    label={`Enter ${seriesName} Title`}
                    fullWidth
                    onChange={(e) => setSeries(e.target.value)}
                    value={series}
                    variant='standard'
                    InputProps={{ style: { fontSize: '20px' } }}
                />
            </Box>

            <Box p={'1rem 2rem'}>
                <Typography variant='h5' >{`Description:`}</Typography>
                <TextField
                    label={`Enter ${seriesName} Description`}
                    fullWidth
                    onChange={(e) => setSeriesDes(e.target.value)}
                    value={seriesDes}
                    variant='standard'
                    InputProps={{ style: { fontSize: '20px' } }}
                />
            </Box>

            <Box p={'1rem 2rem'}>
                <Typography variant='h5' >Course:</Typography>
                <TextField
                    id="batchCourse"
                    select
                    fullWidth
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
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

            <Box p={'1rem 2rem'}>
                <Typography variant='h5' >{`price:`}</Typography>
                <TextField
                    label={`Enter ${seriesName} Price`}
                    fullWidth
                    onChange={(e) => setSeriesPrice(e.target.value)}
                    value={seriesPrice}
                    variant='standard'
                    InputProps={{ style: { fontSize: '20px' } }}
                />
            </Box>

            <Box p={'1rem 2rem'}>
                <Typography variant='h5' >{`Schedule:`}</Typography>
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

            <Box p={'1rem 2rem'}>
                <Typography variant='h5' >{`Payment Link:`}</Typography>
                <TextField
                    label={`Give Payment Link:`}
                    fullWidth
                    onChange={(e) => setSeriesPaymentLink(e.target.value)}
                    value={seriesPaymentLink}
                    variant='standard'
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

export default AddPaperTemplate