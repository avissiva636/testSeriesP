import { Box, IconButton, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import React, { useState } from 'react'
// import { Batch as batchData } from 'data'
import { TwoFieldDGC as DataGridCustomToolbar } from 'components/TwoFieldDGC'
import { CreateRounded, DeleteRounded } from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween'
import { Link } from 'react-router-dom'
import { useDeleteBatchMutation, useGetBatchesQuery } from 'state/apiDevelopmentSlice'


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

const ListBatches = () => {
    const theme = useTheme();
    // const data = batchData;
    const { isLoading, data: batchData } = useGetBatchesQuery();
    const [deleteBatch] = useDeleteBatchMutation();
    
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const data = !search.length ? batchData : searchResult;

    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (search !== "") {
            const newDataList = batchData.filter((batchDataChunk) => {

                return Object.values(batchDataChunk).join(" ").toLocaleLowerCase().includes(search.toLocaleLowerCase());
            })
            setSearchResult(newDataList);
        }
        else {
            setSearchResult(batchData);
        }

    };

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 6,
    });

    const deleteClick = async ({ id, title }) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmation) {
            await deleteBatch(id);
        }
    }

    const columns = [
        {
            field: "sno",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "course",
            headerName: "COURSE",
            flex: 1.5,
            valueGetter: (params) => params.row?.course?.name,
        },
        {
            field: "name",
            headerName: "BATCH",
            flex: 1.5,
        },
        {
            field: "description",
            headerName: "DESCRIPTION",
            flex: 1.5,
        },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                const queryString = new URLSearchParams({
                    id: encodeURIComponent(params?.row?._id),
                    course: encodeURIComponent(params?.row?.course?._id),
                    batch: encodeURIComponent(params?.row?.name),
                    description: encodeURIComponent(params?.row?.description)
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/editbatch/${params?.row?._id}?${queryString}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                            <CreateRounded />
                        </Link>
                    </IconButton>

                    <IconButton
                        onClick={() => deleteClick({
                            id: params?.row?._id,
                            title: params?.row?.name,
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <DeleteRounded />
                    </IconButton>
                    {/* <span>Edit {params.row.id} - {params.row.title}</span> */}
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
        <Box m="1.5rem 2.5rem">
            <Header title="BATCHES" subtitle="Entire list of batches" />

            <Box height="68vh"
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
                        borderBottom: "none"
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
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    // loading={!data}
                    getRowId={(row) => row?._id}
                    rows={(data) || []}
                    columns={columns}

                    rowCount={(data && (data.length || 0)) || 0}

                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 6, 10, 15]}

                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { search, searchInput, setSearchInput, setSearch, searchHandler }
                    }}

                    getRowClassName={getRowClassName}
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    )
}

export default ListBatches