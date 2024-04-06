import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldSubmition from 'components/TwoFieldSubmition'
import React, { useState } from 'react'
import { useCreateCourseMutation } from 'state/apiDevelopmentSlice'

const AddCourses = () => {
    const [course, setCourse] = useState('');
    const [courseDes, setCourseDes] = useState('');
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const [createCourse] = useCreateCourseMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCourse({ name: course, description: courseDes }).unwrap();
            setCourse('');
            setCourseDes('');

        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens ? undefined : '80%'}>
            <Header title="COURSE" subtitle="Add New COURSE" />

            <TwoFieldSubmition
                fieldName="Course"
                field={course} setfield={setCourse}
                fieldDes={courseDes} setFieldDes={setCourseDes}
                isNonMediumScreens={isNonMediumScreens}
                handleSubmit={handleSubmit}
            />

        </Box>
    )
}

export default AddCourses