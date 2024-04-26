import React from 'react'
import FlexBetween from './FlexBetween'
import { Button, Divider, MenuItem, TextField } from '@mui/material'

const StudentListSearchComponent = ({ theme, searchStudent, handleSearchChange, handleSearchButton }) => {
    return (
        <>
            {/* Search Box */}
            <FlexBetween sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                mx: '1rem'
            }}>

                {/* UserName */}
                <TextField
                    label={`Username`}
                    name='userName'
                    value={searchStudent.userName}
                    onChange={(e) => handleSearchChange(e)}
                    variant='outlined'
                    sx={{ my: '0.5rem', ml: '0.5rem' }}

                />

                {/* UserId */}
                <TextField
                    label={`UserId`}
                    name='userId'
                    value={searchStudent.userId}
                    onChange={(e) => handleSearchChange(e)}
                    variant='outlined'
                    sx={{ my: '0.5rem', ml: '0.5rem' }}

                />

                {/* Email */}
                <TextField
                    label={`Email`}
                    name='userEmail'
                    value={searchStudent.userEmail}
                    onChange={(e) => handleSearchChange(e)}
                    variant='outlined'
                    sx={{ my: '0.5rem', ml: '0.5rem' }}

                />

                {/* DropdownList studentStatus */}
                <TextField
                    id={`studentStatus`}
                    select
                    name='userStatus'
                    value={searchStudent.userStatus}
                    onChange={(e) => handleSearchChange(e)}
                    variant="outlined"
                    sx={{ width: '15rem' }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) => value || 'Select Status'
                    }}
                >
                    <MenuItem id={`studentStatusempty`} value="" >Select Status</MenuItem>
                    <MenuItem id={`studentStatusone`} value="pending" >pending</MenuItem>
                    <MenuItem id={`studentStatustwo`} value="approved" >approved</MenuItem>
                    <MenuItem id={`studentStatusthree`} value="reject" >reject</MenuItem>
                    <MenuItem id={`studentStatusfour`} value="lock" >lock</MenuItem>
                </TextField>


                {/* Search Button*/}
                <Button variant="contained" color="success"
                    size='large'
                    onClick={(e) => {
                        handleSearchButton(e)
                    }}

                    sx={{ mr: '1rem', width: '120px' }}
                >
                    Search
                </Button>
            </FlexBetween>

            <Divider sx={{ mt: '1rem' }} />
        </>
    )
}

export default StudentListSearchComponent