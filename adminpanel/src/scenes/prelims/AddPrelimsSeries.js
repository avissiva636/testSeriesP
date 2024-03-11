import { Box } from '@mui/material'

import Header from 'components/Header'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import AddPaperTemplate from 'components/AddPaperTemplate';

const AddPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const [prelims, setPrelims] = useState('');
  const [prelimsDes, setPrelimsDes] = useState('');
  const [price, setPrice] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="Add New Prelims" />

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

export default AddPrelimsSeries