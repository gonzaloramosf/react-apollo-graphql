import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {LIST_COUNTRIES} from "../../GraphQL/Queries";
import CountrySearch from "../CountrySearch/CountrySearch";
import "./GetCountriesStyles.css";

const GetCountries = () => {
    const {error, loading, data} = useQuery(LIST_COUNTRIES);
    const [isLoading, setIsLoading] = useState(false);
    const countries = [];

    useEffect(() => {
        // consulting if is loading
        if (loading) {
            setIsLoading(true);
        }
        // only if data arrives or there is an error 
        if (data) {
            data.countries.map(country => (
                countries.push(country)
            ))
            setIsLoading(false);
        } else if (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [error, loading, data, countries])

    return(
        // if the LIST_COUNTRIES loading show message
        <div> 
            {isLoading ? <h3 className="loading"> loading... </h3> : <CountrySearch countries={countries}/>}
        </div>
    ) 
};
export default GetCountries;