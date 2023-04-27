import { ArrowBack, ArrowForward, ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
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
        {quiz?.lessons && quiz.lessons.map((lesson, index) => (
            <FlipCard
              visible={index === curIndex}
              key={lesson._id}
              id={lesson._id}
              meaning={lesson.name}
              imgUrl={lesson.image}
            />
        ))}
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
              border:`solid 2px ${curIndex===0?'#f0f0f0':'black'}`
            }}
            onClick={previousCard}
            disabled={curIndex===0}
          >
            <ArrowBack sx={{fontSize:'20px'}} />
          </IconButton>
          <span>{curIndex+1} / {quiz?quiz.lessons.length:'?'}</span>
          <IconButton 
            sx={{
              border:`solid 2px ${!quiz||curIndex===quiz.lessons.length-1?'#f0f0f0':'black'}`
            }}
            onClick={nextCard}
            disabled={!quiz||curIndex===quiz.lessons.length-1}
          >
            <ArrowForward sx={{fontSize:'20px'}} />
          </IconButton>
        </Stack>
      </Box>
    </MainCard>
  )
}