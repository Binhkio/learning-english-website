import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect } from 'react';
import api from 'api';
import { useState } from 'react';
import { Snackbar, Switch, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { Box } from '@mui/system';
import userUtils from 'utils/user';

const QuizzListComponent = (props) => {
    const { row, quizzData, handleStatusChange, handleDeleteUser } = props;
    const [open, setOpen] = useState(false);

    const handleCheckProcess = (quiz) => {
        if (row.quizzes.includes(quiz._id))
            return 'ĐÃ HỌC'
        return 'CHƯA HỌC'
    }

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
                                                { item.name }
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

function Manage() {
    const [listUser, setListUser] = useState([]);
    const [notificationState, setNotificationState] = useState({
        isReloead: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { isReloead, vertical, horizontal } = notificationState;

    const [quizzData, setQuizzData] = useState([]);

    useEffect(() => {
        const getListUser = async () => {
            await api.adminApi
                .getListUser()
                .then((response) => {
                    const payload = response.data.data;
                    console.log(payload);
                    setListUser(payload);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getListUser();

        const getQuizInfo = async () => {
            await api.quizApi.getAllQuizzes().then((response) => {
                console.log(response);
                const payload = response.data.data;
                setQuizzData(payload);
            });
        };

        getQuizInfo();
    }, []);

    const handleCloseNotification = () => {
        setNotificationState({ ...notificationState, isReloead: false });
    };

    const handleStatusChange = async (row) => {
        const params = {
            _id: row._id,
            data: {
                status: row.status === 1 ? 0 : 1,
            },
        };
        await api.adminApi
            .editUserData(params)
            .then((response) => {
                const payload = response.data.data;
                setSnackbarMessage(payload.message);
                setNotificationState({ ...notificationState, isReloead: true });
                row.status === 1 ? (row.status = 0) : (row.status = 1);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setNotificationState({ ...notificationState, isReloead: true });
            });
    };

    const handleDeleteUser = async (row) => {
        const params = {
            _id: row._id,
        };
        await api.adminApi
            .deleteUser(params)
            .then((response) => {
                const payload = response.data.data;
                setSnackbarMessage(payload.message);
                setNotificationState({ ...notificationState, isReloead: true });
                const filteredArray = listUser.filter((item) => item._id !== row._id);
                setListUser(filteredArray);
            })
            .catch((error) => {
                setSnackbarMessage(error.message);
                setNotificationState({ ...notificationState, isReloead: true });
            });
    };

    return (
        <MainCard title="Quản lý người dùng">
            {listUser.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Email</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Delete user</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listUser.map((row) => (
                                    <QuizzListComponent
                                        key={row._id}
                                        row={row}
                                        quizzData={quizzData}
                                        handleDeleteUser={handleDeleteUser}
                                        handleStatusChange={handleStatusChange}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={isReloead}
                        onClose={handleCloseNotification}
                        message={snackbarMessage}
                        key={vertical + horizontal}
                    />
                </>
            ) : (
                <Typography
                    variant="h2"
                    component="h3"
                    sx={{ display: 'flex', justifyContent: 'center' }}>
                    Please add more user to manage
                </Typography>
            )}
        </MainCard>
    );
}

export default Manage;
