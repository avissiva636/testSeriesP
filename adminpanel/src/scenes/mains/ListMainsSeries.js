import React, { useState } from 'react'
import { Box } from '@mui/material';
import Header from 'components/Header';
import ListPaperTemplate from 'components/ListPaperTemplate';
import { useOutletContext } from 'react-router-dom';
import { useDeleteMSeriesMutation, useGetMSeriesesQuery, useUpdateMSeriesStatusMutation } from 'state/apiDevelopmentSlice';

const ListMainsSeries = () => {
  const isNonMobile = useOutletContext();

  const { isLoading: isMSLoading, data: MsData } = useGetMSeriesesQuery();
  const [updateMSeriesStatus] = useUpdateMSeriesStatusMutation();
  const [deleteMSeries] = useDeleteMSeriesMutation();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const updateMsStatus = async (msNewStatus, msStatusUpdateId) => {
    if (!msNewStatus) {
      alert("Give Status");
      return;
    }

    try {
      setButtonDisabled(true);
      await updateMSeriesStatus({
        msId: msStatusUpdateId,
        updateFormData: { status: msNewStatus }
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
      try {
        await deleteMSeries({ msId: id, imgName: schedule }).unwrap();
      } catch (error) {
        if (error.status === 403) {
          alert("Description not Empty");
        }
      }

    }
  }

  return (
    <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
      <Header title="MAINS" subtitle="List Mains" />

      <ListPaperTemplate paperName="mains" paperData={MsData}
        paperLoading={isMSLoading}
        updatePaperStatus={updateMsStatus} deleteClick={deleteClick}
        buttonDisabled={buttonDisabled} />

    </Box>
  )
}

export default ListMainsSeries