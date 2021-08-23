//React dependencies
import { useEffect, useState } from 'react';

//Styles & logo
import './style.css';
import Logo from './airlines_icon/logo';

//Localization
import { withTranslation } from "react-i18next";

//API calls
import { getFlightList } from '../../data-fetcher'

//Store & functions
import { useAppSelector, useAppDispatch } from '../../hooks';
import { showFlightsLoader, addFilightList } from '../../redux/appData';

//Data Manipulations
import { addedDistanceParameterInList } from '../../utils/distance';

//Global Data Types
import { Airport, Flight } from '../../types';

//Material UI Components
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import Button from '@material-ui/core/Button';

//Utils
import DateFnsUtils from '@date-io/date-fns';

//Local Type Props
type AirportListProps = {
    i18n: any,
    t: (label: string) => string,
    tReady: boolean,
    dontAppend?: boolean,
    data?: newArray[] | any
}
type StateType = {
    data: {
        airportList: Airport[],
        showLoaderFlight: boolean,
        flightList: Flight[],
        unitValue: string
    }
}
type modifiedArray = {
    city: string,
    countryId: string,
    distance: number,
    id: string,
    latitude: number,
    longitude: number,
    name: string
}
type newArray = {
    airlineId: string,
    arrivalAirportId: string,
    dateTime: Date,
    departureAirportId: string,
    flightNumber: number
}
type filteredDataType = {
    airlineId: string,
    arrivalAirportId: string,
    city: string,
    countryId: string,
    dateTime: Date,
    departureAirportId: string,
    distance: number,
    flightNumber: number,
    id: string,
    latitude: number,
    longitude: number,
    name: string,

}

//Date Update to Flights list - (In production we don't need data manipulations)
const randomDate = (start: any, end: any, startHour: number, endHour: number) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

//Variables
let arrayToDisplayFlights: newArray[] | any = [];
let filteredArrayWithDate: filteredDataType[] = [];

