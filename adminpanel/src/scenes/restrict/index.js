import React from 'react'
import { Box, Typography, useTheme } from '@mui/material';
import Header from 'components/Header';

import { useOutletContext } from 'react-router-dom';


const Restrict = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();


    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="Restict" subtitle="User Restricted" />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                }}
            >
                <Typography
                    variant='h2'
                    color={theme.palette.secondary[100]}
                    fontWeight="bold"
                    sx={{ mx: "5rem" }}
                >
                    USER UNAUTHORIZED
                </Typography>
            </div>

        </Box>
    )
}

export default Restrict