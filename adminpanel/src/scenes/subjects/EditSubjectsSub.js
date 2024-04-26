import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldEdit from 'components/TwoFieldEdit'
import React, { useState } from 'react'
import {  useSearchParams,useNavigate } from 'react-router-dom'
import { useUpdateSubjectMutation } from 'state/apiDevelopmentSlice'

const EditSubjectsSub = () => {
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    const [subject, setSubject] = useState(decodeURIComponent(title));
    const [subjectDes, setSubjectDes] = useState(decodeURIComponent(description));
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();

    const [updateSubject] = useUpdateSubjectMutation();
    // console.log(useLocation().state)

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {            
            const udpatedsubject = await updateSubject({ subjectId: id, updateSubjectData: { name: subject, description: subjectDes } }).unwrap();
 
            setSubject(udpatedsubject.name);
            setSubjectDes(udpatedsubject.description);
            navigate('/listsubjects', { replace: true });
        } catch (error) {
            console.log("errror", error);
            if (error.status === 400) {
                alert("Give proper data");
            }
        }

    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens ? undefined : '80%'}>
            <Header title="SUBJECT" subtitle="Edit Subject" />

            <TwoFieldEdit
                fieldName="Subject" fieldId={id}
                field={subject} setfield={setSubject}
                fieldDes={subjectDes} setFieldDes={setSubjectDes}
                isNonMediumScreens={isNonMediumScreens}
                handleUpdate={handleUpdate}
            />

        </Box>
    )
}

export default EditSubjectsSub