import React from 'react'
const { Box, useTheme, Typography, Divider, Link } = require("@mui/material");

const DashboardCard = ({ text = "sixer", icon, number = "dsf", viewAll }) => {
    const theme = useTheme();

    return (
        <Box
            gridColumn="span 3"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.background.default}
        // borderRadius="0.55rem"
        >
            <Typography variant='h4' sx={{
                display: 'flex',
                pl: '2rem'
            }}>
                {text}
            </Typography>

            <Box display={'flex'} gap={'0.25rem'} sx={{ pl: '2rem' }}>
                {icon && <Typography variant='h3' >
                    {icon}
                </Typography>}
                <Typography variant='h3' >
                    {number}
                </Typography>

            </Box>

            <Divider />
            {/* <Typography variant='h5' sx={{
                display: 'flex',
                // justifyContent: 'center',
                pl: '2rem'
            }}>
                {viewAll}
            </Typography> */}
            <Link href={viewAll} underline="none">
                viewAll
            </Link>
        </Box>
    )
}
// display: "flex",
// justifyContent: "space-between",
// alignItems: "center",

export default DashboardCard
