import React from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import { useOutletContext } from 'react-router-dom';
import { useDeleteMSeriesMutation, useGetMSeriesesQuery } from 'state/apiDevelopmentSlice';

const ListMainsSeries = () => {
  const isNonMobile = useOutletContext();

  const { isLoading: isMSLoading, data: MsData } = useGetMSeriesesQuery();
  const [deleteMSeries] = useDeleteMSeriesMutation();

  const deleteClick = async ({ id, title, schedule }) => {

    const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmation) {
      await deleteMSeries({ msId: id, imgName: schedule });
    }
  }

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="MAINS" subtitle="List Mains" />

      <ListPaperTemplate paperName="mains" paperData={MsData}
        paperLoading={isMSLoading} deleteClick={deleteClick} />

    </Box>
  )
}

export default ListMainsSeries