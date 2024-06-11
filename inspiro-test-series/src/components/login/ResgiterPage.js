import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePreRegisterMutation } from '../../state/apiDevelopmentSlice';

const ResgiterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        sex: '',
        // userName: '',
        password: '',
        email: '',
        mobile: '',
        telephone: ''
    });
    const [preRegister] = usePreRegisterMutation();
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        preRegister({ ...formData }).unwrap()
            .then((response) => {
                // console.log(response)
                // navigate("/otpConfirmation")
                navigate('/otpConfirmation', { state: { ...response } });
            })
            .catch((error) => {
                if (error?.originalStatus === 409) {
                    alert("User Already Exists");
                }
                if (error?.status === 400 && error?.data?.message === "Invalid Mail") {
                    alert("Invalid Mail");
                }
            }).finally(() => setButtonDisabled(false));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Registration Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {Object.keys(formData).map((field) => (
                        <Grid item xs={12} key={field}>
                            {field === 'sex' ? (
                                <TextField
                                    fullWidth
                                    select
                                    variant="outlined"
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Others">Other</MenuItem>
                                </TextField>
                            ) : (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    type={
                                        field === 'password' ? 'password' : ['mobile', 'telephone', 'age'].includes(field) ? 'number' : 'text'
                                    }
                                />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={buttonDisabled}>
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="secondary" fullWidth onClick={handleBack} disabled={buttonDisabled}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ResgiterPage;