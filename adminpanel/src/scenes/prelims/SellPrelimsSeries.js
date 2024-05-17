import { Box } from '@mui/material'
import Header from 'components/Header'
import SellPaperTemplate from 'components/SellPaperTemplate';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { useCreatePrelimSalesMutation, useGetPSeriesesQuery } from 'state/apiDevelopmentSlice';

const SellPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const { isLoading: isPSLoading, data: PsData } = useGetPSeriesesQuery();
  const [createPrelimSales] = useCreatePrelimSalesMutation();

  const handleSubmit = async (price, series, seriesName, student, studentName, handleReset, setButtonDisabled) => {
    if (!series || !student) {
      alert("All fields are mandatory");
      return;
    }

    try {
      setButtonDisabled(true);

      await createPrelimSales({ series, seriesName, student, studentName, price }).unwrap()

      handleReset();
    } catch (error) {
      if (error.status === 400) {
        if (error?.data?.message === "Prelim Sale already created") {
          alert("Sale already registered");
        }
        else {
          alert("Give proper data");
        }
      }
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="Add Prelims Sale" />

      <SellPaperTemplate
        isSeriesLoading={isPSLoading}
        seriesData={PsData}
        handleSubmit={handleSubmit}
      />
    </Box>
  )
}

export default SellPrelimsSeries