import { Box, IconButton, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import React, { useState } from 'react'
import { subject as subjectData } from 'data'
import {TwoFieldDGC as DataGridCustomToolbar} from 'components/TwoFieldDGC'
import { CreateRounded, DeleteRounded } from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween'


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

const ListCourses = () => {
    const theme = useTheme();
    // const data = subjectData;


    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const data = !search.length ? subjectData : searchResult;

    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (search !== "") {
            const newDataList = subjectData.filter((SubjectDataChunk) => {

                return Object.values(SubjectDataChunk).join(" ").toLocaleLowerCase().includes(search.toLocaleLowerCase());
            })
            setSearchResult(newDataList);
        }
        else {
            setSearchResult(subjectData);
        }

    };

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 6,
    });

    const editClick = ({ id, title, description }) => {
        console.log("Editing", id, title, description);
    };

    const deleteClick = ({ id, title, description }) => {
        console.log("Deleting", id, title, description);
    }

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "title",
            headerName: "TITLE",
            flex: 1.5,
        },
        {
            field: "description",
            headerName: "DESCRIPTION",
            flex: 1.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <FlexBetween gap={'1rem'}>
                    <IconButton
                        onClick={() => editClick({
                            id: params.row.id,
                            title: params.row.title,
                            description: params.row.description
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <CreateRounded />
                    </IconButton>

                    <IconButton
                        onClick={() => deleteClick({
                            id: params.row.id,
                            title: params.row.title,
                            description: params.row.description
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <DeleteRounded />
                    </IconButton>
                    {/* <span>Edit {params.row.id} - {params.row.title}</span> */}
                </FlexBetween>
            )
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
            <Header title="COURSES" subtitle="Entire list of courses" />

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
                    // loading={isLoading || !data}
                    loading={!data}
                    getRowId={(row) => row.id}
                    rows={(data) || []}
                    columns={columns}

                    rowCount={(data && (data.length || 20)) || 0}

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

export default ListCourses