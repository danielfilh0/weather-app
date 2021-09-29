import React from "react";
import Img from "./Img";
import Loading from "./Loading";

const SmallCard = ({ loading, text, srcImg, altImg, maxTemp, minTemp }) => {
    if (loading) {
        return (
            <div className="card" style={{display: 'flex', justifyContent: 'center'}}>
                <p>Loading...</p>
            </div>
        );
    } else {
        return (
            <div className="card">
                {text === "Tomorrow" ? (
                    <p>Tomorrow</p>
                ) : (
                    <p>
                        {text}
                    </p>
                )}
                <Img className="card__image" src={srcImg} alt={altImg} />
                <div>
                    <span>{Math.floor(maxTemp)}</span>
                    <span>{Math.floor(minTemp)}</span>
                </div>
            </div>
        );
    }
};

export default SmallCard;
