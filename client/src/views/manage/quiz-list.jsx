import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Switch, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { Box } from '@mui/system';

const QuizzListComponent = ({ row, quizzData, handleStatusChange, handleDeleteUser }) => {
    const [open, setOpen] = useState(false);

    const handleCheckProcess = (quiz) => {
        if (row.quizzes.includes(quiz._id)) return 'ĐÃ HỌC';
        return 'CHƯA HỌC';
    };

    return (
        <>
            <TableRow
                key={row.name}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& > *': { borderBottom: 'unset' },
                }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row">
                    {row.email}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                    <Switch
                        checked={row.status === 1 ? true : false}
                        onClick={() => handleStatusChange(row)}
                        sx={{
                            '& .MuiSwitch-track': {
                                bgcolor: 'grey.500',
                            },
                            '& .MuiSwitch-thumb': {
                                bgcolor: row.status === 1 ? true : false ? 'primary.main' : 'grey.500',
                            },
                            m: 1,
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        label="On"
                    />
                </TableCell>
                <TableCell align="right">
                    <Typography
                        component="a"
                        variant="p"
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => handleDeleteUser(row)}>
                        Delete
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                component="div"
                                variant="h4"
                                gutterBottom>
                                Learning's History
                            </Typography>
                            <Table
                                size="small"
                                aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quiz's name</TableCell>
                                        <TableCell>Process</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quizzData.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell
                                                component="th"
                                                scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell>{handleCheckProcess(item)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default QuizzListComponent;
