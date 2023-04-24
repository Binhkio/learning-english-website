import MainCard from 'ui-component/cards/MainCard';
import CreateQuizModalButton from './CreateQuizModalButton';
import { Stack } from '@mui/system';

const Title = (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <span>Quản lý bài học</span>
    <CreateQuizModalButton/>
  </Stack>
)

function QuizManage() {
    return (
      <>
        <MainCard title={Title}>
          Noi dung
        </MainCard>
      </>
    );
}

export default QuizManage;
