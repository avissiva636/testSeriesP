import { Box } from '@mui/material';
import AddPaperTemplate from 'components/AddPaperTemplate';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

const AddMainsSeries = () => {
    const isNonMobile = useOutletContext();

    const [mains, setMains] = useState('');
    const [mainsDes, setMainsDes] = useState('');
    const [price, setPrice] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="MAINS" subtitle="Add New Mains" />

            <AddPaperTemplate
                isNonMobile={isNonMobile} seriesName="Mains"
                series={mains} setSeries={setMains}
                seriesDes={mainsDes} setSeriesDes={setMainsDes}
                seriesPrice={price} setSeriesPrice={setPrice}
                seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
            />

        </Box>
    )
}

export default AddMainsSeries