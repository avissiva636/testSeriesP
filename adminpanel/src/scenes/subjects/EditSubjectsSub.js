import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldEdit from 'components/TwoFieldEdit'
import React, { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

const EditSubjectsSub = () => {
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');


    console.log(title, description)

    const [subject, setSubject] = useState(decodeURIComponent(title));
    const [subjectDes, setSubjectDes] = useState(decodeURIComponent(description));
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    console.log(useLocation().state)
    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens ? undefined : '80%'}>
            <Header title="SUBJECT" subtitle="Edit Subject" />

            <TwoFieldEdit
                fieldName="Subject" fieldId={id}
                field={subject} setfield={setSubject}
                fieldDes={subjectDes} setFieldDes={setSubjectDes}
                isNonMediumScreens={isNonMediumScreens}
            />

        </Box>
    )
}

export default EditSubjectsSub