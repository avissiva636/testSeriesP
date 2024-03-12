import { Box } from '@mui/material'
import Header from 'components/Header'
import SellPaperTemplate from 'components/SellPaperTemplate';
import React from 'react'
import { useOutletContext } from 'react-router-dom';

const SellPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="Add Prelims Sale" />

      <SellPaperTemplate />
    </Box>
  )
}

export default SellPrelimsSeries