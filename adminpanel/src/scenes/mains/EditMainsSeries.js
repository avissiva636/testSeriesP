import { Box } from '@mui/material';
import AddPaperTemplate from 'components/AddPaperTemplate';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { useUpdateMSeriesMutation } from 'state/apiDevelopmentSlice';

const EditMainsSeries = () => {
    const isNonMobile = useOutletContext();
    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const urlpaymentLink = searchParams.get('paymentLink');
    const urlprice = searchParams.get('price');

    const [mains, setMains] = useState(decodeURIComponent(title));
    const [mainsDes, setMainsDes] = useState(decodeURIComponent(description));
    const [price, setPrice] = useState(decodeURIComponent(urlprice));
    const [paymentLink, setPaymentLink] = useState(decodeURIComponent(urlpaymentLink));
    const paid = decodeURIComponent(searchParams.get('paid'));
    const status = decodeURIComponent(searchParams.get('status'));

    const navigate = useNavigate();

    const [updateMSeries] = useUpdateMSeriesMutation();

    const handleUpdate = async (setButtonDisabled, selectedFile, selectedValue, selectedStatus, handleReset) => {

        if (!mains || !mainsDes || !paymentLink || !selectedValue
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
            await updateMSeries({
                msId: decodeURIComponent(id),
                updateFormData: formData
            }).unwrap()
                .then(() => {
                    setButtonDisabled(false)
                    handleReset();
                    navigate('/listmainsseries', { replace: true });
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
            <Header title="MAINS" subtitle="Edit Mains" isNavigate={true} />

            <AddPaperTemplate
                isNonMobile={isNonMobile} seriesName="Mains"
                series={mains} setSeries={setMains}
                seriesDes={mainsDes} setSeriesDes={setMainsDes}
                seriesPrice={price} setSeriesPrice={setPrice}
                seriesPaymentLink={paymentLink} setSeriesPaymentLink={setPaymentLink}
                handleSubmit={handleUpdate} paid={paid} status={status}
            />

        </Box>
    )
}

export default EditMainsSeries