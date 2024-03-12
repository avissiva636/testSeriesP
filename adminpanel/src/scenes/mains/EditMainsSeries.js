import { Box } from '@mui/material';
import AddPaperTemplate from 'components/AddPaperTemplate';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom';

const EditMainsSeries = () => {
    const isNonMobile = useOutletContext();
    const [searchParams] = useSearchParams();

    // const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    const [mains, setMains] = useState(decodeURIComponent(title));
    const [mainsDes, setMainsDes] = useState(decodeURIComponent(description));
    const [price, setPrice] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="MAINS" subtitle="Edit Mains" />

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

export default EditMainsSeries