import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { PrelimsList as prelimsData } from 'data'


const ListPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="List Prelims" />

      <ListPaperTemplate paperData={prelimsData}/>

    </Box>
  )
}

export default ListPrelimsSeries