import React, { useState } from 'react'
import { CreateRounded, DeleteRounded } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'
import Header from 'components/Header';
import { TwoFieldDGC as DataGridCustomToolbar } from 'components/TwoFieldDGC';

import { Link, useOutletContext } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteOutlineMutation, useGetOutlinesQuery } from 'state/apiDevelopmentSlice';

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

const ListQpOutline = () => {
    const isNonMobile = useOutletContext();
    const theme = useTheme();

    const { isLoading: isOutlineLoading, data: OutlineData } = useGetOutlinesQuery();
    const [deleteOutline] = useDeleteOutlineMutation();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const data = !search.length ? OutlineData : searchResult;

    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (search !== "") {
            const newDataList = OutlineData.filter((OutlineDataChunk) => {

                return Object.values(OutlineDataChunk).join(" ").toLocaleLowerCase().includes(search.toLocaleLowerCase());
            })
            setSearchResult(newDataList);
        }
        else {
            setSearchResult(OutlineData);
        }

    };

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const deleteClick = async ({ id, title }) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmation) {
            await deleteOutline(id);
        }
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "title",
            headerName: "TITLE",
            flex: 1.5,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "description",
            headerName: "DESCRIPTION",
            flex: 2,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "nOptions",
            headerName: "NO OTIONS",
            flex: 0.5,
        },
        {
            field: "nQuestions",
            headerName: "NO Questions",
            flex: 0.5,
        },
        {
            field: 'Actions',
            headerName: 'ACTIONS',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                const queryString = new URLSearchParams({
                    id: encodeURIComponent(params.row._id),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/editoutline/${params.row._id}?${queryString}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                            <CreateRounded />
                        </Link>
                    </IconButton>

                    <IconButton
                        onClick={() => deleteClick({
                            id: params.row._id,
                            title: params.row.title,
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
            <Header title="QUESTION PAPER OUTLINE" subtitle="List Question Paper Outline" />

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
                    loading={isOutlineLoading || !OutlineData}
                    getRowId={(row) => row._id}
                    rows={(data) || []}
                    columns={columns}

                    autoHeight={true}
                    rowHeight={70}
                    rowCount={(data && (data.length || 20)) || 0}

                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 15]}

                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { search, searchHandler }
                    }}

                    getRowClassName={getRowClassName}
                    disableRowSelectionOnClick
                />
            </Box>

        </Box>
    )
}

export default ListQpOutline