import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { useDeletePSeriesMutation, useGetPSeriesesQuery } from 'state/apiDevelopmentSlice';


const ListPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const { isLoading: isPSLoading, data: PsData } = useGetPSeriesesQuery();
  const [deletePSeries] = useDeletePSeriesMutation();

  const deleteClick = async ({ id, title, schedule }) => {

    const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

    if (confirmation) {
      await deletePSeries({ psId: id, imgName: schedule });
    }
  }

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="PRELIMS" subtitle="List Prelims" />

      <ListPaperTemplate paperName="prelims" paperData={PsData}
        paperLoading={isPSLoading} deleteClick={deleteClick} />

    </Box>
  )
}

export default ListPrelimsSeries