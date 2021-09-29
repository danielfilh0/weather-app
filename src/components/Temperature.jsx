import React from "react";

const Temperature = ({ className, children }) => {
    if (children === null) return <h1 className={className}>15</h1>;
    else return <h1 className={className}>{Math.floor(children)}</h1>;
};

export default Temperature;
