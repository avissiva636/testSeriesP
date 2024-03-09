import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBetween';

const TwoFieldSubmition = ({ subject, setSubject, subjectDes, setSubjectDes, isNonMediumScreens }) => {
  const theme = useTheme();

  const handleReset = ()=>{
    setSubject('');
    setSubjectDes('');
  }

  const handleSubmit = ()=>{
    alert("button clicked");
  }

  return (
    <Box m="3rem 2.5rem"
      component={'form'}
      sx={{
        mt: isNonMediumScreens ? undefined : '20%',
        backgroundColor: theme.palette.background.alt
      }}>
      <Box p={'1rem 2rem'}>
        <Typography variant='h4' >Subject Name:</Typography>
        <TextField
          label="Enter Subject Name"
          fullWidth
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          variant='standard'
          sx={{ mt: "1rem", mb: "0.5rem" }}
          InputProps={{ style: { fontSize: '20px' } }}
        />
      </Box>

      <Box p={'1rem 2rem'}>
        <Typography variant='h4' >Subject Description:</Typography>
        <TextField
          label="Enter Subject Description"
          fullWidth
          onChange={(e) => setSubjectDes(e.target.value)}
          value={subjectDes}
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

  )
}

export default TwoFieldSubmition