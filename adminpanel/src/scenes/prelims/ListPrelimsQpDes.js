import { Box, Button, IconButton, useTheme } from '@mui/material';
import Header from 'components/Header';
import React, { useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { useDeletePSeriesDesStatusMutation, useGetSpecificPdescsQuery, useUpdatePSeriesDesStatusMutation } from 'state/apiDevelopmentSlice';
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

const ListPrelimsQpDes = () => {
    const isNonMobile = useOutletContext();

    const [searchParams] = useSearchParams();
    const psDescId = searchParams.get('id');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const { isLoading: isPSDescLoading, data: PsDescData } = useGetSpecificPdescsQuery({ pDesId: psDescId });
    const [deletePSeriesDes] = useDeletePSeriesDesStatusMutation();
    const [updatePQpSeries] = useUpdatePSeriesDesStatusMutation();

    const deleteClick = async ({ id, title, schedule }) => {

        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmation) {
            await deletePSeriesDes({ pDesId: id, imgName: schedule });
        }
    }

    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const data = !search.length ? PsDescData : searchResult;

    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (search !== "") {
            const newDataList = PsDescData.filter((paperDataChunk) => {

                return Object.values(paperDataChunk).join(" ").toLocaleLowerCase().includes(search.toLocaleLowerCase());
            })
            setSearchResult(newDataList);
        }
        else {
            setSearchResult(PsDescData);
        }

    };

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const updatePQpStatus = async (pQpNewStatus, pqStatusUpdateId) => {
        if (!pQpNewStatus) {
            alert("Give Status");
            return;
        }
        const formData = new FormData();
        formData.append('status', pQpNewStatus);

        try {
            setButtonDisabled(true);
            await updatePQpSeries({
                pDesId: pqStatusUpdateId,
                updateFormData: formData
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
            field: "add questions",
            headerName: "Add Questions",
            flex: 1,
            renderCell: (params) => {
                const queryString = new URLSearchParams({
                    id: encodeURIComponent(params.row._id),
                    title: encodeURIComponent(params.row.title),
                    nOptions: encodeURIComponent(params.row.nOptions),
                    nQuestions: encodeURIComponent(params.row.nQuestions)
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
            field: "results",
            headerName: "Results",
            flex: 0.5,
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
                        {/* submitted results*/}
                        <Link to={`/list__qp_desription?${queryString}`}
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
                                updatePQpStatus("stop", params.row._id)
                            }
                            else if (paramStatus === "stop") {
                                updatePQpStatus("start", params.row._id)
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
                    pSeriesId: psDescId,
                    id: encodeURIComponent(params.row._id),
                    title: searchParams.get('title'),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/edit_prelims_qp_description?${queryString}`}
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
                            // schedule: params.row.schedule,
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
            <Header title="PRELIMS QP" subtitle="List Prelims Qp" isNavigate={true} />

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
                    loading={isPSDescLoading || !PsDescData}
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
                        toolbar: { search, searchHandler, psDescId: psDescId, psDescTitle: searchParams.get('title'), }
                    }}

                    getRowClassName={getRowClassName}
                    disableRowSelectionOnClick
                />
            </Box>

        </Box>
    )
}

export default ListPrelimsQpDes