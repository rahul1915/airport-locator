//React dependencies
import { useEffect, useRef } from 'react';

//Localization
import { withTranslation } from "react-i18next";
import { getAirportsList } from '../../data-fetcher';

//Store
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addAirportList, showMapLoader } from '../../redux/appData';

//Components
import CustomMarker from './custome-marker'

//Google MAP API dependencies
import { withGoogleMap, GoogleMap } from 'react-google-maps';

//Material UI components
import CircularProgress from '@material-ui/core/CircularProgress';

//Global Types
import { Airport } from '../../types';

//MAP Setting import
import { MAP_SETTINGS } from './map-settings';

//MAP Setting Destructuring
const { DEFAULT_ZOOM, DEFAULT_CENTER } = MAP_SETTINGS

//Local Type Props
type MapProps = {
    i18n: any,
    t: (label: string) => string,
    tReady: boolean,
    disableMap?: boolean
}
type StateType = {
    data: {
        airportList: Airport[],
        showAirportLoader: boolean
    }
}

//Component
const Map = (props: MapProps) => {
    const mapRef = useRef(null);
    
    //Store update
    const dispatch = useAppDispatch();
    
    //Store fetch
    const airportList = useAppSelector((state: StateType) => state.data.airportList);
    const airportLoader = useAppSelector((state: StateType) => state.data.showAirportLoader);

    //API call
    const getAirports = async () => {
        try {
            const resp = await getAirportsList();
            !props?.disableMap && dispatch(addAirportList(resp));
            !props?.disableMap && dispatch(showMapLoader({ showAirportLoader: false }));
        } catch (e) {
            //console.log(e, 'getAirports');
        }
    }

    //Render after call
    useEffect(() => {
        if (airportList?.length > 0) return;
        getAirports();
    }, [dispatch])

    //Component initialization
    const PlotAirports = withGoogleMap(props => (
        <GoogleMap
            ref={mapRef}
            zoom={DEFAULT_ZOOM}
            defaultCenter={DEFAULT_CENTER}
        >
            {airportList?.length > 0 && airportList.map((item: Airport, index: number) => {
                return <CustomMarker airportList={airportList} item={item} key={String(index)} />
            })}
        </GoogleMap>
    ))
    
    return (
        <div style={{ margin: '-20px' }}>
            {airportLoader && airportList?.length === 0 ?
                <div style={loaderStyle} data-testid="loader-container">
                    <CircularProgress size={"4rem"} thickness={2} />
                </div> :
                <div data-testid='map-container' id="map-container">
                    <PlotAirports
                        containerElement={<div data-testid='actual-map-container' style={mapContainerStyle}></div>}
                        mapElement={<div style={mapStyle}></div>}
                    />
                </div>
            }
        </div>
    );

}

//CSS Styles
const loaderStyle = { marginTop: '70px' }
const mapContainerStyle = { height: '80vh' }
const mapStyle = { height: '100%' }

export default withTranslation('translations')(Map);
