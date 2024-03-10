import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldSubmition from 'components/TwoFieldSubmition'
import React, { useState } from 'react'

const AddCourses = () => {
    const [course, setCourse] = useState('');
    const [courseDes, setCourseDes] = useState('');

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens ? undefined : '80%'}>
            <Header title="COURSE" subtitle="Add New COURSE" />

            <TwoFieldSubmition
                fieldName="Course"
                field={course} setfield={setCourse}
                fieldDes={courseDes} setFieldDes={setCourseDes}
                isNonMediumScreens={isNonMediumScreens}
            />

        </Box>
    )
}

export default AddCourses