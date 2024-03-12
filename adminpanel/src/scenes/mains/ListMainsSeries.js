import React from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import { PrelimsList as prelimsData } from 'data'
import { useOutletContext } from 'react-router-dom';

const ListMainsSeries = () => {
    const isNonMobile = useOutletContext();

  return (
     <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="MAINS" subtitle="List Mains" />

      <ListPaperTemplate paperName="mains" paperData={prelimsData}/>

    </Box>
  )
}

export default ListMainsSeries