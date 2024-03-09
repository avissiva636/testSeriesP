import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldSubmition from 'components/TwoFieldSubmition'
import React, { useState } from 'react'

const AddSubjects = () => {
    const [subject, setSubject] = useState('');
    const [subjectDes, setSubjectDes] = useState('');
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens?undefined:'80%'}>
            <Header title="SUBJECT" subtitle="Add New Subject" />

            <TwoFieldSubmition 
                subject={subject} setSubject={setSubject}
                subjectDes={subjectDes} setSubjectDes={setSubjectDes}                
                isNonMediumScreens={isNonMediumScreens}
            />

        </Box>
    )
}

export default AddSubjects