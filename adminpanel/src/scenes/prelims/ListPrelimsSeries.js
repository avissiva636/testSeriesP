import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useDeletePSeriesMutation, useGetPSeriesesQuery, useUpdatePSeriesStatusMutation } from 'state/apiDevelopmentSlice';


const ListPrelimsSeries = () => {
  const isNonMobile = useOutletContext();

  const { isLoading: isPSLoading, data: PsData } = useGetPSeriesesQuery();
  const [updatePSeriesStatus] = useUpdatePSeriesStatusMutation();
  const [deletePSeries] = useDeletePSeriesMutation();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const updatePsStatus = async (psNewStatus, psStatusUpdateId) => {
    if (!psNewStatus) {
      alert("Give Status");
      return;
    }

    try {
      setButtonDisabled(true);
      await updatePSeriesStatus({
        psId: psStatusUpdateId,
        updateFormData: { status: psNewStatus }
      }).unwrap()
        .then(() => {
          setButtonDisabled(false)
        });

    } catch (error) {
      setButtonDisabled(false);
      if (error.status === 400) {
        alert("Give proper data");
      }
    }

  }

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
        paperLoading={isPSLoading}
        updatePaperStatus={updatePsStatus} deleteClick={deleteClick}
        buttonDisabled={buttonDisabled} />

    </Box>
  )
}

export default ListPrelimsSeries