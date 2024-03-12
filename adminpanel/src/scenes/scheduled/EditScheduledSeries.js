import { Box } from '@mui/material';
import AddPaperTemplate from 'components/AddPaperTemplate';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom';

const EditScheduledSeries = () => {
    const isNonMobile = useOutletContext();
    const [searchParams] = useSearchParams();

    // const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');
    console.log(title,description)

    const [scheduled, setScheduled] = useState(decodeURIComponent(title));
    const [scheduledDes, setScheduledDes] = useState(decodeURIComponent(description));
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

export default EditScheduledSeries