import { useEffect, useState } from 'react'
import './style.css'
import { Box, IconButton, Tooltip } from '@mui/material'
import { BookmarkAddedRounded, BookmarkBorderRounded } from '@mui/icons-material';
import api from 'api';
import user from 'utils/user';

const Mark = ({isMarked, handleBookmark}) => (
    <Tooltip
        title={isMarked?"Unmark":"Mark"}
    >
        <IconButton
            style={{color: `${isMarked?'#00ffff':'#f6f7fb'}`}}
            size="12px"
            onClick={handleBookmark}
        >
            {isMarked?(<BookmarkAddedRounded/>):(<BookmarkBorderRounded/>)}
        </IconButton>
    </Tooltip>
)

const FlipCard = ({ id, imgUrl, meaning, width, height, visible, handleCheckProcess }) => {
    const [isFliped, setIsFliped] = useState(false)
    const [isMarked, setIsMarked] = useState(user.getSessionStorage().lessons.findIndex(lesson => lesson === id) > -1)
    const handleFlip = () => {
        setIsFliped(!isFliped)
    }
    const clearFlip = () => {
        setIsFliped(false)
    }

    const handleBookmark = async () => {
        const userData = user.getSessionStorage()
        const payload = {
            _id: userData._id,
            ids: isMarked ? userData.lessons.filter(_id => _id !== id) : [...userData.lessons, id]
        }
        console.log('call api');
        await api.userApi.bookmarkLesson(payload).then((response) => {
            const resData = response.data.data
            user.setSessionStorage(resData)
            handleCheckProcess(resData)
        }, (error) => {
            console.log(error);
        })
        setIsMarked(!isMarked)
    }

    useEffect(() => {
        clearFlip()
    }, [visible])

    return (
        <Box
            className="scene scene--card"
            width={width||420}
            height={height||360}
            display={!visible && 'none !important'}
        >
            <div className={`card ${isFliped&&'is-flipped'}`}>
                <div className="card__face card__face--front">
                    <div className='learned-mark'>
                        <Mark isMarked={isMarked} handleBookmark={handleBookmark}/>
                    </div>
                    <div className='click-field' onClick={handleFlip}>
                        <div className='content-field img-container'>
                            <img
                                src={imgUrl}
                                srcSet={imgUrl}
                                loading='lazy'
                                alt='Unknown'
                            />
                        </div>
                    </div>
                </div>
                <div className="card__face card__face--back">
                    <div className='learned-mark'>
                        <Mark isMarked={isMarked} handleBookmark={handleBookmark}/>
                    </div>
                    <div className='click-field' onClick={handleFlip}>
                        <div className='content-field'>
                            {meaning}
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default FlipCard
