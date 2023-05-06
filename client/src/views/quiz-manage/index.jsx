import MainCard from 'ui-component/cards/MainCard';
import CreateQuizModalButton from '../../components/Quiz/CreateQuizModalButton';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import api from 'api';
import { Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import QuizRowComponent from 'components/Quiz/QuizRowComponent';

const Title = ({handleChangeRow}) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <span>Quản lý bài học</span>
    <CreateQuizModalButton
      handleChangeRow={handleChangeRow}
    />
  </Stack>
)

function QuizManage() {
  const [quizzes, setQuizzes] = useState([])
  const [render, setRender] = useState(false)

  const [notificationState, setNotificationState] = useState({
    isReloead: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { isReloead, vertical, horizontal } = notificationState;

  const handleCloseNotification = () => {
    setNotificationState({ ...notificationState, isReloead: false });
  };

  useEffect(() => {
    async function getQuizzes() {
      try {
        const response = await api.quizApi.getAllQuizzes()
        const quizzesData = response.data.data
        setQuizzes(quizzesData)
      } catch (error) {
        console.error(error);        
      }
    }

    getQuizzes()
  }, [render])

  return (
    <>
      <MainCard title={<Title handleChangeRow={() => {setRender(!render)}} />}>
        {quizzes.length > 0 ? (
            <>
                <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="collapsible table">
                      <TableHead>
                          <TableRow>
                              <TableCell/>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">Creator</TableCell>
                              <TableCell align="center">Status</TableCell>
                              <TableCell align="center">Edit</TableCell>
                              <TableCell align="center">Delete</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {quizzes.map((row, index) => (
                              <QuizRowComponent
                                bgColor={index % 2 === 0 ? '#ffffff' : '#f8f8f8' }
                                key={row._id}
                                row={row}
                                handleChangeRow={() => {setRender(!render)}}
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
                variant="h3"
                sx={{ display: 'flex', justifyContent: 'center' }}>
                Please add more quiz to manage
            </Typography>
        )}
      </MainCard>
    </>
  );
}

export default QuizManage;
