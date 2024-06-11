import { Box, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header'
import React, { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { PrelimResultToolbar as DataGridCustomToolbar } from 'components/PrelimResultToolbar'
import { useGetPseriesResultQuery } from 'state/apiDevelopmentSlice';

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

const PrelimResult = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [searchParams] = useSearchParams();
    const pQDesId = decodeURIComponent(searchParams.get('id'));

    const [search, setSearch] = useState("");
    const [serverSearch, setServerSearch] = useState("");
    const [pResultSort, setPResultSort] = useState({});

    const { isLoading: isPResultLoading, data: PResultData } = useGetPseriesResultQuery({
        pQDesId,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        Sort: JSON.stringify(pResultSort),
        search: JSON.stringify(serverSearch)
    })
    console.log(PResultData)
    const columns = [
        {
            field: "userId",
            headerName: "Username",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value?.name)
                );
            },
        },
        {
            field: "questionDescriptions",
            headerName: "Title",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value?.title)
                );
            },
        },
        {
            field: "submitCount",
            headerName: "No of Attended",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "correctCount",
            headerName: "No of Correct Ans",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "correctCountt",
            headerName: "Marks",
            flex: 1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } },
                        (params.row.questionDescriptions.cMarks * params.row.correctCount)
                    )
                );
            },
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
            <Header title="PRELIMS" subtitle="Prelim Result" isNavigate={true} />

            <Box
                sx={{
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
                    loading={isPResultLoading || !PResultData}
                    getRowId={(row) => row._id}
                    rows={(PResultData && PResultData?.pResults) || []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rowCount={(PResultData && (PResultData.total || 20)) || 0}
                    pageSizeOptions={[5, 10, 15]}
                    pagination
                    paginationMode='server'
                    sortingMode='server'
                    onSortModelChange={(newSortModel) => setPResultSort(...newSortModel)}

                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { search, setSearch, setServerSearch }
                    }}

                    autoHeight={true}
                    rowHeight={70}
                    getRowClassName={getRowClassName}
                    disableRowSelectionOnClick
                />
            </Box>

        </Box>
    )
}

export default PrelimResult