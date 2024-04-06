import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldSubmition from 'components/TwoFieldSubmition'
import React, { useState } from 'react'
import { useCreateSubjectMutation } from 'state/apiDevelopmentSlice'

const AddSubjects = () => {
    const [subject, setSubject] = useState('');
    const [subjectDes, setSubjectDes] = useState('');
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const [createSubject] = useCreateSubjectMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createSubject({ name: subject, description: subjectDes }).unwrap();
            setSubject('');
            setSubjectDes('');
            
        } catch (error) {
            if(error.status===400){
                alert("Give proper data");
            }                        
        }
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens ? undefined : '80%'}>
            <Header title="SUBJECT" subtitle="Add New Subject" />

            <TwoFieldSubmition
                fieldName="Subject"
                field={subject} setfield={setSubject}
                fieldDes={subjectDes} setFieldDes={setSubjectDes}
                isNonMediumScreens={isNonMediumScreens}
                handleSubmit={handleSubmit}
            />

        </Box>
    )
}

export default AddSubjects