import { FormControl, Select, MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const renderedCountries = countries.map((country) => {
    return (
      <MenuItem key={country.name} value={country.value}>
        {country.name}
      </MenuItem>
    );
  });
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid 19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select varient="outlined" value="">
            {renderedCountries}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
