const { KeyboardArrowUp, KeyboardArrowDown, DeleteOutline } = require("@mui/icons-material");
const { TableRow, TableCell, IconButton, Switch, Collapse, Table, TableHead, TableBody, Typography } = require("@mui/material");
const { Box } = require("@mui/system");
const { default: api } = require("api");
const { default: EditQuizButton } = require("components/Quiz/EditQuizButton");
const { useState } = require("react");
const { default: user } = require("utils/user");

const QuizRowComponent = (props) => {
  const { row, handleChangeRow, bgColor } = props;
  const [open, setOpen] = useState(false);

  const handleDeleteQuiz = async (id) => {
    const payload = { _id: id }
    console.log(payload);

    try {
      const response = await api.quizApi.deleteQuiz(payload)
      handleChangeRow()
    } catch (error) {
      console.error(error); 
    }
  }

  const handleDeleteLesson = async (id) => {
    const payload = { _id: id }

    try {
      const response = await api.lessonAPi.deleteLesson(payload)
      handleChangeRow() 
    } catch (error) {
      console.error(error);
    }
  }

  const handleStatusChange = async () => {
    const payload = {
      user_id: user.getSessionStorage()._id,
      _id: row._id,
      status: !row.status,
    }

    try {
      const response = await api.quizApi.updateQuiz(payload)
      handleChangeRow()
    } catch (error) {
      console.error(error);      
    }
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
              <TableCell align="center">
                  <EditQuizButton
                    quiz_id={row._id}
                    default_name={row.name}
                    default_lessons={row.lessons}
                    handleChangeRow={handleChangeRow}
                  />
              </TableCell>
              <TableCell align='center'>
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

export default QuizRowComponent