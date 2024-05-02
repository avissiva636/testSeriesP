import { Box } from '@mui/material';
import AddPaperTemplate from 'components/AddPaperTemplate';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useCreateMSeriesMutation } from 'state/apiDevelopmentSlice';

const AddMainsSeries = () => {
    const isNonMobile = useOutletContext();

    const [mains, setMains] = useState('');
    const [mainsDes, setMainsDes] = useState('');
    const [price, setPrice] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    const [createMSeries] = useCreateMSeriesMutation();

    const handleSubmit = async (setButtonDisabled, selectedFile, selectedValue, selectedStatus, handleReset) => {        
        if (!mains || !mainsDes || !paymentLink
            || !selectedFile || !selectedValue
            || !(price !== null && price !== undefined)) {
            alert("All fields are mandatory");
            return;
        }
        const formData = new FormData();
        formData.append('title', mains);
        formData.append('description', mainsDes);
        formData.append('status', selectedStatus);
        formData.append('paid', selectedValue);
        formData.append('price', price);
        formData.append('paymentLink', paymentLink);
        formData.append('schedule', selectedFile);

        try {
            setButtonDisabled(true);
            await createMSeries(formData).unwrap()
                .then(() => {
                    handleReset();
                    setButtonDisabled(false)
                });

        } catch (error) {
            setButtonDisabled(false);
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="MAINS" subtitle="Add New Mains" />

            <AddPaperTemplate
                isNonMobile={isNonMobile} seriesName="Mains"
                series={mains} setSeries={setMains}
                seriesDes={mainsDes} setSeriesDes={setMainsDes}
                seriesPrice={price} setSeriesPrice={setPrice}
                seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
                handleSubmit={handleSubmit}
            />

        </Box>
    )
}

export default AddMainsSeries