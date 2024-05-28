import { Box, Button, IconButton, useTheme } from '@mui/material';
import Header from 'components/Header';
import React, { useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { useDeleteMSeriesDesStatusMutation, useGetSpecificMdescsQuery, useUpdateMSeriesDesStatusMutation } from 'state/apiDevelopmentSlice';
import { PrelimQp as DataGridCustomToolbar } from 'components/PrelimQp'
import { makeStyles } from '@mui/styles';
import FlexBetween from 'components/FlexBetween';
import { CreateRounded, DeleteRounded } from '@mui/icons-material';
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

const ListMainsQpDes = () => {
    const isNonMobile = useOutletContext();

    const [searchParams] = useSearchParams();
    const msDescId = searchParams.get('id');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const { isLoading: isMSDescLoading, data: MsDescData } = useGetSpecificMdescsQuery({ mDesId: msDescId });
    const [deleteMSeriesDes] = useDeleteMSeriesDesStatusMutation();
    const [updateMQpSeries] = useUpdateMSeriesDesStatusMutation();

    const deleteClick = async ({ id, title, schedule }) => {

        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmation) {
            await deleteMSeriesDes({ mDesId: id, imgName: schedule });
        }
    }

    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const data = !search.length ? MsDescData : searchResult;

    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (search !== "") {
            const columnsToSearch = ['title', 'status'];
            const newDataList = MsDescData.filter((paperDataChunk) => {
                return columnsToSearch.some(column => paperDataChunk[column].toLocaleLowerCase().includes(search.toLocaleLowerCase()));
            })
            setSearchResult(newDataList);
        }
        else {
            setSearchResult(MsDescData);
        }

    };

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const updateMQpStatus = async (mQpNewStatus, mqStatusUpdateId) => {
        if (!mQpNewStatus) {
            alert("Give Status");
            return;
        }

        try {
            setButtonDisabled(true);
            await updateMQpSeries({
                mDesId: mqStatusUpdateId,
                status: mQpNewStatus
            }).unwrap()
                .then(() => {
                    setButtonDisabled(false)
                });

        } catch (error) {
            setButtonDisabled(false);
            if (error.status === 400) {
                alert("Give proper data");
            }
        }

    }

    const columns = [
        {
            field: "sno",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "title",
            headerName: "Title",
            flex: 3,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "answer sheets",
            headerName: "Answer Sheets",
            flex: 1,
            renderCell: (params) => {
                const queryString = new URLSearchParams({
                    id: encodeURIComponent(params.row._id),
                    title: encodeURIComponent(params.row.title),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        {/* list_prelims_qp_desription paperName*/}
                        <Link to={`/add_prelims_question?${queryString}`}
                            style={{
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                            <CreateRounded />
                        </Link>
                    </IconButton>
                </FlexBetween>)
            },
        },
        {
            field: "status",
            headerName: "Start Exam",
            flex: 1,
            renderCell: (params) => {
                const paramStatus = params.row.status;

                return (<FlexBetween gap={'1rem'}>
                    <Button variant="text" color='inherit' disableElevation
                        disabled={buttonDisabled}
                        onClick={() => {
                            if (paramStatus === "start") {
                                updateMQpStatus("stop", params.row._id)
                            }
                            else if (paramStatus === "stop") {
                                updateMQpStatus("start", params.row._id)
                            }
                        }}>
                        {paramStatus}
                    </Button>
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
                    mSeriesId: msDescId,
                    id: encodeURIComponent(params.row._id),
                    title: searchParams.get('title'),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/edit_mains_qp_description?${queryString}`}
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
        <Box m="1.5rem 2.5rem" height={isNonMobile ? undefined : '80%'}>
            <Header title="MAINS QP" subtitle="List Mains Qp" isNavigate={true} />

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
                    loading={isMSDescLoading || !MsDescData}
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
                        toolbar: { search, searchHandler, psDescId: msDescId, psDescTitle: searchParams.get('title'), seriesName: 'mains' }
                    }}

                    getRowClassName={getRowClassName}
                    disableRowSelectionOnClick
                />
            </Box>

        </Box>
    )
}

export default ListMainsQpDes