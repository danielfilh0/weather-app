import React from "react";

const Img = ({ className, src, alt }) => {
    return (
        <img
            className={className}
            src={`https://www.metaweather.com/static/img/weather/${src}.svg`}
            alt={alt}
        />
    );
};

export default Img;
