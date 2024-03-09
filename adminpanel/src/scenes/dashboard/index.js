import { CurrencyRupeeOutlined } from '@mui/icons-material';
import { Box, useMediaQuery, useTheme } from '@mui/material'
import DashboardCard from 'components/DashboardCard';
import Header from 'components/Header'
import React from 'react'

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (

    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="30px"
        pl='20px'
        pr='20px'
        py='20px'
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
          backgroundColor: theme.palette.background.alt
        }}
      >

        <DashboardCard
          text="Total Students"
          number='6196'
          viewAll='/addprelimsseries'
        />
        <DashboardCard
          text="Total Prelims"
          number='30'
          viewAll='/addprelimsseries'
        />
        <DashboardCard
          text="Active Prelims"
          number='31'
          viewAll='/addprelimsseries'
        />
        <DashboardCard
          text="Revenue"
          icon={
            <CurrencyRupeeOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          number='32456'
          viewAll='/addprelimsseries'
        />
      </Box>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(9, 1fr)"
        gridAutoRows="160px"
        gap="30px"
        pl='20px'
        pr='20px'
        py='20px'
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 9" },
          backgroundColor: theme.palette.background.alt
        }}
      >

        <DashboardCard
          text="Total Mains"          
          number='30'
          viewAll='/addprelimsseries'
        />
        <DashboardCard
          text="Active Mains"
          number='31'
          viewAll='/addprelimsseries'
        />
        <DashboardCard
          text="Revenue"
          icon={
            <CurrencyRupeeOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          number='32456'
          viewAll='/addprelimsseries'
        />

      </Box>


    </Box>
  )
}

export default Dashboard