import { Box, Button, Divider, IconButton, MenuItem, TextField, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header'
import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { students as studentsData } from 'data'
import { CreateRounded, CurrencyRupeeOutlined, DeleteRounded } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import { DataGrid } from '@mui/x-data-grid';

// DESIDE COLOR FOR EVEN & ODD ROWS
const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        root: {     //Currently Not in Use
            height: '100%',
        },
        oddRow: {
            backgroundColor: 'transparent',
            // fontSize: '17px',
            // color: theme.palette.primary[200]
        },
        evenRow: {
            backgroundColor: theme.palette.background.alt,
            // fontSize: '17px',
            // color: theme.palette.primary[300]
        },
    };
});

const ListStudents = () => {
    const isNonMobile = useOutletContext();

    const seriesName = "prelims";
    const [userName, setUserName] = useState();

    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date;
    });
    const [seriesList, setSeriesList] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const theme = useTheme();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const editClick = ({ id, title, description }) => {
        console.log("Editing", id, title, description);
    };

    const deleteClick = ({ id, title, description }) => {
        console.log("Deleting", id, title, description);
    }

    const columns = [
        {
            field: "si",
            headerName: "SINO",
            flex: 0.5,
        },
        {
            field: "username",
            headerName: "USERNAME",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "userid",
            headerName: "USERID",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "name",
            headerName: "NAME",
            flex: 1,
        },
        {
            field: "mobileno",
            headerName: "MOBILENO",
            flex: 1,
        },
        {
            field: "emailid",
            headerName: "EMAILID",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
        },
        {
            field: "status",
            headerName: "STATUS",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
        },
        {
            field: "regtime",
            headerName: "REGTIME",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                const queryString = new URLSearchParams({                    
                    username: encodeURIComponent(params.row.username),                    
                    name: encodeURIComponent(params.row.name),
                    mobileno: encodeURIComponent(params.row.mobileno),
                    emailid: encodeURIComponent(params.row.emailid),
                    status: encodeURIComponent(params.row.status),                    
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/editstudents/${params.row.si}?${queryString}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                            <CreateRounded />
                        </Link>
                    </IconButton>

                    <IconButton
                        onClick={() => deleteClick({
                            id: params.row.sino,
                            title: params.row.username,
                            description: params.row.name
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
            <Header title="LIST STUDENTS" subtitle="Entire List of Students" />

            <Box mt="1rem" sx={{
                bgcolor: theme.palette.background.alt,
                py: '1rem'
            }}>

                {/* Outline Box */}
                <FlexBetween sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
                    mx: '1rem'
                }}>

                    {/* Prelims Username */}
                    <TextField
                        label={`${seriesName} Username`}
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        variant='outlined'
                        sx={{ my: '0.5rem', ml: '0.5rem' }}

                    />

                    {/* DropdownList SeriesNames */}
                    <TextField
                        id={`${seriesName}SeriesList`}
                        select
                        value={seriesList || "SeriesName"}
                        onChange={(e) => setSeriesList(e.target.value)}
                        variant="outlined"
                        sx={{ width: '15rem' }}
                    >
                        {!seriesList && <MenuItem id={`${seriesName}SeriesName`} value="SeriesName" disabled>SeriesName</MenuItem>}
                        {/* {courseData.map((course) => (
                            <MenuItem key={course.id} value={course.title}>
                                {course.title}
                            </MenuItem>
                        ))} */}
                    </TextField>

                    {/* StatDate */}
                    <Box>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>

                    {/* EndDate */}
                    <Box>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Box>

                    {/* Button to Search */}
                    <Button variant="contained" color="success"
                        size='large'
                        // onClick={handleSubmit}
                        sx={{ mr: '1rem', width: '120px' }}
                    >
                        Search
                    </Button>
                </FlexBetween>

                <Divider sx={{ mt: '1rem' }} />
                {/* Cards */}
                <FlexBetween sx={{ mt: "1rem" }} gap={"1rem"}>

                    {/* Total Sales card */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        ml="1rem"
                        p="1.25rem 1rem"
                        flex="1 1 100%"
                        backgroundColor={theme.palette.background.default}
                    >
                        <Typography variant='h4' sx={{
                            color: theme.palette.secondary[300],
                            display: 'flex',
                            pl: '2rem'
                        }}>
                            Total Sales
                        </Typography>
                        <Typography variant='h4' sx={{
                            color: theme.palette.secondary[300],
                            display: 'flex',
                            pl: '2rem'
                        }}>
                            14
                            {/* Dynamic Number */}
                        </Typography>
                    </Box>

                    {/* Total Revenue Card */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        mr="1rem"
                        p="1.25rem 1rem"
                        flex="1 1 100%"
                        backgroundColor={theme.palette.background.default}
                    >
                        <Typography variant='h4' sx={{
                            color: theme.palette.secondary[300],
                            display: 'flex',
                            pl: '2rem'
                        }}>
                            Total Revenue
                        </Typography>
                        <Typography variant='h4' sx={{
                            color: theme.palette.secondary[300],
                            display: 'flex',
                            pl: '2rem'
                        }}>
                            <CurrencyRupeeOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            /> 5,110
                            {/* Dynamic Number */}
                        </Typography>
                    </Box>

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
                        // loading={isLoading || !data}
                        loading={!studentsData}
                        getRowId={(row) => row.si}
                        rows={(studentsData) || []}
                        columns={columns}

                        autoHeight={true}
                        rowHeight={70}
                        rowCount={(studentsData && (studentsData.length || 20)) || 0}

                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10, 15]}

                        getRowClassName={getRowClassName}
                        disableRowSelectionOnClick
                    />
                </Box>

            </Box>
        </Box>
    )
}

export default ListStudents