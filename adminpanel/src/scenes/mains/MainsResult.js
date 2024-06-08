import { Box, IconButton, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header'
import React, { useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { PrelimResultToolbar as DataGridCustomToolbar } from 'components/PrelimResultToolbar'
import { useGetMseriesResultQuery } from 'state/apiDevelopmentSlice';
import { CreateRounded } from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';

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

const MainsResult = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [searchParams] = useSearchParams();
    const mQDesId = decodeURIComponent(searchParams.get('id'));

    const [search, setSearch] = useState("");
    const [serverSearch, setServerSearch] = useState("");
    const [pResultSort, setPResultSort] = useState({});

    const { isLoading: isMResultLoading, data: MResultData } = useGetMseriesResultQuery({
        mQDesId,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        Sort: JSON.stringify(pResultSort),
        search: JSON.stringify(serverSearch)
    })

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
            field: "submittedAnswer",
            headerName: "Anwer Sheet",
            flex: 1,
            renderCell: function (params) {
                console.log(params)
                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <a
                            // color='inherit'
                            href={`${process.env.REACT_APP_BASE_URL}/images/uMains/${params.value}`}
                        >
                            <CreateRounded />
                        </a>
                    </IconButton>

                </FlexBetween>)
            },
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
                    id: encodeURIComponent(params.row.questionDescriptionId),
                    title: encodeURIComponent(params.row.questionDescriptions.title),//searchParams.get('title'),
                    description: encodeURIComponent(params.row.questionDescriptions.description),
                    userName: encodeURIComponent(params.row.userId.name),
                    userId: encodeURIComponent(params.row.userId._id),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/maincorrection?${queryString}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                            <CreateRounded />
                        </Link>
                    </IconButton>

                    {/* <IconButton
                        // onClick={() => deleteClick({
                        //     id: params.row._id,
                        //     title: params.row.title,
                        //     schedule: params.row.schedule,
                        // })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <DeleteRounded />
                    </IconButton> */}
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
            <Header title="MAINS" subtitle="Mains Result" isNavigate={true} />

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
                    loading={isMResultLoading || !MResultData}
                    getRowId={(row) => row._id}
                    rows={(MResultData && MResultData?.mResults) || []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rowCount={(MResultData && (MResultData.total || 20)) || 0}
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

export default MainsResult