//React dependencies
import React, { useState, useEffect } from 'react';

//Styles
import './style.css';

//Localization
import { withTranslation } from "react-i18next";

//Google Map API Components
import { Marker, InfoWindow } from 'react-google-maps';

//Store
import { useAppSelector } from '../../hooks';

//Data Manipulations
import { getDistanceFromLatLonInKm } from '../../utils/distance';

//Components
import { Airport } from '../../types';

//Marker URL
const ICON_URL = "https://img.icons8.com/emoji/48/000000/airplane-emoji.png";

//Props Type
type CustomMarkerProps = {
    i18n: any,
    t: (label: string) => string,
    tReady: boolean,
    item: Airport,
    airportList: Airport[]
}
type StateType = {
    data: {
        unitValue: string
    }
}

//Component
const CustomMarker = (props: CustomMarkerProps) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [dialogData, setDialogData] = useState({
        nearestAirportName: '',
        furthestAirport: '',
        maxDistance: 0,
        minDistance: 0
    });
    const { t } = props;
    const { latitude, longitude } = props.item;
    const unitValue = useAppSelector((state: StateType) => state.data.unitValue);

    useEffect(() => {
        const distanceData = getDistanceFromLatLonInKm(Number(latitude), Number(longitude), props.airportList, unitValue)
        setDialogData(distanceData)
    }, [unitValue]);

    //Click & OnChange Functions.
    const handleMouseClick = (e: React.MouseEvent) => {
        const distanceData = getDistanceFromLatLonInKm(Number(latitude), Number(longitude), props.airportList, unitValue)
        setDialogData(distanceData)
        setShowInfoWindow(true)
    };
    const handleMouseExit = (e: React.MouseEvent) => {
        // setTimeout( () => {
        setShowInfoWindow(false);
        // }, 1000 )
    };

    return (
        <Marker
            position={{ lat: latitude, lng: longitude }}
            onClick={handleMouseClick}
            onMouseOut={handleMouseExit}
            icon={{ url: ICON_URL }}
            key={props.item?.id}
        >
            {showInfoWindow && (
                <InfoWindow>
                    <div className='dialog-container' key={props.item?.id}>
                        <div className='dialog-name'>
                            <div style={labelStyle}>{props.item?.name}</div>
                        </div>
                        <div className='dialog-data'>
                            <div className='dialog-label'>{t('Id')}</div>
                            <div className='dialog-value'>{props.item?.id}</div>
                        </div>
                        <div className='dialog-data'>
                            <div className='dialog-label'>{t('City')}</div>
                            <div className='dialog-value' style={cityStyle}>{props.item?.city}</div>
                        </div>
                        <div className='dialog-data'>
                            <div className='dialog-label'>{t('CountryId')}</div>
                            <div>{props.item?.countryId}</div>
                        </div>
                        <div className='dialog-data'>
                            <div className='dialog-label'>{t('Latitude')}</div>
                            <div className='dialog-value'>{props.item?.latitude}</div>
                        </div>
                        <div style={longitudeStyle}>
                            <div className='dialog-label'>{t('Longitude')}</div>
                            <div className='dialog-value'>{props.item?.longitude}</div>
                        </div>
                        <hr />
                        <div style={airportDistanceStyle}>
                            <div>
                                <div style={labelStyle}>{t('NearestAirport')}</div>
                                <div>{dialogData?.nearestAirportName}    {parseFloat(String(dialogData?.minDistance)).toFixed(2)}{` ${unitValue}`}</div>
                            </div>
                            <div>
                                <div style={labelStyle}>{t('FurthestAirport')}</div>
                                <div>{dialogData?.furthestAirport}  {parseFloat(String(dialogData?.maxDistance)).toFixed(2)}{` ${unitValue}`}</div>
                            </div>
                        </div>
                    </div>
                </InfoWindow>

            )}
        </Marker>
    );
}

//CSS Styles
const labelStyle = { fontWeight: 600 }
const cityStyle = { textAlign: 'right' as any, wordWrap: 'break-word' as any }
const longitudeStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }
const airportDistanceStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', lineHeight: '25px', flexDirection: 'column'as any }

export default withTranslation('translations')(CustomMarker);