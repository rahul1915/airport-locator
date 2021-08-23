import { Airport, modifiedArray } from '../types';

//Distance calculator using lat and long values
//For Maps model
function getDistanceFromLatLonInKm(lat1: number,lon1: number,data: Airport[], unitValue:string) {
    var R = 6371; // Radius of the earth in km
    let maxDistance = -Infinity;
    let minDistance = Infinity;
    let nearestAirportName = '';
    let furthestAirport = ''; 
    data.map((item: Airport) => {
    var dLat = deg2rad(item.latitude-lat1);  // deg2rad below
    var dLon = deg2rad(item.longitude-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(item.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if(parseFloat(String(maxDistance)) < parseFloat(String(d))){
        maxDistance = d;
        furthestAirport = item.name;
    }
    if(parseFloat(String(minDistance)) > parseFloat(String(d)) && d > 0){
        minDistance = d;
        nearestAirportName = item.name;
    }
    return ''
    });
    if(unitValue === 'mile'){
        // 1km = 0.621371 mile
        maxDistance = maxDistance * 0.621371;
        minDistance = minDistance * 0.621371;
        return { maxDistance, minDistance, furthestAirport, nearestAirportName};
    }
    return { maxDistance, minDistance, furthestAirport, nearestAirportName};
  }
  
  function deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }

  //For Flight list - airportlist page
  function addedDistanceParameterInList(lat1: number,lon1: number,data:Airport[], unit:string) {
    var R = 6371; // Radius of the earth in km
    const newArr = data.map((item: Airport) => {
    var dLat = deg2rad(item.latitude-lat1);  // deg2rad below
    var dLon = deg2rad(item.longitude-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(item.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if(unit === 'mile'){
      // 1km = 0.621371
      d = d * 0.621371;
      return {...item, distance: d};
    }
    return {...item, distance: d}
    });
    function compare( a: modifiedArray, b: modifiedArray ) {
        if ( a.distance < b.distance ){
          return -1;
        }
        if ( a.distance > b.distance ){
          return 1;
        }
        return 0;
      }
      
      const sortedArray = newArr.sort(compare);
    return sortedArray;
  }

export { getDistanceFromLatLonInKm, addedDistanceParameterInList }