import MainCard from 'ui-component/cards/MainCard';
import CreateQuizModalButton from './CreateQuizModalButton';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import api from 'api';
import { Collapse, IconButton, Paper, Snackbar, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DeleteOutline, EditOutlined, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import EditQuizButton from './EditQuizButton';

const Title = ({handleChangeRow}) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <span>Quản lý bài học</span>
    <CreateQuizModalButton
      handleChangeRow={handleChangeRow}
    />
  </Stack>
)

const RowComponent = (props) => {
  const { row, handleChangeRow, bgColor } = props;
  const [open, setOpen] = useState(false);

  const handleDeleteQuiz = async (id) => {
    const payload = { _id: id }
    console.log(payload);
    await api.quizApi.deleteQuiz(payload).then((response) => {
      console.log(response);
      handleChangeRow()
    }, (error) => {
      console.log(error);
    })
  }

  const handleDeleteLesson = async (id) => {
    const payload = { _id: id }
    console.log(payload);
    await api.lessonAPi.deleteLesson(payload).then((response) => {
      handleChangeRow()
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  const handleStatusChange = async () => {
    const payload = {
      user_id: JSON.parse(sessionStorage.getItem('userData'))._id,
      _id: row._id,
      status: !row.status,
    }
    await api.quizApi.updateQuiz(payload).then((response) => {
      handleChangeRow()
      console.log(response);
    }, (error) => {
      console.log(error);
    })
  }

  return (
      <>
          <TableRow
              key={row.name}
              sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& > *': { borderBottom: 'unset' },
                  backgroundColor: bgColor,
              }}>
              <TableCell>
                  <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.creator?.name}</TableCell>
              <TableCell align="center">
                  <Switch
                      checked={row.status}
                      onClick={() => {handleStatusChange()}}
                      sx={{
                          '& .MuiSwitch-track': {
                              bgcolor: 'grey.500',
                          },
                          '& .MuiSwitch-thumb': {
                              bgcolor: !!row.status ? 'primary.main' : 'grey.500',
                          },
                          m: 1,
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                      label="On"
                  />
              </TableCell>
              <TableCell align="center" sx={{display:'flex', justifyContent:'space-evenly'}}>
                  <EditQuizButton
                    quiz_id={row._id}
                    default_name={row.name}
                    default_lessons={row.lessons}
                    handleChangeRow={handleChangeRow}
                  />
                  <IconButton
                      onClick={() => {handleDeleteQuiz(row._id)}}
                  >
                    <DeleteOutline/>
                  </IconButton>
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
                        <Table
                            size="small"
                            aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Lesson's name</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {row?.lessons ? row.lessons.map((lesson, index) => (
                                <TableRow key={index+1}>
                                    <TableCell
                                        component="th"
                                        scope="row">
                                        {lesson.name}
                                    </TableCell>
                                    <TableCell>
                                      <div style={{width:'50px', height:'50px'}}>
                                        <img
                                          style={{width:'100%', height:'100%', objectFit:'contain' }}
                                          alt={`number-${index+1}`}
                                          src={lesson.image}
                                        />
                                      </div>
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                          onClick={() => {handleDeleteLesson(lesson._id)}}
                                      >
                                        <DeleteOutline/>
                                      </IconButton>
                                    </TableCell>
                                </TableRow>
                              )) : (
                                <Typography variant='h4'>
                                  No lessons availble
                                </Typography>
                              )}
                            </TableBody>
                        </Table>
                      </Box>
                  </Collapse>
              </TableCell>
          </TableRow>
      </>
  );
};

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
    api.quizApi.getAllQuizzes().then((response) => {
      const quizzesData = response.data.data
      setQuizzes(quizzesData)
    }, (error) => {
      console.log(error);
    })
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
                              <TableCell align="center" />
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {quizzes.map((row, index) => (
                              <RowComponent
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
