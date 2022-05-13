import React, { useEffect, useState } from "react";
import "./CountrySearch.css";

const CountrySearch = ({countries}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState([]);
  const [groupCondition, setGroupCondition] = useState(true);

  const handleClick = (n) => {
    // handling the group by continent or language
    if (n === 1) {
      setGroupCondition(true);
    } else if (n === 0) {
      setGroupCondition(false);
    }
  }

  // when searchTerm changes in the input
  // or groupCondition change
  useEffect(() => {
    if (groupCondition) {
      // search by continent
      // and making the continent grouping
      setGroupBy(Object.entries(
        countries.filter((val) => {
          if (searchTerm === "") {
            return ""
          } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }
        }).reduce((res, val) => {
          if (!res[val.continent.name]) {
            res[val.continent.name] = [];
          }
          res[val.continent.name].push(val);
          return res;
        }, {})
      ))  
    } else if (!groupCondition) {
      // search by languages
      // and making the language grouping
      setGroupBy(Object.entries(
        countries.filter((val) => {
          if (searchTerm === "") {
            return ""
          } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }
        }).reduce((res, val) => {
          val.languages.map(lan => {
            const group = res[lan.name] || [];
            group.push(val);
            res[lan.name] = group;
          })
          return res;
        }, {})
      ))  
    }
  }, [searchTerm, groupCondition])

  return (
    <div className="search">
      <h1>Country Search</h1>
      <span> Search countries by continent or languages </span>
      <div className="searchResults">
        <input type="text" placeholder="Type to search country . . ." onChange={event => {
          setSearchTerm(event.target.value)
        }}/>
        <div className="groupBy">
          <h2> Group by: </h2>
          <div>
            <button className={(groupCondition) ? 'activeButton' : ''} onClick={() => handleClick(1)}> Continent </button>
            <button className={!(groupCondition) ? 'activeButton' : ''} onClick={() => handleClick(0)}> Language </button>
          </div>
        </div>
        <div>
          {
            groupBy.map(([continentOrLan, countries]) => (
              <div className="container" key={continentOrLan}>
                <h2>{continentOrLan}</h2>
                <div className="countriesContainer">
                  {countries.map(({name, languages, emoji, capital, currency}) => (
                    <div className="countryInfo" key={name}>
                      <div>
                        <span>{emoji}</span>
                        <h3> {name} </h3>
                      </div>
                      <p> Capital: {capital} </p>
                      <p> Currency: {currency} </p>
                      <div className="languages"> 
                        <p> Languages: </p>
                        {languages.map(({ name }) => (
                          <span key={name}> {name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default CountrySearch;