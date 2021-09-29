import React from "react";

const Img = ({ className, src, alt }) => {
    if (src === undefined || alt === undefined) {
        return (
            <img
                className={className}
                src="https://www.metaweather.com/static/img/weather/c.svg"
                alt="Showers"
            />
        );
    }

    return (
        <img
            className={className}
            src={`https://www.metaweather.com/static/img/weather/${src}.svg`}
            alt={alt}
        />
    );
};

export default Img;
