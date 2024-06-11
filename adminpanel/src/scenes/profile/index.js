import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { useCreateProfileMutation, useDeleteProfileMutation, useGetProfileQuery, useUpdateProfileMutation } from 'state/apiDevelopmentSlice';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles'
import { Box, Button, Checkbox, Divider, FormControl, IconButton, ListItemText, MenuItem, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import { CreateRounded, DeleteRounded,CloseSharp } from '@mui/icons-material';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';

const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        root: {     //Currently Not in Use
            height: '100%',
        },
        oddRow: {
            backgroundColor: 'transparent',
        },
        evenRow: {
            backgroundColor: theme.palette.background.alt,
        },
    };
});

const Profile = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const initialProfileValues = {
        profileId: "",
        userName: "",
        Password: "",
        role: [""],
        email: ""
    };
    const [profiler, setProfiler] = useState(initialProfileValues)
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });


    const { isLoading: isProfileLoading, data: profileList } = useGetProfileQuery();
    const [createProfile] = useCreateProfileMutation();
    const [updateProfile] = useUpdateProfileMutation();
    const [deleteProfile] = useDeleteProfileMutation();


    const handleReset = () => {
        setProfiler(initialProfileValues);
    }

    const handleProfileSubmit = async () => {
        try {
            await createProfile(profiler).unwrap();
            handleReset();
        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    const handleUpdateSubmit = async () => {
        try {
            await updateProfile(profiler).unwrap();
            handleReset();
            setIsUpdateLoading(prev => !prev);
        } catch (error) {
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    //switch to edit mode,
    //Fill up updating detail in respective detail
    const editHandler = ({ id, pUname, pEmail, pRole }) => {
        setIsUpdateLoading(true);
        setProfiler({ profileId: id, userName: pUname, email: pEmail, role: Object.keys(pRole).filter(key => pRole[key] != null) });
    }

    const deleteClick = async ({ id, title }) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);
        console.log(id, title)
        if (confirmation) {
            try {
                await deleteProfile({ pId: id }).unwrap();
            } catch (error) {
                if (error.status === 400) {
                    alert(`${title} not deleted`);
                }
            }

        }
    }

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setProfiler(prev => ({ ...prev, [name]: value }))
    }

    // Form control select drop down
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setProfiler(
            prev => typeof value === 'string' ? { ...prev, role: value.split(',') } : { ...prev, role: value },
        );
    };



    const columns = [
        {
            field: "sno",
            headerName: "SINO",
            flex: 0.5,
        },
        {
            field: "username",
            headerName: "NAME",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "roles",
            headerName: "Role",
            flex: 1,
            renderCell: (params) => {
                return (
                    <p>{Object.keys(params.value).filter(key => params.value[key] != null).join(" , ")}</p>
                )
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        onClick={() => editHandler({
                            id: params.row._id,
                            pUname: params.row.username,
                            pEmail: params.row.email,
                            pRole: params.row.roles
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <CreateRounded />
                    </IconButton>

                    <IconButton
                        onClick={() => deleteClick({
                            id: params.row._id,
                            title: params.row.username,
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <DeleteRounded />
                    </IconButton>

                </FlexBetween>)
            }
        },
    ]

    // COLOR DEFINITION Object
    const classes = useStyles();

    // DESIDE COLOR FOR EVEN & ODD ROWS
    const getRowClassName = (params) => {
        return (params.indexRelativeToCurrentPage + 1) % 2 === 0
            ? classes.evenRow
            : classes.oddRow;
    };

    return (
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="Profile" subtitle="Profile List" />

            <Box mt="1rem" sx={{
                bgcolor: theme.palette.background.alt,
                py: '1rem'
            }}>

                {/* Outline Box */}
                <FlexBetween sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
                    mx: '1rem'
                }}>

                    {/* Profile Username */}
                    <TextField
                        label={`Profile Username`}
                        name={"userName"}
                        onChange={(e) => handleSearchChange(e)}
                        value={profiler.userName}
                        variant='outlined'
                        sx={{ my: '0.5rem', ml: '0.5rem' }}

                    />

                    {/* Profile Password */}
                    <TextField
                        label={`Profile Password`}
                        name={"Password"}
                        onChange={(e) => handleSearchChange(e)}
                        value={profiler.Password}
                        variant='outlined'
                        sx={{ my: '0.5rem', ml: '0.5rem' }}

                    />

                    {/* Profile Password */}
                    <TextField
                        label={`Profile Email`}
                        name={"email"}
                        onChange={(e) => handleSearchChange(e)}
                        value={profiler.email}
                        variant='outlined'
                        sx={{ my: '0.5rem', ml: '0.5rem' }}

                    />

                    {/* DropdownList SeriesNames */}
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Select
                            multiple
                            value={profiler.role}
                            onChange={handleChange}
                            input={<OutlinedInput id={crypto.randomUUID()} />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5 + 8,
                                        width: 250,
                                    },
                                },
                            }}
                        >
                            <MenuItem key={crypto.randomUUID()} value={"Admin"} >
                                <Checkbox id={crypto.randomUUID()} checked={profiler?.role?.indexOf("Admin") > -1} />
                                <ListItemText primary={"Admin"} />
                            </MenuItem>
                            <MenuItem key={crypto.randomUUID()} value={"Editor"} >
                                <Checkbox id={crypto.randomUUID()} checked={profiler?.role?.indexOf("Editor") > -1} />
                                <ListItemText primary={"Editor"} />
                            </MenuItem>
                        </Select>
                    </FormControl>


                    {/* Button to Search */}
                    {!isUpdateLoading && <Button variant="contained" color="success"
                        size='large'
                        onClick={handleProfileSubmit}
                        sx={{ mr: '1rem', width: '120px' }}
                    >
                        CREATE
                    </Button>}
                    {isUpdateLoading &&
                        <>
                            <Button variant="contained" color="success"
                                size='large'
                                onClick={handleUpdateSubmit}
                                sx={{ mr: '1rem', width: '120px' }}
                            >
                                UPDATE
                            </Button>
                            <IconButton
                                onClick={() => {
                                    setIsUpdateLoading(prev => !prev)
                                    handleReset();
                                }}
                                sx={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                }}>
                                <CloseSharp />
                            </IconButton>
                        </>
                    }
                </FlexBetween>

                <Divider sx={{ mt: '1rem' }} />

                <Box
                    sx={{
                        mt: "1rem",
                        "& .MuiDataGrid-root": {
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none !important"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            opacity: '0.7',
                            borderBottom: "none",

                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.primary.light,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            opacity: '0.7',
                            borderTop: "none"
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`,
                        },
                        "&  .MuiDataGrid-columnHeaderTitle ": {
                            lineHeight: 'normal',
                            whiteSpace: "normal",
                            wordWrap: "break-word"
                        },
                    }}
                >
                    <DataGrid
                        loading={isProfileLoading || !profileList}
                        getRowId={(row) => row._id}
                        rows={(profileList) || []}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        rowCount={(profileList && (profileList.length || 10)) || 0}
                        pageSizeOptions={[5, 10, 15]}

                        autoHeight={true}
                        rowHeight={70}
                        getRowClassName={getRowClassName}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;