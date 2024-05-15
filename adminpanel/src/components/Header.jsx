import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from './FlexBetween';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle, isNavigate = false }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box maxWidth="1200px">
            <FlexBetween>
                <Typography
                    variant='h2'
                    color={theme.palette.secondary[100]}
                    fontWeight="bold"
                    sx={{ mb: "5px" }}
                > {title} </Typography>

                {isNavigate === true &&
                    <Button
                        component="label"
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                }

            </FlexBetween>
            <Typography variant='h5' color={theme.palette.secondary[300]} >
                {subtitle}
            </Typography>
        </Box>
    )
}

export default Header