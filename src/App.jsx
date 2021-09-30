import React from "react";
import api from "./api";
import DataCurrent from "./components/DataCurrent";
import Img from "./components/Img";
import Loading from "./components/Loading";
import LargeCard from "./components/LargeCard";
import SmallCard from "./components/SmallCard";
import Temperature from "./components/Temperature";

const App = () => {
    let [activeSearch, setActiveSearch] = React.useState(false);
    let [search, setSearch] = React.useState("");
    let [searchList, setSearchList] = React.useState([]);
    let [loading, setLoading] = React.useState(false);
    let [error, setError] = React.useState(false);
    let [region, setRegion] = React.useState("Helsinki");
    let [data, setData] = React.useState([
        {
            time: "undefined",
            the_temp: 15,
            weather_state_abbr: "s",
            weather_state_name: "Showers",
            wind_speed: 7,
            wind_direction: 240,
            wind_direction_compass: "WSW",
            humidity: 84,
            visibility: 12.4,
            air_pressure: 998,
        },
        {
            min_temp: 11,
            max_temp: 16,
            weather_state_abbr: "c",
            applicable_date: "in 1 days",
        },
        {
            min_temp: 11,
            max_temp: 16,
            weather_state_abbr: "lc",
            applicable_date: "in 2 days",
        },
        {
            min_temp: 11,
            max_temp: 16,
            weather_state_abbr: "hc",
            applicable_date: "in 3 days",
        },
        {
            min_temp: 11,
            max_temp: 16,
            weather_state_abbr: "lr",
            applicable_date: "in 4 days",
        },
        {
            min_temp: 11,
            max_temp: 16,
            weather_state_abbr: "t",
            applicable_date: "in 5 days",
        },
    ]);

    function addNewItem(value) {
        let array = Array.from(searchList);
        array.unshift(value.toLowerCase());
        let newArray = array.filter(
            (item, index) => array.indexOf(item) === index
        );
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
        setLoading(true);
        try {
            setActiveSearch(false);
            const woeid = await getWoeid(search);
            const data = await getData(woeid);
            setError(false);
            addNewItem(search);
            setData(data);
        } catch (error) {
            setLoading(false);
            setActiveSearch(true);
            setError(true);
        } finally {
            setLoading(false);
            setSearch('');
        }
    }

    async function handleSubmitList(event) {
        setLoading(true);
        try {
            setActiveSearch(false);
            const woeid = await getWoeid(event.target.innerText);
            const data = await getData(woeid);
            addNewItem(event.target.innerText);
            setError(false);
            setData(data);
        } catch(error) {
            setActiveSearch(true);
            setLoading(false);
            setError(true);
        } finally {
            setLoading(false);
            setSearch('');
        }
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
                                className={error ? 'error' : null}
                            />
                            <button type="submit">Search</button>
                        </form>
                        {error ? <p className="error">Location not found</p> : null}
                        <ul>
                            {searchList.map((item, index) => (
                                <li key={index} onClick={handleSubmitList}>
                                    {item}
                                </li>
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
                    <SmallCard
                        loading={loading}
                        text="Tomorrow"
                        srcImg={data[1].weather_state_abbr}
                        altImg={data[1].weather_state_name}
                        maxTemp={data[1].max_temp}
                        minTemp={data[1].min_temp}
                    />

                    <SmallCard
                        loading={loading}
                        text={data[2].applicable_date}
                        srcImg={data[2].weather_state_abbr}
                        altImg={data[2].weather_state_name}
                        maxTemp={data[2].max_temp}
                        minTemp={data[2].min_temp}
                    />

                    <SmallCard
                        loading={loading}
                        text={data[3].applicable_date}
                        srcImg={data[3].weather_state_abbr}
                        altImg={data[3].weather_state_name}
                        maxTemp={data[3].max_temp}
                        minTemp={data[3].min_temp}
                    />

                    <SmallCard
                        loading={loading}
                        text={data[4].applicable_date}
                        srcImg={data[4].weather_state_abbr}
                        altImg={data[4].weather_state_name}
                        maxTemp={data[4].max_temp}
                        minTemp={data[4].min_temp}
                    />

                    <SmallCard
                        loading={loading}
                        text={data[5].applicable_date}
                        srcImg={data[5].weather_state_abbr}
                        altImg={data[5].weather_state_name}
                        maxTemp={data[5].max_temp}
                        minTemp={data[5].min_temp}
                    />
                </section>
                <section className="main__highlights">
                    <h1>Today's Highlights</h1>
                    <div className="cards">
                        <LargeCard loading={loading} className="wind-status">
                            <p>Wind status</p>
                            <h2>{Math.floor(data[0].wind_speed)}</h2>
                            <div className="wind-status__direction">
                                <i
                                    className="fas fa-location-arrow"
                                    style={{
                                        transform: `rotate(${
                                            Math.floor(data[0].wind_direction) -
                                            45
                                        }deg)`,
                                    }}
                                ></i>
                                <span>{data[0].wind_direction_compass}</span>
                            </div>
                        </LargeCard>

                        <LargeCard loading={loading} className="humidity">
                            <p>Humidity</p>
                            <h2>{data[0].humidity}</h2>
                            <div className="humidity__rate">
                                <div className="numbers">
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                                <div className="filler">
                                    <div
                                        className="fill"
                                        style={{
                                            width: `${data[0].humidity}%`,
                                        }}
                                    ></div>
                                </div>
                                <span>%</span>
                            </div>
                        </LargeCard>

                        <LargeCard loading={loading} className="visibility">
                            <p>Visibility</p>
                            <h2>{data[0].visibility.toFixed(1)}</h2>
                        </LargeCard>

                        <LargeCard loading={loading} className="air-pressure">
                            <p>Air Pressure</p>
                            <h2>{Math.floor(data[0].air_pressure)}</h2>
                        </LargeCard>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;
