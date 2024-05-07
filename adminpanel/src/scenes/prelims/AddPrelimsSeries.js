import { Box } from '@mui/material'

import Header from 'components/Header'
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import AddPaperTemplate from 'components/AddPaperTemplate';
import { useCreatePSeriesMutation } from 'state/apiDevelopmentSlice';

const AddPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const [prelims, setPrelims] = useState('');
  const [prelimsDes, setPrelimsDes] = useState('');
  const [price, setPrice] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const [createPSeries] = useCreatePSeriesMutation();

  const handleSubmit = async (setButtonDisabled, selectedFile, selectedValue, selectedStatus, handleReset) => {
    if (!prelims || !prelimsDes || !paymentLink
      || !selectedFile || !selectedValue || !selectedStatus
      || !(price !== null && price !== undefined)) {
      alert("All fields are mandatory");
      return;
    }
    const formData = new FormData();
    formData.append('title', prelims);
    formData.append('description', prelimsDes);
    formData.append('status', selectedStatus);
    formData.append('paid', selectedValue);
    formData.append('price', price);
    formData.append('paymentLink', paymentLink);
    formData.append('schedule', selectedFile);

    try {
      setButtonDisabled(true);
      await createPSeries(formData).unwrap()
        .then(() => setButtonDisabled(false));

      handleReset();
    } catch (error) {
      setButtonDisabled(false);
      if (error.status === 400) {
        alert("Give proper data");
      }
    }
  }

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="Add New Prelims" />

      <AddPaperTemplate
        isNonMobile={isNonMobile} seriesName="Prelims"
        series={prelims} setSeries={setPrelims}
        seriesDes={prelimsDes} setSeriesDes={setPrelimsDes}
        seriesPrice={price} setSeriesPrice={setPrice}
        seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
        handleSubmit={handleSubmit}
      />

    </Box>
  )
}

export default AddPrelimsSeries