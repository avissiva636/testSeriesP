import { Box } from '@mui/material'

import Header from 'components/Header'
import React, { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom';
import AddPaperTemplate from 'components/AddPaperTemplate';

const EditPrelimsSeries = () => {
    const isNonMobile = useOutletContext();
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');

    const [prelims, setPrelims] = useState(decodeURIComponent(title));
    const [prelimsDes, setPrelimsDes] = useState(decodeURIComponent(description));
    const [price, setPrice] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="PRELIMS" subtitle="Edit Prelims" />

            <AddPaperTemplate
                isNonMobile={isNonMobile} seriesName="Prelims"
                series={prelims} setSeries={setPrelims}
                seriesDes={prelimsDes} setSeriesDes={setPrelimsDes}
                seriesPrice={price} setSeriesPrice={setPrice}
                seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
            />

        </Box>
    )
}

export default EditPrelimsSeries