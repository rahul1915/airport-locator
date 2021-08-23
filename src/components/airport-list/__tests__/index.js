//React Dependencies
import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';

//Component Import
import FlightList from '../index';

//Localization
import { I18nextProvider } from "react-i18next";
import i18n from "../../../i18n";

//Store
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { getFlightList } from '../../../data-fetcher';
import { addAirportList } from '../../../redux/appData';

//Mock ups
jest.mock('../../../data-fetcher');
const response = [{
  "airlineId": "3O",
  "flightNumber": 2128,
  "departureAirportId": "AMS",
  "arrivalAirportId": "TNG"
},
{
  "airlineId": "AF",
  "flightNumber": 1141,
  "departureAirportId": "AMS",
  "arrivalAirportId": "CDG"
},
{
  "airlineId": "AF",
  "flightNumber": 1241,
  "departureAirportId": "AMS",
  "arrivalAirportId": "CDG"
}];
const data=  [
  {
    airlineId: '3O',
    flightNumber: 2128,
    departureAirportId: 'AMS',
    arrivalAirportId: 'TNG',
    dateTime: new Date(new Date().setHours(new Date().getHours() - 2))
  },
  {
    airlineId: 'AF',
    flightNumber: 1141,
    departureAirportId: 'AMS',
    arrivalAirportId: 'CDG',
    dateTime: new Date(new Date().setHours(new Date().getHours() + 2))
  }
]

const ref = React.createRef();

//Component Render
const renderFlightList = (dontAppend = false) =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <FlightList ref={ref} dontAppend={dontAppend} data={data} />
      </I18nextProvider>
    </Provider>
  );

//Test Cases
test('Should show loading state', () => {
  const { getByTestId } = renderFlightList();
  expect(getByTestId('loader-component')).toBeInTheDocument();
});

test('Should show calander fields and apply filter button', () => {
  getFlightList.mockImplementation(async () => {return new Promise((resolve) => {
    resolve(response);
  })});
  const { getByTestId } = renderFlightList();
  expect(getByTestId('main-container')).toBeInTheDocument();
  const fromDateLabel = screen.getByText(/Select from date/i);
  expect(fromDateLabel).toBeInTheDocument();
  const toDateLabel = screen.getByText(/Select to date/i);
  expect(toDateLabel).toBeInTheDocument();
  const applyFilter = screen.getByText(/Apply Filter/i);
  expect(applyFilter).toBeInTheDocument();
});

test('Should not show flight list if airports are not set', () => {
  getFlightList.mockImplementation(async () => {return new Promise((resolve) => {
    resolve(response);
  })});
  const { getByTestId } = renderFlightList();
  expect(getByTestId('main-container')).toBeInTheDocument();
  expect(getByTestId('no-card')).toBeInTheDocument();
});

test('Should show flight list', () => {
  store.dispatch(addAirportList([{
    "id": "CDG",
    "latitude": 49.003197,
    "longitude": 2.567023,
    "name": "Charles De Gaulle Airport",
    "city": "Paris",
    "countryId": "FR"
  },
  {
    "id": "TNG",
    "latitude": 35.726288,
    "longitude": -5.912898,
    "name": "Boukhalef Airport",
    "city": "Tangier",
    "countryId": "MA"
  }]))
  getFlightList.mockImplementation(async () => {return new Promise((resolve) => {
    resolve(response);
  })});

  const { getByTestId, queryByTestId } = renderFlightList(true);
  expect(getByTestId('main-container')).toBeInTheDocument();
  expect(getByTestId('distance')).toBeInTheDocument();
  expect(getByTestId('schipol-airport-text')).toBeInTheDocument();
  expect(getByTestId('city')).toBeInTheDocument();
  expect(getByTestId('airport-name')).toBeInTheDocument();
  expect(getByTestId('flight-date')).toBeInTheDocument();
  expect(getByTestId('flight-airlineId')).toBeInTheDocument();
  expect(getByTestId('logo-container-0')).toBeInTheDocument();
  expect(getByTestId('distance').innerHTML).toBe('398.83 KM');
  expect(getByTestId('schipol-airport-text').innerHTML).toBe('Distance from Schipol');
  expect(getByTestId('city').innerHTML).toBe('Paris');
  expect(getByTestId('airport-name').innerHTML).toBe('Charles De Gaulle Airport');
  expect(getByTestId('flight-airlineId').innerHTML).toBe('AF-1141');
  expect(queryByTestId('logo-container-1')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Apply Filter'));
  expect(getByTestId('logo-container-0')).toBeInTheDocument();
  expect(getByTestId('distance').innerHTML).toBe('398.83 KM');
  expect(getByTestId('schipol-airport-text').innerHTML).toBe('Distance from Schipol');
  expect(getByTestId('city').innerHTML).toBe('Paris');
  expect(getByTestId('airport-name').innerHTML).toBe('Charles De Gaulle Airport');
  expect(getByTestId('flight-airlineId').innerHTML).toBe('AF-1141');
  expect(queryByTestId('logo-container-1')).not.toBeInTheDocument();
  
});
