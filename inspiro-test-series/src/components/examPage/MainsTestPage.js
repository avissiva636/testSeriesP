import React from 'react'
import { useLocation } from 'react-router-dom';

const MainsTestPage = () => {
    const location = useLocation();
    const questionDetails = location.state?.data;
    console.log(questionDetails)
    return (
        <div>MainsTestPage</div>
    )
}

export default MainsTestPage