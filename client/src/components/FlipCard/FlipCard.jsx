import { useState } from 'react'
import './style.css'
import { Box } from '@mui/material'

const FlipCard = ({ imgUrl, meaning, width, height }) => {
    const [isFliped, setIsFliped] = useState(false)
    const handleFlip = () => {
        setIsFliped(!isFliped)
    }

    return (
        <Box 
            className="scene scene--card"
            width={width||420}
            height={height||360}
        >
            <div className={`card ${isFliped&&'is-flipped'}`} onClick={handleFlip}>
                <div className="card__face card__face--front">
                    <img
                        src={imgUrl}
                        srcSet={imgUrl}
                        loading='lazy'
                        alt='Unknown'
                    />
                </div>
                <div className="card__face card__face--back">
                    {meaning}
                </div>
            </div>
        </Box>
    )
}

export default FlipCard
