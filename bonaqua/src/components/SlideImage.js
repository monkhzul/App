import React, { useState, useEffect, useRef } from "react";
import bonaqua from '../images/maxresdefault.jpg';
import banner from '../images/banner/3@2x.jpg';
import banner1 from '../images/banner/4@2x.jpg';
import banner2 from '../images/banner/5@2x.jpg';
import banner3 from '../images/banner/6@2x.jpg';
import banner4 from '../images/banner/877x530@2x.jpg';
import banner5 from '../images/banner/877x530-2@2x.jpg';

export default function SlideImage() {

    // SlideShow
    const pictures = [banner, banner1, banner2, banner3, banner4, banner5];
    const delay = 5000;

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow slideContent">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {pictures.map((img, index) => (
                    <img src={img} alt="" key={index} className="slide 3xl:h-auto" />
                ))}
            </div>

            <div className="slideshowDots">
                {pictures.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>

    )
}
