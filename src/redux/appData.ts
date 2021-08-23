import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Airport, Flight } from '../types';

//Initialization
const airportList: Airport[] = []
const flightList: Flight[] = []

//Local PropTypes
type initialStateType =  {
    airportList : Airport[],
    flightList : Flight[],
    unitValue: string,
    value: string,
    showLoaderFlight: boolean,
    showAirportLoader: boolean
}

//Default Values
export const initialState: initialStateType = {
    airportList,
    flightList,
    unitValue: window.localStorage.getItem('unitValue') || 'KM',
    value: window.localStorage.getItem('i18nextLng') || 'en-US',
    showLoaderFlight: true,
    showAirportLoader: true
    };

//Dispatcher
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAirportList: (state, action: PayloadAction<Airport[]>) => {
      state.airportList = action.payload;
    },
    addFilightList: (state, action: PayloadAction<Flight[]>) => {
        state.flightList = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<{ value: string }>) => {
      state.value = action.payload.value
    },
    changeUnit: (state, action: PayloadAction<{ unitValue: string }>) => {
        state.unitValue = action.payload.unitValue
    },
    showMapLoader: (state, action: PayloadAction<{ showAirportLoader : boolean }>) => {
        state.showAirportLoader = action.payload.showAirportLoader
      },
    showFlightsLoader: (state, action: PayloadAction<{ showLoaderFlight: boolean }>) => {
        state.showLoaderFlight = action.payload.showLoaderFlight
    },
  },
});

//Actions
export const { addAirportList, addFilightList, changeLanguage, changeUnit, showMapLoader, showFlightsLoader  } = dataSlice.actions;

export const selectAirportList = (state: RootState) => state.data.airportList;
export const selectFlightList = (state: RootState) => state.data.flightList;
export const selectLanguage = (state: RootState) => state.data.value;
export const selectUnit = (state: RootState) => state.data.unitValue;
export const flightLoader = (state: RootState) => state.data.showLoaderFlight;
export const airportLoader = (state: RootState) => state.data.showAirportLoader;


export default dataSlice.reducer;
 