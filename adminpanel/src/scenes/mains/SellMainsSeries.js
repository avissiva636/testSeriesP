import { Box } from '@mui/material'
import Header from 'components/Header'
import SellPaperTemplate from 'components/SellPaperTemplate';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { useCreateMainsSalesMutation, useGetMSeriesesQuery } from 'state/apiDevelopmentSlice';

const SellMainsSeries = () => {
  const isNonMobile = useOutletContext();

  const { isLoading: isMSLoading, data: MsData } = useGetMSeriesesQuery();
  const [createMainSales] = useCreateMainsSalesMutation();

  const handleSubmit = async (price, series, seriesName, student, studentName, handleReset, setButtonDisabled) => {
    if (!series || !student) {
      alert("All fields are mandatory");
      return;
    }

    try {
      setButtonDisabled(true);

      await createMainSales({ series, seriesName, student, studentName, price }).unwrap()

      handleReset();
    } catch (error) {
      if (error.status === 400) {
        if (error?.data?.message === "Mains Sale already created") {
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
      <Header title="MAINS" subtitle="Add Mains Sale" />

      <SellPaperTemplate
        isSeriesLoading={isMSLoading}
        seriesData={MsData}
        handleSubmit={handleSubmit}
      />
    </Box>
  )
}

export default SellMainsSeries