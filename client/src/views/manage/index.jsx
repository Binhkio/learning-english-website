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
import { FormControlLabel, Snackbar, Switch, Typography } from '@mui/material';

function Manage() {
  const [listUser, setListUser] = useState([]);
  const [notificationState, setNotificationState] = useState({
    isReloead: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { isReloead, vertical, horizontal } = notificationState;

  useEffect(() => {
    const getListUser = async () => {
      await api.adminApi
        .getListUser()
        .then((response) => {
          const payload = response.data.data;
          setListUser(payload);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getListUser();
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
    <MainCard title="Quản lý ngừoi dùng">
      {listUser.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Delete user</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUser.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                        labelPlacement="start"
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
