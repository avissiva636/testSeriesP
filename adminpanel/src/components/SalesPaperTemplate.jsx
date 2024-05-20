import React from 'react'
import FlexBetween from 'components/FlexBetween';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Divider, IconButton, MenuItem, TextField, Typography, useTheme } from '@mui/material';
import { CurrencyRupeeOutlined, DeleteRounded } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles'

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

const SalesPaperTemplate = ({ seriesName, paperData, ispaperLoading, seriesData, isSeriesLoading, searchSeriesSales, setSearchSeriesSales, paginationModel, setPaginationModel, totalPrice, setSaleSeriesSort, handleSearchSubmit, deleteClick }) => {
    const theme = useTheme();

    //onChange of search elements
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchSeriesSales({ ...searchSeriesSales, [name]: value })
    }

    const columns = [
        {
            field: "sno",
            headerName: "SINO",
            flex: 0.5,
        },
        {
            field: "studentName",
            headerName: "NAME",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "seriesName",
            headerName: "SERIES NAME",
            flex: 1,
        },

        {
            field: "time",
            headerName: "TIME",
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
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
                        onClick={() => deleteClick({
                            id: params.row._id,
                            title: params.row.studentName,
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
                    name={"userName"}
                    onChange={(e) => handleSearchChange(e)}
                    value={searchSeriesSales.userName}
                    variant='outlined'
                    sx={{ my: '0.5rem', ml: '0.5rem' }}

                />

                {/* DropdownList SeriesNames */}
                <TextField
                    id={`${seriesName}SeriesList`}
                    select
                    name='seriesName'
                    value={searchSeriesSales.seriesName}
                    onChange={(e) => handleSearchChange(e)}
                    variant="outlined"
                    sx={{ width: '15rem' }}
                    children={
                        !isSeriesLoading && seriesData ? seriesData?.map((datachunk) => (
                            <MenuItem key={datachunk._id} value={datachunk.title}>
                                {datachunk.title}
                            </MenuItem>
                        )) : <MenuItem id={`${seriesName}SeriesName`} value="SeriesName" >SeriesName</MenuItem>
                    }
                />

                {/* StatDate */}
                <Box>
                    <DatePicker
                        selected={searchSeriesSales.startingDate}
                        onChange={(date) => setSearchSeriesSales({ ...searchSeriesSales, startingDate: date })}
                        selectsStart
                        startDate={searchSeriesSales.startingDate}
                        endDate={searchSeriesSales.endingDate}
                    />
                </Box>

                {/* EndDate */}
                <Box>
                    <DatePicker
                        selected={searchSeriesSales.endingDate}
                        onChange={(date) => setSearchSeriesSales({ ...searchSeriesSales, endingDate: date })}
                        selectsEnd
                        startDate={searchSeriesSales.startingDate}
                        endDate={searchSeriesSales.endingDate}
                        minDate={searchSeriesSales.startingDate}
                    />
                </Box>

                {/* Button to Search */}
                <Button variant="contained" color="success"
                    size='large'
                    onClick={handleSearchSubmit}
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
                        {paperData?.total}
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
                        /> {totalPrice}
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
                    loading={ispaperLoading || !paperData}
                    getRowId={(row) => row._id}
                    rows={(paperData?.seriesSales) || []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rowCount={(paperData && (paperData.total || 20)) || 0}
                    pageSizeOptions={[5, 10, 15]}
                    pagination
                    paginationMode='server'
                    sortingMode='server'
                    onSortModelChange={(newSortModel) => setSaleSeriesSort(...newSortModel)}

                    autoHeight={true}
                    rowHeight={70}
                    getRowClassName={getRowClassName}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    )
}

export default SalesPaperTemplate