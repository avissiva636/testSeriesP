import { CurrencyRupeeOutlined } from '@mui/icons-material';
import { Box, useMediaQuery, useTheme } from '@mui/material'
import DashboardCard from 'components/DashboardCard';
import Header from 'components/Header'
import React from 'react'
import { useGetDashboardQuery } from 'state/apiDevelopmentSlice';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { isLoading: isDashbordLoading, data: DashboardData } = useGetDashboardQuery();
  
  return (

    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      {!isDashbordLoading ? (<>
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
            number={DashboardData?.student}
            viewAll='/liststudents'
          />
          <DashboardCard
            text="Total Prelims"
            number={DashboardData?.prelim?.total}
            viewAll='/listprelimsseries'
          />
          <DashboardCard
            text="Active Prelims"
            number={DashboardData?.prelim?.active}
            viewAll='/listprelimsseries'
          />
          <DashboardCard
            text="Revenue"
            icon={
              <CurrencyRupeeOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
            number={DashboardData?.prelim?.price}
            viewAll='/salesprelimsseries'
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
            number={DashboardData?.mains?.total}
            viewAll='/listmainsseries'
          />
          <DashboardCard
            text="Active Mains"
            number={DashboardData?.mains?.active}
            viewAll='/listmainsseries'
          />
          <DashboardCard
            text="Revenue"
            icon={
              <CurrencyRupeeOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
            number={DashboardData?.mains?.price}
            viewAll='/salesmainsseries'
          />

        </Box>
      </>) : <p>Loading...</p>}


    </Box>
  )
}

export default Dashboard