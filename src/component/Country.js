import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { generatePath } from "react-router";
import Loader from "./loader";
import CountryMap from "./map";

function Country(props) {
  const [data, setData] = useState();
  const history = useHistory();

  const fetchData = async () => {
    let result = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${props.match.params.id}`
    );
    let data = await result.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [props.match.params.id]);

  const handleClick = (ele) => {
    const path = generatePath(props.match.path, { id: ele });
    history.push(path);
  };

  return (
    <>
      {" "}
      {data === undefined ? (
        <div className="loading-page">
          <Loader />
        </div>
      ) : (
        <div className="country">
          <h1 className="country-heading heading">{data && data.name}</h1>
          <div className="section">
            <div className="names section-info">
              <h2 className="heading">Names</h2>
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Common</th>
                      <td>{data && data.name}</td>
                    </tr>
                    <tr>
                      <th>Official</th>
                      <td>{(data && data.altSpellings[2]) || data.name}</td>
                    </tr>
                    <tr>
                      <th>Common (Native)</th>
                      <td>{(data && data.altSpellings[1]) || data.name}</td>
                    </tr>
                    <tr>
                      <th>Official (Native)</th>
                      <td>{(data && data.altSpellings[3]) || data.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="language section-info">
              <h2 className="heading">Language</h2>
              <div className="table">
                <table>
                  <tbody>
                    {data &&
                      data.languages.map((lang, index) => {
                        return (
                          <tr key={index}>
                            <th>{`Language(${lang.iso639_1})`}</th>
                            <td>{data && lang.nativeName}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="geography section-info">
              <h2 className="heading">Geography</h2>
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Region</th>
                      <td>{data && data.region}</td>
                    </tr>
                    <tr>
                      <th>Subregion</th>
                      <td>{data && data.subregion}</td>
                    </tr>
                    <tr>
                      <th>Capital</th>
                      <td>{data && data.capital}</td>
                    </tr>
                    <tr>
                      <th>Demonym</th>
                      <td>{data && data.demonym}</td>
                    </tr>
                    <tr>
                      <th>Lat/Lng</th>
                      <td>{data && `${data.latlng[0]}/${data.latlng[1]}`}</td>
                    </tr>
                    <tr>
                      <th>Area</th>
                      <td>{data && data.area + "km²"}</td>
                    </tr>
                    <tr>
                      <th>Land borders</th>
                      <td>
                        {data && data.borders.length !== 0
                          ? data &&
                            data.borders.map((ele, index) => (
                              <span
                                className="border"
                                key={index}
                                onClick={() => handleClick(ele)}
                              >
                                {index < data.borders.length - 1
                                  ? ele + ", "
                                  : ele}
                              </span>
                            ))
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="codes section-info">
              <h2 className="heading">Codes</h2>
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>ISO 3166-1 alpha-2</th>
                      <td>{data && data.alpha2Code}</td>
                    </tr>
                    <tr>
                      <th>ISO 3166-1 alpha-3</th>
                      <td>{data && data.alpha3Code}</td>
                    </tr>
                    <tr>
                      <th>ISO 3166-1 numeric</th>
                      <td>{data && data.numericCode}</td>
                    </tr>
                    <tr>
                      <th>International calling code</th>
                      <td>{data && data.callingCodes[0]}</td>
                    </tr>
                    <tr>
                      <th>ISO 4217 currency code</th>
                      <td>{data && data.currencies[0].code}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flag section-info">
              <h2 className="heading">Flag</h2>
              <img alt={`${data.name} flag`} src={data && data.flag} width="350px" />
            </div>
            <div className="map section-info">
              <h2 className="heading">Map</h2>
              <CountryMap key={Date.now()} lat={data &&data.latlng[0]} lng={ data && data.latlng[1]} name ={data && data.name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Country;
