import React from "react";
import Loading from "./Loading";

const Card = ({ loading, className, children }) => {
    if (loading) {
        return <div className={`card ${className}`}>
            <Loading />
        </div>;
    }
    return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
