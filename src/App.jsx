import React from "react";
import api from "./api";
import Card from "./components/Card";
import DataCurrent from "./components/DataCurrent";
import Img from "./components/Img";
import Loading from "./components/Loading";
import Temperature from "./components/Temperature";

const App = () => {
    let [activeSearch, setActiveSearch] = React.useState(false);
    let [search, setSearch] = React.useState("");
    let [searchList, setSearchList] = React.useState([]);
    let [loading, setLoading] = React.useState(false);
    let [region, setRegion] = React.useState("Helsinki");
    let [data, setData] = React.useState([
        {
            time: 'undefined',
            the_temp: 15,
            weather_state_abbr: "s",
            weather_state_name: "Showers",
        },
    ]);

    function addNewItem(value) {
        let array = Array.from(searchList);
        array.unshift(value.toLowerCase());
        let newArray = array.filter((item, index) => array.indexOf(item) === index);
        setSearchList(newArray.slice(0, 6));
    }

    async function getWoeid(query) {
        const response = await api.get(`search/?query=${query}`);
        return response.data[0].woeid;
    }

    async function getData(query) {
        const response = await api.get(`${query}/`);
        setRegion(response.data.title);
        return response.data.consolidated_weather;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        addNewItem(search);
        setActiveSearch(false);
        setLoading(true);
        const woeid = await getWoeid(search);
        const data = await getData(woeid);
        setLoading(false);
        setData(data);
    }

    async function handleSubmitList(event) {
        addNewItem(event.target.innerText);
        setActiveSearch(false);
        setLoading(true);
        const woeid = await getWoeid(event.target.innerText);
        const data = await getData(woeid);
        setLoading(false);
        setData(data);
    }

    return (
        <div className="weather-app">
            <aside className="aside">
                {!activeSearch ? (
                    <div className="aside__info">
                        <div className="header">
                            <button
                                className="btn-search"
                                onClick={() => setActiveSearch(true)}
                            >
                                Search for places
                            </button>
                            <button className="btn-gps">
                                <i className="fas fa-compass"></i>
                            </button>
                        </div>

                        {loading ? (
                            <Loading />
                        ) : (
                            <div className="info">
                                <Img
                                    className="info__image"
                                    src={data[0].weather_state_abbr}
                                    alt={data[0].weather_state_name}
                                />
                                <Temperature className="info__temperature">
                                    {data[0].the_temp}
                                </Temperature>
                                <h2 className="info__status">
                                    {data[0].weather_state_name}
                                </h2>
                                <div className="info__date">
                                    <span>Today</span>
                                    <div className="date">
                                        <DataCurrent />
                                    </div>
                                </div>
                                <div className="info__location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{region}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="aside__search">
                        <button onClick={() => setActiveSearch(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="search location"
                            />
                            <button type="submit">Search</button>
                        </form>
                        <ul>
                            {searchList.map((item, index) => (
                                <li key={index} onClick={handleSubmitList}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>
            <main className="main">
                <section className="main__header">
                    <button className="active">ºC</button>
                    <button>ºF</button>
                </section>
                <section className="main__next-days">
                    <Card>
                        <p>Tomorrow</p>
                        <img
                            className="info__image"
                            src="https://www.metaweather.com/static/img/weather/s.svg"
                            alt=""
                        />
                        <div>
                            <span>16ºC</span>
                            <span>11ºC</span>
                        </div>
                    </Card>
                </section>
                <section className="main__highlights">
                    <h1>Today's Highlights</h1>
                    <div className="cards">
                        <Card>
                            <p>Wind status</p>
                            <h2>7 mph</h2>
                            <div className="direction">
                                <i className="fas fa-location-arrow"></i>
                                <span>WSW</span>
                            </div>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
