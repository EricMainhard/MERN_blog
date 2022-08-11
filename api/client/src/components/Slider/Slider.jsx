import './Slider.css';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Slider(){

    const [index, setIndex] = useState(1);

    const handleIndex = () => {
        index === 1 ? setIndex(2) : setIndex(1);
    }

    return(
        <div className="slider">
            <ArrowBackIosNewIcon className="slider__leftArrow" onClick={handleIndex}/>
            {index === 1 
            ? <img src='/slide_1.jpg'/>
            : <img src='/slide_2.jpg'/>
            }
            <ArrowForwardIosIcon className='slider__rightArrow' onClick={handleIndex}/>
        </div>
    )
}