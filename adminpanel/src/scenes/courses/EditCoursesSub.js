import { Box, useMediaQuery } from '@mui/material'
import Header from 'components/Header'
import TwoFieldEdit from 'components/TwoFieldEdit'
import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useUpdateCourseMutation } from 'state/apiDevelopmentSlice'

const EditCoursesSub = () => {
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    const [course, setCourse] = useState(decodeURIComponent(title));
    const [courseDes, setCourseDes] = useState(decodeURIComponent(description));
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();

    const [updateCourse] = useUpdateCourseMutation();
    // console.log(useLocation().state) courseId, updateCourseData

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const udpatedcourse = await updateCourse({ courseId: id, updateCourseData: { name: course, description: courseDes } }).unwrap();

            setCourse(udpatedcourse.name);
            setCourseDes(udpatedcourse.description);
            navigate('/listcourses', { replace: true });
        } catch (error) {
            console.log("errror", error);
            if (error.status === 400) {
                alert("Give proper data");
            }
        }

    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMediumScreens ? undefined : '80%'}>
            <Header title="COURSES" subtitle="Edit Course" />

            <TwoFieldEdit
                fieldName="Course" fieldId={id}
                field={course} setfield={setCourse}
                fieldDes={courseDes} setFieldDes={setCourseDes}
                isNonMediumScreens={isNonMediumScreens}
                handleUpdate={handleUpdate}
            />

        </Box>
    )
}

export default EditCoursesSub