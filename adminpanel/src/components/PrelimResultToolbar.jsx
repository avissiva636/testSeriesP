import React from 'react'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector } from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'
import {
    // Button,
    IconButton, InputAdornment, TextField
} from '@mui/material'
import { Search } from '@mui/icons-material'
// import { Link } from 'react-router-dom'


export const PrelimResultToolbar = ({ search, setSearch, setServerSearch }) => {
    // const queryString = new URLSearchParams({
    //     id: psDescId,
    //     title: psDescTitle,
    // }).toString();

    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton />
                    <GridToolbarDensitySelector />
                    {/* <Button
                        variant="text"
                        color='inherit'
                        disableElevation
                        component={Link}
                        to={`/add_${seriesName}_qp_description?${queryString}`}                        
                    >
                        Add Qp
                    </Button> */}
                </FlexBetween>
                <TextField
                    label="search..."
                    sx={{ mb: "0.5rem", width: "15rem" }}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setServerSearch(search);
                                        setSearch("");
                                    }
                                    }>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    )
}