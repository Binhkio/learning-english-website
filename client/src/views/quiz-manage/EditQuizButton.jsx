import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AddOutlined, DeleteOutline, EditOutlined, ImageOutlined } from '@mui/icons-material';
import { Button, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, Snackbar, TextField, Typography, useTheme } from '@mui/material';
import api from 'api';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxHeight: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};

export default function EditQuizButton({quiz_id, default_name, default_lessons, handleChangeRow}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [quizname, setQuizname] = useState(default_name)
  const [lessons, setLessons] = useState(default_lessons)
  const [notificationState, setNotificationState] = useState({
    isLogin: false,
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    const getQuizInfo = async () => {
      const payload = {_id: quiz_id}
      console.log(payload);
      api.quizApi.getQuizInfo(payload).then((response) => {
        const data = response.data.data
        console.log(data);
        setQuizname(data.name)
        setLessons(data.lessons)
      }, (error) => {
        console.log(error);
      })
    }

    getQuizInfo()
  }, [])

  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const handleCloseNotification = () => {
    setNotificationState({ ...notificationState, isLogin: false });
  };

  const handleAddLesson = () => {
    setLessons([...lessons, {
      name: '',
    }])
  }
  const handleAddLessonName = (e, index) => {
    setLessons(lessons.map((lesson, idx) => {
      if(idx === index){
        return {
          ...lesson,
          name: e.target.value,
        }
      }
      return lesson
    }))
  }

  const handleUpdateImage = (index, files) => {
    if (!files || files.length === 0) {
      return
    }
    setLessons(lessons.map((val,idx) => {
      if(idx === index){
        return {
          ...val,
          image: files[0],
        }
      }
      return val
    }))
  }

  const handleRemoveLesson = (idx) => {
    setLessons(lessons.filter((lesson, index) => index !== idx))
  }

  const { isLogin, vertical, horizontal } = notificationState;

  const initValues = () => {
    return {
      quizname: default_name,
      submit: null,
    };
  };

  const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting }) => {
    const verifyLessonsPromise = lessons.filter((lesson) => {
      return !_.isNil(lesson) && _.keys(lesson).length >= 2 && !!lesson.name
    }).map(async (lesson) => {
      if(!_.isNil(lesson._id)) return lesson
      const downloadUrl = await api.firebaseApi.uploadImage(lesson.image)
      return {
        ...lesson,
        image: downloadUrl,
      }
    })
    const verifyLessons = await Promise.all(verifyLessonsPromise)
    const payload = {
      user_id: JSON.parse(sessionStorage.getItem('userData'))._id,
      _id: quiz_id,
      name: quizname,
      lessons: verifyLessons,
    };
    console.log('updateQuiz', payload);
    await api.quizApi
      .updateQuiz(payload)
      .then((response) => {
        const payload = response.data;
        console.log(payload);
        handleChangeRow()
        setOpen(false)
        setStatus({ success: true });
        setSubmitting(false);
        setNotificationState({ ...notificationState, isLogin: true });
      })
      .catch((error) => {
        setStatus({ success: false });
        setErrors({ submit: error.message });
        setSubmitting(false);
      });
  };

  const validateRule = () => {
    return Yup.object().shape({
      quizname: Yup.string().max(255).required('Email is required'),
    });
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditOutlined/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography padding='8px' variant='h3'>Thêm bài học</Typography>
          <Formik
            initialValues={initValues}
            // validationSchema={validateRule}
            // onSubmit={handleSubmitForm}
            >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form
                noValidate
                onSubmit={handleSubmit}
              >
                <FormControl
                  fullWidth
                  size='small'
                  error={Boolean(touched.quizname && errors.quizname)}
                  sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-quizname-quiz">Quiz name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-quizname-quiz"
                    type="text"
                    value={quizname||""}
                    name="quizname"
                    onBlur={handleBlur}
                    onChange={(e) => {setQuizname(e.target.value)}}
                    label="Quiz name"
                    inputProps={{}}
                  />
                  {touched.quizname && errors.quizname && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-quizname-quiz">
                      {errors.quizname}
                    </FormHelperText>
                  )}
                </FormControl>

                {lessons && lessons.map((lesson, index) => (
                  <Box key={index} sx={{marginY:'12px', padding:'8px', backgroundColor:'#f8f8f8'}}>
                    <span>{index+1}. </span>
                    <Stack direction="row" alignItems="center" justifyContent="space-around">
                      <TextField label='Name' variant='standard' defaultValue={lesson.name} onChange={(e) => {handleAddLessonName(e, index)}} />
                      <Stack direction="row" alignItems="center" justifyContent="right">
                        {lesson?.image && (
                          <div style={{width:'100px', height:'100px'}}>
                            <img
                              style={{width:'100%', height:'100%', objectFit:'contain' }}
                              alt={`number-${index+1}`}
                              src={_.isString(lesson.image) ? lesson.image : URL.createObjectURL(lesson.image||undefined)}
                            />
                          </div>
                        )}
                        <IconButton component="label">
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => {handleUpdateImage(index, e.target.files)}}
                          />
                          <ImageOutlined />
                        </IconButton>
                      </Stack>
                      <IconButton onClick={() => {handleRemoveLesson(index)}}>
                        <DeleteOutline/>
                      </IconButton>
                    </Stack>
                  </Box>
                ))}

                <Button
                  variant='outlined'
                  startIcon={<AddOutlined />}
                  sx={{width:'100%'}}
                  onClick={handleAddLesson}
                >
                  Add new
                </Button>

                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary">
                      Update quiz
                    </Button>
                  </AnimateButton>
                </Box>

                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={isLogin}
                  onClose={handleCloseNotification}
                  message="Create success"
                  key={vertical + horizontal}
                />
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
