//React Dependencies
import { render } from '@testing-library/react';

//Component Import
import Map from '../index';

//Localization
import i18n from "../../../i18n";
import { I18nextProvider } from "react-i18next";

//Store
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { getAirportsList } from '../../../data-fetcher';

//Mock
jest.mock('../../../data-fetcher');

/*** Mock Google Maps JavaScript API ***/
export const setupGoogleMock = () => {
  const google = {
    maps: {
      Marker:class{ setIcon(url){} setPosition({lat,lng}){} setMap(){} componentWillUnmount(){}},
      Map:class{ setTilt(){} fitBounds(){} setZoom(){} setCenter(){}},
      MVCObject: class{ addListener(ename,handler){}},
      LatLngBounds:class{},
      places: {
        AutocompleteService: class{},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: {
        geocode({ address, placeId }, callback) {
          if (address) {
            this._geocodeAddress(address, callback);
          } else if (placeId) {
            this._geocodePlaceID(placeId, callback);
          } else {
            callback({}, 'ZERO_RESULTS');
          }
        }
      },
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};
const response = [{
  "id": "AAL",
  "latitude": 57.08655,
  "longitude": 9.872241,
  "name": "Aalborg Airport",
  "city": "Aalborg",
  "countryId": "DK"
},
{
  "id": "ABQ",
  "latitude": 35.049625,
  "longitude": -106.617195,
  "name": "Albuquerque International Airport",
  "city": "Albuquerque",
  "countryId": "US"
},
{
  "id": "ABZ",
  "latitude": 57.200253,
  "longitude": -2.204186,
  "name": "Dyce Airport",
  "city": "Aberdeen",
  "countryId": "GB"
}];

//PRE-RENDER Before each case
beforeAll(()=>{
  setupGoogleMock()
})

//Component Render
const renderMap = (disableMap = false) =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Map disableMap={disableMap} />
      </I18nextProvider>
    </Provider>
  );

  // const renderCustomMarker = () =>
  // render(
  //   <Provider store={store}>
  //     <I18nextProvider i18n={i18n}>
  //       <CustomMarker
  //       item={{
  //         "id": "AAL",
  //         "latitude": 57.08655,
  //         "longitude": 9.872241,
  //         "name": "Aalborg Airport",
  //         "city": "Aalborg",
  //         "countryId": "DK"
  //       }} />
  //     </I18nextProvider>
  //   </Provider>
  // );

//Test Cases
test('Should show loading state', () => {
  const { getByTestId } = renderMap();
  expect(getByTestId('loader-container')).toBeInTheDocument();
});

test('Should show map and markers', () => {
  getAirportsList.mockImplementation(async () => {return new Promise((resolve) => {
    resolve(response);
  })});
  const { getByTestId, debug } = renderMap(true);
  expect(getByTestId('map-container')).toBeInTheDocument();
  expect(getByTestId('actual-map-container')).toBeInTheDocument();
});

// test('Should show custom marker', () => {
//   const { getByTestId, debug } = renderCustomMarker();
//   debug()
// });