import React, { useState } from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useOutletContext } from 'react-router-dom';
import { salesPrelims } from 'data'
import SalesPaperTemplate from 'components/SalesPaperTemplate';

const SalesMainsSeries = () => {
  const isNonMobile = useOutletContext();

  const [salePrelims, setSalePrelims] = useState();

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="MAINS" subtitle="Mains Sale List" />

      <SalesPaperTemplate seriesName="mains"
        userName={salePrelims} setUserName={setSalePrelims}
        paperData={salesPrelims}
      />
    </Box>
  )
}

export default SalesMainsSeries