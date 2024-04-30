import React, { useState } from 'react'
import { CreateRounded, DeleteRounded } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'
import FlexBetween from 'components/FlexBetween';
// import { PrelimsList as subjectData } from 'data'
import { DataGrid } from '@mui/x-data-grid';
import { TwoFieldDGC as DataGridCustomToolbar } from 'components/TwoFieldDGC'
import { Link } from 'react-router-dom';

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

const ListPaperTemplate = ({ paperData, paperName, paperLoading, deleteClick }) => {
    const theme = useTheme();
    // const data = paperData;


    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const data = !search.length ? paperData : searchResult;

    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (search !== "") {
            const newDataList = paperData.filter((paperDataChunk) => {

                return Object.values(paperDataChunk).join(" ").toLocaleLowerCase().includes(search.toLocaleLowerCase());
            })
            setSearchResult(newDataList);
        }
        else {
            setSearchResult(paperData);
        }

    };

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const editClick = ({ id, title, description }) => {
        console.log("Editing", id, title, description);
    };

    // const deleteClick = ({ id, title, description }) => {
    //     console.log("Deleting", id, title, description);
    // }

    const columns = [
        {
            field: "sno",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "title",
            headerName: "TITLE",
            flex: 2,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "description",
            headerName: "DESCRIPTION",
            flex: 3,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "status",
            headerName: "STATUS",
            flex: 0.5,
        },
        {
            field: "paid",
            headerName: "PAID",
            flex: 0.5,
        },
        {
            field: "Add Question Paper",
            headerName: "Add Question Paper",
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <FlexBetween gap={'1rem'}>
                    <IconButton
                        onClick={() => editClick({
                            id: params.row._id,
                            title: params.row.title,
                            description: params.row.description
                        })}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <CreateRounded />
                    </IconButton>
                </FlexBetween>
            )

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
                    title: encodeURIComponent(params.row.title),
                    description: encodeURIComponent(params.row.description),
                    status: encodeURIComponent(params.row.status),
                    paid: encodeURIComponent(params.row.paid),
                    price: encodeURIComponent(params.row.price),
                    paymentLink: encodeURIComponent(params.row.paymentLink),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/edit${paperName}series/${params.row.id}?${queryString}`}
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
                            schedule: params.row.schedule,
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
                loading={paperLoading || !paperData}
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
    )
}

export default ListPaperTemplate