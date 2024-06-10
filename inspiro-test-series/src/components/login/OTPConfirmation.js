import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostRegisterMutation } from '../../state/apiDevelopmentSlice';

const OTPConfirmation = () => {
    const [otp, setOTP] = useState('');
    const [error, setError] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const userId = location?.state?.userId;
    
    const [postRegister] = usePostRegisterMutation();


    const handleChange = (e) => {
        const value = e.target.value;
        // Only allow digits and limit to 6 characters
        if (/^\d{0,6}$/.test(value)) {
            setOTP(value);
            setError('');
        } else {
            setError('Please enter a valid 6-digit OTP.');
        }
    };

    const handleConfirmOTP = (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            postRegister({ userId, otp }).unwrap()
                .then(() => {
                    navigate('/login');
                    alert("user Created")
                })
                .catch((error) => {
                    if (error?.originalStatus === 409) {
                        alert("Invalid Otp");
                    }

                }).finally(() => setButtonDisabled(false));
        } else {
            setError('Please enter a valid 6-digit OTP.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                OTP Confirmation
            </Typography>
            <Typography variant="body1" gutterBottom>
                Please enter the 6-digit OTP sent to your email/mobile.
            </Typography>
            <form onSubmit={handleConfirmOTP}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="OTP"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            error={!!error}
                            helperText={error}
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={buttonDisabled} fullWidth>
                            Confirm OTP
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default OTPConfirmation;