//Component
const AirportList = (props: AirportListProps) => {
    const SCHIPHOL_LATITUDE = 52.30907;
    const SCHIPHOL_LONGITUDE = 4.763385;
    const DATE_DISTRIBUTION_FLIGHTS = 30;
    
    const { t } = props;
    
    //Store update
    const dispatch = useAppDispatch();
    
    //Store fetch
    const flightList = useAppSelector((state: StateType) => state.data.flightList);
    const flightLoader = useAppSelector((state: StateType) => state.data.showLoaderFlight);
    const airportList = useAppSelector((state: StateType) => state.data.airportList);
    const unit = useAppSelector((state: StateType) => state.data.unitValue);
    
    //State variables
    const [filteredData, setFiltereddata] = useState<filteredDataType[]>([]);
    const [fromDate, setFromDate] = useState<Date | MaterialUiPickersDate>(new Date());
    const [toDate, setToDate] = useState<Date | MaterialUiPickersDate>(new Date(new Date().setHours(23, 59, 59, 999)));
    
    function addDates(Flights: Flight[]) {
        let newArray = []
        if (props.dontAppend) {
            newArray = props.data;
        } else {
            newArray = Flights.map((item: Flight) => ({ ...item, dateTime: randomDate(new Date(new Date(2021, new Date().getMonth(), new Date().getDate()).setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds())), new Date(new Date(2021, new Date().getMonth() + 1, new Date().getDate() + DATE_DISTRIBUTION_FLIGHTS).setHours(23, 59, 59, 999)), 0, 24) }
            ))
        }
        filteredArrayWithDate = newArray.filter((item: newArray) => {
            return fromDate && toDate && item.dateTime > fromDate && item.dateTime < toDate;
        });
        return filteredArrayWithDate;
    }

    useEffect(() => {
        if (flightList?.length > 0) {
            arrayToDisplayFlights = [];
            filteredArrayWithDate = [];
            addDates(flightList)
            let modifiedArray = addedDistanceParameterInList(SCHIPHOL_LATITUDE, SCHIPHOL_LONGITUDE, airportList, unit);
            modifiedArray.filter((item: modifiedArray) => {
                return filteredArrayWithDate.some(item2 => {
                    if (item.id === item2.arrivalAirportId) {
                        arrayToDisplayFlights.push({ ...item, ...item2 })
                    }
                    return item.id === item2.arrivalAirportId
                });
            })
            setFiltereddata(arrayToDisplayFlights);
        }
    }, [flightList, unit, airportList])

    const fetchDataList = async () => {
        if (flightList?.length > 0) return;
        try {
            const resp = await getFlightList();
            dispatch(addFilightList(resp));
            dispatch(showFlightsLoader({ showLoaderFlight: false }));
        }
        catch (e) {
            //console.log(e, 'fetchDataList')
        }
    }

    useEffect(() => {
        fetchDataList();
    }, [dispatch])


    //Click & OnChange Functions.
    const onFromDateChange = (date: MaterialUiPickersDate) => setFromDate(date)
    const onToDateChange = (date: MaterialUiPickersDate) => setToDate(date)
    const ApplyFilter = () => {
        arrayToDisplayFlights = [];
        filteredArrayWithDate = [];
        addDates(flightList)
        let modifiedArray = addedDistanceParameterInList(SCHIPHOL_LATITUDE, SCHIPHOL_LONGITUDE, airportList, unit);
        modifiedArray.filter((item: modifiedArray) => {
            return filteredArrayWithDate.some(item2 => {
                if (item.id === item2.arrivalAirportId) {
                    arrayToDisplayFlights.push({ ...item, ...item2 })
                }
                return item.id === item2.arrivalAirportId
            });
        })
        setFiltereddata(arrayToDisplayFlights);
    }

    return (
        <div>
            {
                flightLoader ? <div data-testid='loader-component' id='loader-component' style={loaderStyle}>
                    <CircularProgress size={"4rem"} thickness={2} />
                </div> :
                <>
                    <div data-testid='main-container' id='main-container' style={containerStyle}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div>
                                <KeyboardDateTimePicker
                                    value={fromDate}
                                    onChange={onFromDateChange}
                                    label={t('fromDate')}
                                    onError={console.log}
                                    minDate={new Date()}
                                    format="yyyy/MM/dd hh:mm a"
                                />
                            </div>
                            <div style={toDateStyle}>
                                <KeyboardDateTimePicker
                                    value={toDate}
                                    minDate={fromDate}
                                    onChange={onToDateChange}
                                    label={t('toDate')}
                                    onError={console.log}
                                    disablePast={true}
                                    // maxDate={new Date(`2021-${new Date().getMonth() + 2}-${new Date().getDate() + 10}T23:59:00`)}
                                    format="yyyy/MM/dd hh:mm a"
                                />
                            </div>
                        </MuiPickersUtilsProvider>
                        <Button variant="contained" color="primary" onClick={ApplyFilter}>
                            {t('ApplyFilter')}
                        </Button>
                    </div>
                    {filteredData.length > 0 ?
                        filteredData.map((item: filteredDataType, index: number) => {
                            const date = new Date(item.dateTime).toISOString().split('T')[1].split(":")
                            if (item.id === "AMS") return false;
                            return (
                                <div className='card' id={String(index)} key={index} data-testid={`card-${index}`}>
                                    <div data-testid={`logo-container-${index}`} className='logo-container'>
                                        <Logo id={item.airlineId} style={logoStyle} />
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <div data-testid='flight-airlineId'>{item.airlineId}-{item.flightNumber}</div>
                                        <div data-testid='flight-date'>{date[0]}:{date[1]}</div>
                                    </div>
                                    <div className='info-container'>
                                        <div data-testid='airport-name' style={fontStyle}>{item.name}</div>
                                        <div data-testid='city'>{item.city}</div>
                                    </div>
                                    <div className='distance-container'>
                                        <div data-testid='schipol-airport-text' style={fontStyle}>{t('distanceFromSchipol')}</div>
                                        <div data-testid='distance'>{parseFloat(String(item.distance)).toFixed(2)} {unit}</div>
                                    </div>
                                </div>
                            )
                        }
                        )
                        : <div data-testid='no-card' style={noDataStyle}>{t('NoData')}</div>
                    }
                </>
            }
        </div>
    );
};

//CSS Styles
const containerStyle = { marginTop: '30px', marginBottom: '30px', display: 'flex', justifyContent: 'center' }
const toDateStyle = { marginLeft: '30px', marginRight: '30px' };
const loaderStyle = { marginTop: '30px' }
const logoStyle = { width: 200, height: 100 }
const noDataStyle = { marginTop: '70px' }
const fontStyle = { fontWeight: 600 }

export default withTranslation('translations')(AirportList);