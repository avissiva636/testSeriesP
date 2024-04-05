import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBetween';

const TwoFieldSubmition = ({ fieldName, field, setfield, fieldDes, setFieldDes, isNonMediumScreens,handleSubmit }) => {
  const theme = useTheme();

  const handleReset = () => {
    setfield('');
    setFieldDes('');
  }

  return (
    <Box m="3rem 2.5rem"
      component={'form'}
      sx={{
        mt: isNonMediumScreens ? undefined : '20%',
        backgroundColor: theme.palette.background.alt
      }}>
      <Box p={'1rem 2rem'}>
        <Typography variant='h4' >{fieldName} Name:</Typography>
        <TextField
          label={`Enter ${fieldName} Name`}
          fullWidth
          onChange={(e) => setfield(e.target.value)}
          value={field}
          variant='standard'
          sx={{ mt: "1rem", mb: "0.5rem" }}
          InputProps={{ style: { fontSize: '20px' } }}
        />
      </Box>

      <Box p={'1rem 2rem'}>
        <Typography variant='h4' >{fieldName} Description:</Typography>
        <TextField
          label={`Enter ${fieldName} Description`}
          fullWidth
          onChange={(e) => setFieldDes(e.target.value)}
          value={fieldDes}
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