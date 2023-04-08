import { useState } from 'react'
import './style.css'
import { Box, IconButton, Tooltip } from '@mui/material'
import { BookmarkAddedRounded, BookmarkBorderRounded } from '@mui/icons-material';

const FlipCard = ({ imgUrl, meaning, marked=false, width, height }) => {
    const [isFliped, setIsFliped] = useState(false)
    const [isMarked, setIsMarked] = useState(marked)
    const handleFlip = () => {
        setIsFliped(!isFliped)
    }

    return (
        <Box
            className="scene scene--card"
            width={width||420}
            height={height||360}
        >
            <div className={`card ${isFliped&&'is-flipped'}`}>
                <div className="card__face card__face--front">
                    <div className='learned-mark'>
                        <Tooltip
                            title={isMarked?"Unmark":"Mark"}
                        >
                            <IconButton
                                style={{color: `${isMarked?'#00ffff':'#f6f7fb'}`}}
                                size="12px"
                                onClick={()=>{setIsMarked(!isMarked)}}
                            >
                                {isMarked?(<BookmarkAddedRounded/>):(<BookmarkBorderRounded/>)}
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='click-field' onClick={handleFlip}>
                        <div className='content-field'>
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
                        <Tooltip
                            title={isMarked?"Unmark":"Mark"}
                        >
                            <IconButton
                                style={{color: `${isMarked?'#00ffff':'#f6f7fb'}`}}
                                size="12px"
                                onClick={()=>{setIsMarked(!isMarked)}}
                            >
                                {isMarked?(<BookmarkAddedRounded/>):(<BookmarkBorderRounded/>)}
                            </IconButton>
                        </Tooltip>
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
