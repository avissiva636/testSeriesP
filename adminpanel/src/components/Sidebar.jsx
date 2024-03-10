import { Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween';
import { ChevronLeft, ExpandLess, ExpandMore, HomeOutlined, SettingsOutlined } from '@mui/icons-material';
import profileImage from '../assets/profile.jpeg';

const navItems = [
  {
    text: "Home",
    icon: <HomeOutlined />,
    data: null
  },
  {
    text: "Prelims Series",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Prelims Series",
      },
      {
        text: "List Prelims Series",
      },
      {
        text: "Sell Prelims Series",
      },
      {
        text: "Sales Prelims Series",
      },
    ]
  },
  {
    text: "Mains Series",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Mains Series",
      },
      {
        text: "List Mains Series",
      },
      {
        text: "Sell Mains Series",
      },
      {
        text: "Sales Mains Series",
      },
    ]
  },
  {
    text: "Scheduled Series",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Scheduled Series",
      },
      {
        text: "List Scheduled Series",
      },
      {
        text: "Enrolled Scheduled Series",
      },
    ]
  },
  {
    text: "Previous Paper",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Upload",
      },
    ]
  },
  {
    text: "Question Paper Outlines",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Outline",
      },
      {
        text: "List Outline",
      },
    ]
  },
  {
    text: "Subjects",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Subjects",
      },
      {
        text: "List Subjects",
      },
    ]
  },
  {
    text: "Courses",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Courses",
      },
      {
        text: "List Courses",
      },
    ]
  },
  {
    text: "Batches",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Batches",
      },
      {
        text: "List Batches",
      },
    ]
  },
  {
    text: "Students",
    icon: <HomeOutlined />,
    data: [
      {
        text: "Add Students",
      },
      {
        text: "List Students",
      },
    ]
  },

]

const toggleReducerActions = {
  ADD_NAV: "Add Nav Item",
  TOGGLE_NAV: "Toggle Nav Item"
}

function toggleReducer(toggleState, action) {
  switch (action.type) {
    case toggleReducerActions.ADD_NAV:
      return [...toggleState, newToggleItem(action.payload.name)]
    case toggleReducerActions.TOGGLE_NAV:
      return toggleState.map(todo => {
        if (todo.name === action.payload.name) {
          return { ...todo, visible: !todo.visible }
        }
        return todo;
      })
    default:
      return toggleState
  }
}

const initialReducerItems = [
  { name: 'home', visible: false },
  { name: 'prelims series', visible: false },
  { name: 'mains series', visible: false },
  { name: 'scheduled series', visible: false },
  { name: 'previous paper', visible: false },
  { name: 'question paper outlines', visible: false },
  { name: 'subjects', visible: false },
  { name: 'courses', visible: false },
  { name: 'batches', visible: false },
  { name: 'students', visible: false },
];

function newToggleItem(name) {
  return { name: name, visible: false }
}

const Sidebar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState();

  const navigate = useNavigate();
  const theme = useTheme();

  const [toggleState, toggleDispatch] = useReducer(toggleReducer, initialReducerItems);
  // Function to get the visibility of a certain name
  const getToggleVisibility = useMemo(() => {
    return (name) => {
      const item = toggleState.find(item => item.name === name);
      return item ? item.visible : false; // Default to false if name not found
    };
  }, [toggleState])


  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth
            }
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant='h4' fontWeight="bold">
                    ADMIN
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            < List >

              {
                navItems.map(({ text, icon, data }, index) => {
                  const lcText = text.toLowerCase();

                  return (
                    !data ? ([
                      // HOME BUTTON
                      <ListItem key={`${text}-1`} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/${lcText}`);
                            setActive(lcText);
                          }}
                          sx={{
                            backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.primary[200],
                            paddingBottom: 1.8,
                          }}
                        >

                          <ListItemIcon
                            sx={{
                              ml: '2rem',
                              color:
                                active === lcText
                                  ? theme.palette.primary[600]
                                  : theme.palette.primary[200],
                            }}
                          >
                            {icon} {/* icon */}
                          </ListItemIcon>
                          <ListItemText primary={text} /> {/* Heding */}
                        </ListItemButton>
                      </ListItem>,
                      <Divider key={`${text}-2`} />]
                    ) :
                      ([
                        // DROP DOWN MENU
                        <ListItem key={`${text}-3`} disablePadding
                          sx={{
                            marginBottom: '-2px',
                            marginTop: '-2px'
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              toggleDispatch({
                                type: toggleReducerActions.TOGGLE_NAV,
                                payload: { name: lcText }
                              })
                            }}
                            sx={{
                              backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                              color:
                                active === lcText
                                  ? theme.palette.primary[600]
                                  : theme.palette.primary[200],
                              paddingTop: 1.8,
                              paddingBottom: 1.8,
                            }}
                          >

                            <ListItemIcon
                              sx={{
                                ml: '2rem',
                                color:
                                  active === lcText
                                    ? theme.palette.primary[600]
                                    : theme.palette.primary[200],
                              }}
                            >
                              {icon} {/* icon */}
                            </ListItemIcon>
                            <ListItemText primary={text} /> {/* Heding */}
                            {getToggleVisibility(lcText) ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItemButton>
                        </ListItem>,

                        // DROP DOWN ITEMS
                        data && (<Collapse key={`${text}-4`} in={getToggleVisibility(lcText)} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding
                            sx={{
                              ml: '5rem',
                              backgroundColor: theme.palette.background.alt,
                              paddingBottom: '5px'
                            }}
                          >
                            {/* second loop */}
                            {data.map((dataChunk) => {
                              const innerLcText = dataChunk.text.replace(/\s+/g, '').toLocaleLowerCase();

                              return <ListItemButton key={dataChunk.text}
                                onClick={() => {
                                  navigate(`/${innerLcText}`);
                                  setActive(innerLcText);
                                }}
                                sx={{
                                  backgroundColor: active === innerLcText ? theme.palette.secondary[300] : "transparent",
                                  color:
                                    active === innerLcText
                                      ? theme.palette.primary[600]
                                      : theme.palette.primary[200],
                                  paddingBottom: '2px'
                                }}
                              >
                                <ListItemText primary={dataChunk.text} />
                              </ListItemButton>
                            })}
                          </List>
                        </Collapse>
                        ),
                        index !== navItems.length - 1 && <Divider key={`${text}-5`} />
                      ])
                  )
                })
              }
            </List>
          </Box>

          {/* USER BOX */}
          <Box position="relative" marginTop='auto'>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />

              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  user
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}>
                  user
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>

        </Drawer>
      )
      }
    </Box >)
}

export default Sidebar