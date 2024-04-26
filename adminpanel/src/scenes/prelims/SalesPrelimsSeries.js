import React, { useState } from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useOutletContext } from 'react-router-dom';
import SalesPaperTemplate from 'components/SalesPaperTemplate';
import { salesPrelims } from 'data'


const SalesPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const [salePrelims, setSalePrelims] = useState();

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="Prelims Sale List" />

      <SalesPaperTemplate seriesName="prelims"
        userName={salePrelims} setUserName={setSalePrelims}
        paperData={salesPrelims}
      />
    </Box>
  )
}

export default SalesPrelimsSeries