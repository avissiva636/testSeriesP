import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Box, Button, useTheme } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetSpecificPsQuestionQuery, useUpdatePsQuestionMutation } from 'state/apiDevelopmentSlice';
import { useEffect, useReducer, useState } from 'react';
import { cloneDeep } from 'lodash'

function createData(sno, question, options, correctAns, explanation, difficulty) {
    const optionData = options.reduce((acc, obj, index) => {
        acc[`option${index + 1}`] = obj;
        return acc;
    }, {});

    return { sno, question, options: optionData, correctAns, explanation, difficulty };
}

const psQuestionActions = {
    CREATE: "Create Ps Question",
    UPDATE: "Update Ps Question",
    UPDATE_OPTION: "Update Ps Question Option",
    UPDATE_ALL: "Update All Ps Questions"
}

function psQuestionReducer(psQuestions, action) {
    switch (action.type) {
        case psQuestionActions.UPDATE:
            const updatedPsQuestions = [...psQuestions]
            updatedPsQuestions[action.payload.rowIndex][action.payload.columnName] = action.payload.updateValue;
            return updatedPsQuestions;
        case psQuestionActions.UPDATE_OPTION:
            const updatedPsQuestionOptions = [...psQuestions]
            updatedPsQuestionOptions[action.payload.rowIndex].options[action.payload.columnName] = action.payload.updateValue;
            return updatedPsQuestionOptions;
        case psQuestionActions.UPDATE_ALL:
            const updateNewData = action.payload.newData;
            return [...updateNewData];
        default:
            return psQuestions
    }
}


