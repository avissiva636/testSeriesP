import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FlexBetween from './FlexBetween';
import { ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Menu as MenuIcon, SettingsOutlined, } from '@mui/icons-material';
import { setMode } from 'state/stateSlice';
import profileImage from '../assets/profile.jpeg';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);


    return (<AppBar
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
        }}
    >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* LEFT SIDE */}
            <FlexBetween flexGrow={1} sx={{ justifyContent: "center" }}>
                {!isSidebarOpen && (<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>)}

                <FlexBetween
                    p="0.1rem 0.5rem"
                >
                    <Typography variant='h3' sx={{
                        opacity: '0.8',
                        fontWeight: 'bold'
                    }}>
                        ONLINE EXAM PORTAL
                    </Typography>
                </FlexBetween>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
                {/* <IconButton>
                    <SettingsOutlined />
                </IconButton> */}

                <FlexBetween>
                    <Button
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textTransform: "none",
                            gap: "1rem",
                        }}
                    >
                        <Box
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />

                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                sx={{ color: theme.palette.secondary[100] }}>
                                user
                            </Typography>
                            {/* <Typography
                                fontSize="0.75rem"
                                sx={{ color: theme.palette.secondary[200] }}>
                                user
                            </Typography> */}
                        </Box>
                        <ArrowDropDownOutlined
                            sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                        />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        <MenuItem onClick={() => { navigate("/profile"); handleClose() }}>Profile</MenuItem>
                        {/* profile               */}
                    </Menu>
                </FlexBetween>
            </FlexBetween>

        </Toolbar>
    </AppBar>)
}

export default Navbar