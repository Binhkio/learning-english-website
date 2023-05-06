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
import { Typography } from '@mui/material';
import QuizzListComponent from './quiz-list';
import NotificationComponent from 'components/notification';
import handlePayload from 'utils/handle-payload';
import { useRef } from 'react';

function Manage() {
    const notiRef = useRef();

    const [listUser, setListUser] = useState([]);

    const [quizzData, setQuizzData] = useState([]);

    useEffect(() => {
        const getListUser = async () => {
            try {
                const response = await api.adminApi.getListUser();
                const payload = handlePayload(response.data);
                setListUser(payload.data);
            } catch (error) {
                console.log(error);
            }
        };
        getListUser();

        const getQuizInfo = async () => {
            try {
                const response = await api.quizApi.getAllQuizzes();
                const payload = handlePayload(response.data);
                setQuizzData(payload.data);
            } catch (error) {
                console.log(error);
            }
        };

        getQuizInfo();
    }, []);

    const handleChangeListUser = (row) => {
        const newListUser = listUser.map((item) => {
            if (item._id === row._id) item.status = row.status;
            return item;
        });
        setListUser(newListUser);
    };

    const handleStatusChange = async (row) => {
        const params = {
            _id: row._id,
            data: {
                status: row.status === 1 ? 0 : 1,
            },
        };

        try {
            const response = await api.adminApi.editUserData(params);
            const payload = handlePayload(response.data);
            row.status === 1 ? (row.status = 0) : (row.status = 1);
            handleChangeListUser(row);

            let notiText = '';
            row.status === 1 ? (notiText = 'User is available') : (notiText = 'User is now not able to use this app');
            notiRef.current.setState(notiText);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (row) => {
        const params = {
            _id: row._id,
        };

        try {
            const response = await api.adminApi.deleteUser(params);
            const payload = handlePayload(response.data);
            notiRef.current.setState(payload.data.message);
            const filteredArray = listUser.filter((item) => item._id !== row._id);
            setListUser(filteredArray);
        } catch (error) {}
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
                    <NotificationComponent ref={notiRef} />
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
