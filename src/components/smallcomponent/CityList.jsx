import React from "react";

const CityList = (props) => {
  return (
    <div className="TargetRow">
      <ul>
        {props.cities.map((city) => (
          <li
            key={city}
            data-city={city}
            onMouseEnter={() => props.handleCityHover(city)}
            onMouseLeave={() => props.handleCityLeave(city)}
            onClick={(e) => props.handleCityClick(e)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
