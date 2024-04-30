import { Box } from '@mui/material'

import Header from 'components/Header'
import React, { useState } from 'react'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import AddPaperTemplate from 'components/AddPaperTemplate';
import { useUpdatePSeriesMutation } from 'state/apiDevelopmentSlice';

const EditPrelimsSeries = () => {
    const isNonMobile = useOutletContext();
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const urlpaymentLink = searchParams.get('paymentLink');
    const urlprice = searchParams.get('price');

    const [prelims, setPrelims] = useState(decodeURIComponent(title));
    const [prelimsDes, setPrelimsDes] = useState(decodeURIComponent(description));
    const [price, setPrice] = useState(decodeURIComponent(urlprice));
    const [paymentLink, setPaymentLink] = useState(decodeURIComponent(urlpaymentLink));
    const paid = decodeURIComponent(searchParams.get('paid'));
    const status = decodeURIComponent(searchParams.get('status'));

    const navigate = useNavigate();

    const [updatePSeries] = useUpdatePSeriesMutation();

    const handleUpdate = async (setButtonDisabled, selectedFile, selectedValue, selectedStatus, handleReset) => {

        if (!prelims || !prelimsDes || !paymentLink || !selectedValue
            || !(price !== null && price !== undefined)) {
            alert("All fields are mandatory");
            return;
        }
        const formData = new FormData();
        formData.append('title', prelims);
        formData.append('description', prelimsDes);
        formData.append('status', selectedStatus);
        formData.append('paid', selectedValue);
        formData.append('price', price);
        formData.append('paymentLink', paymentLink);
        formData.append('schedule', selectedFile);

        try {
            setButtonDisabled(true);
            await updatePSeries({
                psId: decodeURIComponent(id),
                updateFormData: formData
            }).unwrap()
                .then(() => {
                    setButtonDisabled(false)
                    handleReset();
                    navigate('/listprelimsseries', { replace: true });
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
            <Header title="PRELIMS" subtitle="Edit Prelims" />

            <AddPaperTemplate
                isNonMobile={isNonMobile} seriesName="Prelims"
                series={prelims} setSeries={setPrelims}
                seriesDes={prelimsDes} setSeriesDes={setPrelimsDes}
                seriesPrice={price} setSeriesPrice={setPrice}
                seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
                handleSubmit={handleUpdate} paid={paid} status={status}
            />

        </Box>
    )
}

export default EditPrelimsSeries