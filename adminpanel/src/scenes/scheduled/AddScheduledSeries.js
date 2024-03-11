import { Box } from '@mui/material';
import AddPaperTemplate from 'components/AddPaperTemplate';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

const AddScheduledSeries = () => {
    const isNonMobile = useOutletContext();

    const [scheduled, setScheduled] = useState('');
    const [scheduledDes, setScheduledDes] = useState('');
    const [price, setPrice] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="SCHEDULED" subtitle="Add New Scheduled" />

            <AddPaperTemplate
                isNonMobile={isNonMobile} seriesName="Scheduled"
                series={scheduled} setSeries={setScheduled}
                seriesDes={scheduledDes} setSeriesDes={setScheduledDes}
                seriesPrice={price} setSeriesPrice={setPrice}
                seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
            />

        </Box>
    )
}

export default AddScheduledSeries