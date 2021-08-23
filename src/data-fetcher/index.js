import { fetcher } from './fetch';

//Shared URL are not Endpoints but resource URL - CORS issues may come. 
//Handled using third party middleware. Local data used as back/fallback
import flightList from '../data-fetcher/fallback_data/flights.json';
import AirportList from '../data-fetcher/fallback_data/airports.json';

const getAirportsList = async () => {
    try{
        const response = await fetcher('https://cors.bridged.cc/https://flightassets.datasavannah.com/test/airports.json');
        return new Promise((resolve) => {
            resolve(response);
        })
    } catch (e){
        return new Promise((resolve) => {
            resolve(AirportList)
        })
    }
}

const getFlightList = async () => {
    try{
        const response = await fetcher('https://cors.bridged.cc/https://flightassets.datasavannah.com/test/flights.json');
        return new Promise((resolve) => {
            resolve(response);
        })
    } catch (e){
        return new Promise((resolve) => {
            resolve(flightList)
        })
    }
}

export { getAirportsList, getFlightList }