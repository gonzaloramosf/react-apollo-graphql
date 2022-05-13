import { gql } from "@apollo/client";

// query for get information from api
// will return all countries
export const LIST_COUNTRIES = gql`
    query {
        countries {
            code
            name
            continent {
                code
                name
            }
            capital
            currency
            languages {
                code 
                name
            }
            emoji
        }
    }
`