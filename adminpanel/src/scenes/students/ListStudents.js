import { Box, IconButton, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header'
import React, { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import { CreateRounded, DeleteRounded } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteStudentMutation, useGetStudentsQuery } from 'state/apiDevelopmentSlice';
import StudentListSearchComponent from 'components/StudentListSearchComponent';

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

const ListStudents = () => {
    const theme = useTheme();
    const isNonMobile = useOutletContext();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const initialSearchValues = {
        userName: "",
        userId: "",
        userEmail: "",
        userStatus: ""
    };
    const [searchStudent, setSearchStudent] = useState(initialSearchValues);
    const [serverSearch, setServerSearch] = useState("");
    const [studentSort, setStudentSort] = useState({});


    const { isLoading, data: studentList } = useGetStudentsQuery({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sort: JSON.stringify(studentSort),
        search: JSON.stringify(serverSearch)
    });
    const [deleteStudent] = useDeleteStudentMutation();


    // const editClick = ({ id, title, description }) => {
    //     console.log("Editing", id, title, description);
    // };

    const deleteClick = async ({ id, title }) => {
        const confirmation = window.confirm(`Are you sure you want to delete ${title}?`);

        if (confirmation) {
            await deleteStudent(id);
        }
    }

    //onChange of search elements
    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchStudent({ ...searchStudent, [name]: value })
    }

    //clicking search button
    const handleSearchButton = (e) => {
        e.preventDefault();
        setServerSearch(searchStudent);
        setSearchStudent(initialSearchValues);
    }

    const columns = [
        {
            field: "si",
            headerName: "SINO",
            flex: 0.4,
            sortable: false,
            renderCell: (params) => {
                const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.row._id);
                return rowIndex !== null && !isNaN(rowIndex) ? rowIndex + 1 : "...";
            }
        },
        // {
        //     field: "userName",
        //     headerName: "USERNAME",
        //     flex: 1,
        //     renderCell: function (params) {
        //         return (
        //             React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
        //         );
        //     },
        // },
        {
            field: "_id",
            headerName: "USERID",
            flex: 1.1,
            renderCell: function (params) {
                return (
                    React.createElement('div', { style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, params.value)
                );
            },
        },
        {
            field: "name",
            headerName: "NAME",
            flex: 0.9,
        },
        {
            field: "mobile",
            headerName: "MOBILENO",
            flex: 1,
            sortable: false,
        },
        {
            field: "email",
            headerName: "EMAILID",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "status",
            headerName: "STATUS",
            flex: 0.5,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "createdAt",
            headerName: "REGTIME",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                const options = {
                    timeZone: 'Asia/Kolkata',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                };
                return date.toLocaleDateString('en-IN', options);
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.9,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                const queryString = new URLSearchParams({
                    // name: encodeURIComponent(params.row.name),
                    // age: encodeURIComponent(params.row.age),
                    // sex: encodeURIComponent(params.row.sex),
                    // username: encodeURIComponent(params.row.userName),
                    // course:encodeURIComponent(params.row),    
                    // batch:encodeURIComponent(params.row),                
                    // emailid: encodeURIComponent(params.row.email),
                    // mobileno: encodeURIComponent(params.row.mobile),
                    // telephone: encodeURIComponent(params.row.telephone),
                    // status: encodeURIComponent(params.row.status),
                    userId: encodeURIComponent(params.row._id),
                }).toString();

                return (<FlexBetween gap={'1rem'}>
                    <IconButton
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                        }}>
                        <Link to={`/editstudents/${params.row._id}?${queryString}`}
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
                            title: params.row.userName,
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
            <Header title="LIST STUDENTS" subtitle="Entire List of Students" />

            <Box mt="1rem" sx={{
                bgcolor: theme.palette.background.alt,
                py: '1rem'
            }}>

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
                        loading={isLoading || !studentList}
                        getRowId={(row) => row._id}
                        rows={(studentList && studentList.students) || []}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        rowCount={(studentList && (studentList.total || 20)) || 0}
                        pageSizeOptions={[5, 10, 15]}
                        pagination
                        paginationMode='server'
                        sortingMode='server'
                        onSortModelChange={(newSortModel) => setStudentSort(...newSortModel)}

                        slots={{ toolbar: StudentListSearchComponent }}
                        slotProps={{
                            toolbar: { theme, searchStudent, handleSearchChange, handleSearchButton }
                        }}

                        autoHeight={true}
                        rowHeight={70}
                        getRowClassName={getRowClassName}
                        disableRowSelectionOnClick
                    />
                </Box>

            </Box>
        </Box>
    )
}

export default ListStudents