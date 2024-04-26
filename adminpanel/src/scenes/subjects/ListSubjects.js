import { Box, IconButton, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import React, { useState } from 'react'
// import { subject as subjectData } from 'data'
import { TwoFieldDGC as DataGridCustomToolbar } from 'components/TwoFieldDGC'
import { CreateRounded, DeleteRounded } from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween'
import { Link } from 'react-router-dom'
import { useDeleteSubjectMutation, useGetSubjectsQuery } from 'state/apiDevelopmentSlice'


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

const ListSubjects = () => {
    const theme = useTheme();
    // const data = subjectData;
    const { isLoading, data: subjectData } = useGetSubjectsQuery();
    const [deleteSubject] = useDeleteSubjectMutation();


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

    const deleteClick = async ({ id, title }) => {

        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmation) {
            await deleteSubject(id);
        }
    }

    const columns = [
        {
            field: "sno",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "name",
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
            renderCell: (params) => {

                const queryString = new URLSearchParams({
                    id: encodeURIComponent(params.row._id),
                    title: encodeURIComponent(params.row.name),
                    description: encodeURIComponent(params.row.description)
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/editsubjects/${params.row._id}?${queryString}`}
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
                            title: params.row.name,
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <DeleteRounded />
                    </IconButton>
                </FlexBetween >)
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
            <Header title="SUBJECTS" subtitle="Entire list of subjects" />

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
                    getRowId={(row) => row._id}
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

export default ListSubjects