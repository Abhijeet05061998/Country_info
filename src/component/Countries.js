import React, { useState, useEffect } from "react";
import Card from "./Card";
import Loader from "./loader";

function Countries() {
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const [newData, setNewData] = useState([]);
  const [region, setRegion] = useState("All");
  const [regionData, setRegionData] = useState();

  const fetchData = async () => {
    let result = await fetch(`https://restcountries.eu/rest/v2/all`);
    let data = await result.json();
    setData(data);
    setRegionData(data);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const onRegionChange = (e) => {
    setRegion(e.target.value);
    if (e.target.value !== "All") {
      setRegionData(
        data && data.filter((datum) => datum.region === e.target.value)
      );
    } else if (e.target.value === "All") {
      setRegionData(data);
    }
    setNewData([])
    setInput('')
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setNewData(
        regionData &&
          regionData.filter((datum) =>
            datum.name.toLowerCase().includes(e.target.value)
          )
      );
    }
  };

  return (
    <>
      {data === undefined ? (
        <div className="loading-page">
          <Loader />
        </div>
      ) : (
        <>
          <div className=" filter-countries">
   
              <input
                type="text"
                placeholder="Search country"
                value={input}
                onChange={onInputChange}
                
              />

            <div className="dropdown">
              <select
                className="dropdown-content"
                value={region}
                onChange={onRegionChange}
              >
                <option value="All">Region</option>
                <option value="Africa">Africa</option>
                <option values="Americas">Americas</option>
                <option values="Asia">Asia</option>
                <option values="Europe">Europe</option>
                <option values="Ocenia">Oceania</option>
              </select>
            </div>
          </div>
          <div className="countries">
            {newData.length !== 0
              ? newData &&
                newData.map((datum, index) => {
                  return <Card key={index} datum={datum} />;
                })
              : regionData &&
                regionData.map((datum, index) => {
                  return <Card key={index} datum={datum} />;
                })}
          </div>
        </>
      )}
    </>
  );
}

export default Countries;
