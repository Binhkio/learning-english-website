import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import api from "api";
import FlipCard from "components/FlipCard/FlipCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";

export function QuizLearning() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams() 
  const quiz_id = location.state?.id || searchParams.get('id')
  const [quiz, setQuiz] = useState(null)
  const [curIndex, setCurIndex] = useState(0)

  const checkMark = (id) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    return userData.lessons.findIndex(lesson => lesson._id === id) > -1
  }

  const previousCard = () => {
    const preIndex = curIndex > 0 ? curIndex-1 : quiz?.lessons ? quiz.lessons.length-1 : 0
    setCurIndex(preIndex)
  }

  const nextCard = () => {
    const nextIndex = quiz?.lessons ? curIndex < quiz.lessons.length-1 ? curIndex+1 : 0 : 0
    setCurIndex(nextIndex)
  }

  useEffect(() => {
    const getQuizInfo = async () => {
      const payload = { _id: quiz_id }
      await api.quizApi.getQuizInfo(payload).then((response) => {
        const resData = response.data.data
        setQuiz(resData)
      }, (error) => {
        console.log(error);
      })
    }

    getQuizInfo()
  }, [])

  console.log(curIndex);
  return (
    <MainCard title={quiz && quiz.name}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Stack
          direction='row' 
          sx={{
            width:'100%',
          }}
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <IconButton 
            sx={{
              width:'10%',
              height:'10%',
              bgcolor:'#f8f8f8',
            }}
            onClick={previousCard}
            disabled={curIndex===0}
          >
            <ArrowLeftOutlined sx={{fontSize:'60px'}} />
          </IconButton>
          {quiz?.lessons && (
            <FlipCard
              id={quiz.lessons[curIndex]._id}
              meaning={quiz.lessons[curIndex].name}
              imgUrl={quiz.lessons[curIndex].image}
              marked={checkMark(quiz.lessons[curIndex]._id)}
            />
          )}
          <IconButton 
            sx={{
              width:'10%',
              height:'10%',
              bgcolor:'#f8f8f8',
            }}
            onClick={nextCard}
            disabled={!quiz||curIndex===quiz.lessons.length-1}
          >
            <ArrowRightOutlined sx={{fontSize:'60px'}} />
          </IconButton>
          {/* <Grid 
            sx={{
              width:'10%',
              cursor:'pointer',
              display:'grid',
              alignItems:'center',
              justifyContent:'center',
              bgcolor:'#f8f8f8',
            }}
            onClick={previousCard}
          >
            <ArrowLeftOutlined sx={{fontSize:'60px'}} />
          </Grid>
          {quiz?.lessons && (
            <FlipCard
              meaning={quiz.lessons[curIndex].name}
              imgUrl={quiz.lessons[curIndex].image}
              marked={checkMark(quiz.lessons[curIndex]._id)}
            />
          )}
          <Grid 
            sx={{
              width:'10%',
              cursor:'pointer',
              display:'grid',
              alignItems:'center',
              justifyContent:'center',
              bgcolor:'#f8f8f8',
            }}
            onClick={nextCard}
          >
            <ArrowRightOutlined sx={{fontSize:'60px'}} />
          </Grid> */}
        </Stack>
      </Box>
    </MainCard>
  )
}