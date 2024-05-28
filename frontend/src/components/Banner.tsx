// @ts-ignore
import React, { useEffect, useState } from 'react';
import './Banner.css'; // Ensure this CSS file exists and is properly set up

const colors = ["black", "white", "#002395"];
const texts = ["KEEP TRACK OF VOTES", "SEE SA VOTE", ];


const Banner: React.FC<{ currentPage: string, setCurrentPage: (page: string) => void }> = ({ currentPage, setCurrentPage }) => {

    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [currentArrowIndex, setCurrentArrowIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const changeBanner = () => {
            setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);

            setCurrentArrowIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % texts.length;
                const arrows = document.querySelectorAll<HTMLElement>('.arrow');
                const currentArrow = arrows[prevIndex];
                const nextArrow = arrows[nextIndex];

                if (currentArrow) currentArrow.style.left = "100%";
                if (nextArrow) nextArrow.style.left = "-100%";

                setTimeout(() => {
                    if (nextArrow) nextArrow.style.left = "0";
                }, 1000);

                return nextIndex;
            });
        };

        const interval = setInterval(changeBanner, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentColor = colors[currentColorIndex];
    const currentText = texts[currentColorIndex];
    const textColor = currentColor === 'white' ? 'black' : 'white';

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const changeBanner = () => {
            setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
            setCurrentArrowIndex((prevIndex) => (prevIndex + 1) % texts.length);
        };

        if (!isHovered) {
            intervalId = setInterval(changeBanner, 5000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isHovered]);
    return (
        <div className={`banner ${isHovered ? 'hovered' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {!isHovered && (
                <>
                    <div className="rectangle" style={{backgroundColor: currentColor}}></div>
                    <div className="arrow red-arrow"></div>
                    <div className="arrow green-arrow"></div>
                    <div className="arrow yellow-arrow"></div>
                    <div className="banner-text tracksa_text_title-overlay" style={{color: textColor}}>
                        {currentText}
                    </div>
                </>
            )}
            {isHovered && (
                <div className="breadcrumb">
                    {currentPage}
                </div>
            )}
        </div>
    );
};

export default Banner;
