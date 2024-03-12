import React from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import { PrelimsList as prelimsData } from 'data'
import { useOutletContext } from 'react-router-dom';

const ListScheduledSeries = () => {
    const isNonMobile = useOutletContext();

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="SCHEDULED" subtitle="List Scheduled" />

            <ListPaperTemplate paperName="scheduled" paperData={prelimsData} />

        </Box>
    )
}

export default ListScheduledSeries