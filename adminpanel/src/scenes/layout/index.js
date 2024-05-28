import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Navbar from "components/Navbar"
import { Outlet } from 'react-router-dom'
import Sidebar from 'components/Sidebar'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        // user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box flexGrow={1}>
        <Box width="100%" maxWidth="1200px " mx="auto">
          <Navbar
            // user={data || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </Box>
        <Outlet
          context={isNonMobile}
        />
      </Box>
    </Box>
  )
}

export default Layout