export default function AddPrelimsQuestions() {

    const theme = useTheme();

    const [searchParams] = useSearchParams();
    const qpId = decodeURIComponent(searchParams.get('id'));
    const qpTitle = decodeURIComponent(searchParams.get('title'));
    const numberOfOptions = decodeURIComponent(searchParams.get('nOptions'));
    const numberOfQuestions = decodeURIComponent(searchParams.get('nQuestions'));

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    //Reducer
    const psquestionFormat = createData(1, '', Array(parseInt(numberOfOptions)).fill(" "), "", "", "");
    const initialPsQuestionItems = Array(parseInt(numberOfQuestions))
        .fill()
        .map((_, index) => ({
            ...psquestionFormat,
            sno: psquestionFormat.sno + index
        }))
    const [psQuestionState, psQuestionDispatch] = useReducer(psQuestionReducer, initialPsQuestionItems);

    const { isLoading: isPsQuestionLoading, data: psQuestionData } = useGetSpecificPsQuestionQuery({ pQuesId: qpId });
    const [updatePsQuestions] = useUpdatePsQuestionMutation();

    useEffect(() => {
        if (!isPsQuestionLoading) {
            if (psQuestionData.length > 0) {
                console.log("useEffect")
                psQuestionDispatch({
                    type: psQuestionActions.UPDATE_ALL,
                    payload: {
                        newData: cloneDeep(psQuestionData[0].questions)
                    }
                })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [isPsQuestionLoading])


    const optionColumns = Array.from({ length: numberOfOptions }, (_, index) => ({
        id: `option${index + 1}`,
        label: `Option ${index + 1}`,
        minWidth: 100,
        format: (value) => <input defaultValue={value} />
    }));

    const columns = [
        {
            id: 'sno',
            label: 'S.No',
            minWidth: 50,
            format: (value, rowIndex) => value,
        },
        {
            id: 'question',
            label: 'Question',
            minWidth: 170,
        },
        ...optionColumns,
        {
            id: 'correctAns',
            label: 'Correct Answer',
            minWidth: 150,
        },
        {
            id: 'explanation',
            label: 'Explanation',
            minWidth: 200,
            align: 'center',
        },
        {
            id: 'difficulty',
            label: 'Difficulty',
            minWidth: 100,
            align: 'center',
        },

    ];

    const handleSubmit = async () => {
        if (!psQuestionState || !qpId || !qpTitle) {
            alert("All fields are mandatory");
            return;
        }

        try {
            setButtonDisabled(true);
            await updatePsQuestions({
                psQuestionId: qpId, createQuestions: {
                    pqDesc: qpId,
                    questions: psQuestionState
                }
            }).unwrap()
                .then(() => setButtonDisabled(false));
            navigate('/listprelimsseries', { replace: true });

        } catch (error) {
            setButtonDisabled(false);
            if (error.status === 400) {
                alert("Give proper data");
            }
        }
    }

    return (
        isPsQuestionLoading ? <p>Loading</p> : (<Box m="1.5rem 2.5rem">
            <Button
                variant="contained"
                size='large'
                onClick={handleSubmit}
                disabled={buttonDisabled}
                sx={{
                    ml: 'auto', width: '120px',
                    backgroundColor: theme.palette.neutral.main
                }}
            >
                Submit
            </Button>

            <Table stickyHeader aria-label="sticky table" sx={{ marginTop: '1rem' }}>
                <TableHead >
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                    top: 57,
                                    minWidth: column.minWidth,
                                    color: theme.palette.primary[100],
                                    border: `1px solid ${theme.palette.background.alt}`,
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        <TableCell
                            key={crypto.randomUUID()}
                            align={columns[0].align}
                            style={{
                                top: 57, minWidth: columns[0].minWidth,
                                color: theme.palette.primary[100],
                                border: `1px solid ${theme.palette.background.alt}`,
                                fontWeight: 'bold',
                            }}
                        >
                            {columns[0].label}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody >
                    {psQuestionState
                        .map((row, index) => {
                            return (
                                <TableRow key={index} hover role="checkbox" tabIndex={-1} >
                                    {columns.map((column) => {
                                        let value;
                                        let mappingOption = column.id.startsWith("option") ? "option" : column.id;
                                        if (mappingOption === "option") {
                                            value = row.options[column.id];
                                        }
                                        else {
                                            value = row[column.id];
                                        }

                                        switch (mappingOption) {
                                            case "sno":
                                                return (<TableCell key={column.id} align={column.align}
                                                    style={{
                                                        border: `1px solid ${theme.palette.background.alt}`
                                                    }}
                                                >
                                                    {value}
                                                </TableCell>)
                                            case "question":
                                                return (<TableCell key={column.id} align={column.align}
                                                    style={{
                                                        border: `1px solid ${theme.palette.background.alt}`
                                                    }}
                                                >
                                                    <textarea
                                                        id={crypto.randomUUID()}
                                                        value={value}
                                                        onChange={(e) => psQuestionDispatch({
                                                            type: psQuestionActions.UPDATE,
                                                            payload: {
                                                                rowIndex: index,
                                                                columnName: "question",
                                                                updateValue: e.target.value,
                                                            }
                                                        })}
                                                        style={{
                                                            backgroundColor: 'inherit',
                                                            color: theme.palette.primary[100],
                                                            border: `1px solid ${theme.palette.primary[400]}`,
                                                        }}
                                                    />
                                                </TableCell>)
                                            case "option":
                                                return (<TableCell key={column.id} align={column.align}
                                                    style={{
                                                        border: `1px solid ${theme.palette.background.alt}`
                                                    }}
                                                >
                                                    <input
                                                        id={crypto.randomUUID()}
                                                        value={value}
                                                        onChange={(e) => psQuestionDispatch({
                                                            type: psQuestionActions.UPDATE_OPTION,
                                                            payload: {
                                                                rowIndex: index,
                                                                columnName: column.id,
                                                                updateValue: e.target.value,
                                                            }
                                                        })}
                                                        style={{
                                                            backgroundColor: 'inherit',
                                                            color: theme.palette.primary[100],
                                                            border: `1px solid ${theme.palette.primary[400]}`,
                                                            height: '30px',
                                                            width: '150px',
                                                        }}
                                                    />

                                                </TableCell>)
                                            case "correctAns":
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                        style={{
                                                            border: `1px solid ${theme.palette.background.alt}`
                                                        }}
                                                    >
                                                        <select
                                                            id={crypto.randomUUID()}
                                                            value={value || ''}
                                                            onChange={(e) => psQuestionDispatch({
                                                                type: psQuestionActions.UPDATE,
                                                                payload: {
                                                                    rowIndex: index,
                                                                    columnName: column.id,
                                                                    updateValue: e.target.value,
                                                                }
                                                            })}
                                                            style={{
                                                                backgroundColor: 'inherit',
                                                                color: theme.palette.primary[100],
                                                                border: `1px solid ${theme.palette.primary[400]}`,
                                                            }}
                                                        >
                                                            {optionColumns.map((cAOption) => {
                                                                return <option key={crypto.randomUUID()} value={cAOption.id}
                                                                    style={{ backgroundColor: theme.palette.background.alt }}>
                                                                    {cAOption.label}</option>
                                                            })}
                                                        </select>

                                                    </TableCell>
                                                )
                                            case "explanation":
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                        style={{
                                                            border: `1px solid ${theme.palette.background.alt}`
                                                        }}
                                                    >
                                                        <input
                                                            id={crypto.randomUUID()}
                                                            value={value}
                                                            onChange={(e) => psQuestionDispatch({
                                                                type: psQuestionActions.UPDATE,
                                                                payload: {
                                                                    rowIndex: index,
                                                                    columnName: column.id,
                                                                    updateValue: e.target.value,
                                                                }
                                                            })}
                                                            style={{
                                                                backgroundColor: 'inherit',
                                                                color: theme.palette.primary[100],
                                                                border: `1px solid ${theme.palette.primary[400]}`,
                                                                height: '30px',
                                                                width: '150px',
                                                            }}
                                                        />
                                                    </TableCell>
                                                )
                                            case "difficulty":
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                        style={{
                                                            border: `1px solid ${theme.palette.background.alt}`
                                                        }}
                                                    >
                                                        <select
                                                            id={crypto.randomUUID()}
                                                            value={value || ''}
                                                            onChange={(e) => psQuestionDispatch({
                                                                type: psQuestionActions.UPDATE,
                                                                payload: {
                                                                    rowIndex: index,
                                                                    columnName: column.id,
                                                                    updateValue: e.target.value,
                                                                }
                                                            })}
                                                            style={{
                                                                backgroundColor: 'inherit',
                                                                color: theme.palette.primary[100],
                                                                border: `1px solid ${theme.palette.primary[400]}`,
                                                            }}
                                                        >
                                                            <option key={crypto.randomUUID()} value={"easy"}
                                                                style={{ backgroundColor: theme.palette.background.alt }}>
                                                                Easy
                                                            </option>
                                                            <option key={crypto.randomUUID()} value={"medium"}
                                                                style={{ backgroundColor: theme.palette.background.alt }}>
                                                                Medium
                                                            </option>
                                                            <option key={crypto.randomUUID()} value={"hard"}
                                                                style={{ backgroundColor: theme.palette.background.alt }}>
                                                                Hard
                                                            </option>
                                                        </select>
                                                    </TableCell>
                                                )
                                            default:
                                                return null;
                                        }

                                    })}

                                    {
                                        <TableCell key={columns[0].id} align={columns[0].align}
                                            style={{
                                                border: `1px solid ${theme.palette.background.alt}`
                                            }}
                                        >
                                            {
                                                row[columns[0].id]
                                            }

                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </Box>)

    );
}


