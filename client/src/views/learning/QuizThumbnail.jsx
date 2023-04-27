import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Stack } from '@mui/system';
import { Divider, IconButton, Typography } from '@mui/material';
import { BookmarkAdded, BookmarkBorder, DensityMediumOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import api from 'api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f6f6f6',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export function QuizThumbnail({quiz}) {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const [marked, setMarked] = useState(userData.quizzes.findIndex(id => id === quiz._id) > -1)
  const navigate = useNavigate()
  
  if(_.isNil(quiz)) return (<></>);

  const handleBookmark = async () => {
    const payload = {
      _id: userData._id,
      ids: marked ? userData.quizzes.filter(q => q !== quiz._id) : [...userData.quizzes, quiz._id]
    }
    await api.userApi.bookmarkQuiz(payload).then((response) => {
      const resData = response.data.data
      sessionStorage.setItem('userData', JSON.stringify(resData))
    }, (error) => {
      console.log(error);
    })
    setMarked(!marked)
  }

  const handleViewQuiz = () => {
    if(_.isNil(quiz._id)) return;
    navigate(`/quiz/?id=${quiz._id}`, {state: {id: quiz._id}})
  }

  return (
    <Item sx={{display:'flex', justifyContent:'space-between'}}>
      <Stack
        spacing={1}
        padding={1}
        onClick={handleViewQuiz}
        width='100%'
        sx={{cursor:'pointer'}}
      >
        <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
          <span>{quiz?.lessons ? quiz.lessons.length : '?'} questions</span>
          <Divider orientation="vertical" />
          <span>Creator: {quiz?.creator ? quiz.creator.name : 'Unknown'}</span>
        </Box>
        <Typography variant='h4'>
          {quiz?.name ? quiz.name : 'Unknown quiz'}
        </Typography>
      </Stack>
      <Stack direction='row' justifyContent='space-evenly' alignItems='center' gap={1} padding={1}>
        <IconButton onClick={handleBookmark}>
          {marked ? <BookmarkAdded/> : <BookmarkBorder/>}
        </IconButton>
        <IconButton>
          <DensityMediumOutlined/>
        </IconButton>
      </Stack>
    </Item>
  )
}