import React from "react";

function Card(props) {
  const { name, alpha3Code, region, flag } = props.datum;

  return (
    <div
      className="card"
      onClick={() => (window.location.href = `${alpha3Code}/country`)}
    >
      <div className="card-heading">
        <h4>
          <img alt={`${name} flag`} src={flag} width="25px" height="15px" />
          &nbsp;{name}
        </h4>
      </div>
      <div className="card-body">
        <table>
          <tbody>
            <tr className="card-table">
              <th>Country code:</th>
              <th>{alpha3Code}</th>
            </tr>

            <tr className="card-table">
              <th>Region:</th>
              <th>{region}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Card;
