import React from "react";

const DataCurrent = () => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dataCurrent = new Date();
    const day = dataCurrent.getDay();
    const dayMonth = dataCurrent.getDate();
    const month = dataCurrent.getMonth();

    return (
        <span>
            {days[day]}, {dayMonth} {months[month]}
        </span>
    );
};

export default DataCurrent;
