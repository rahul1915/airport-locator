export type Airport = {
    id: string,
    latitude: number,
    longitude: number,
    name: string,
    city: string,
    countryId: string
};

export type Flight = {
    airlineId: string,
    flightNumber: number,
    departureAirportId: string,
    arrivalAirportId: string
};

export type modifiedArray = {
    city: string,
    countryId: string,
    distance: number,
    id: string,
    latitude: number,
    longitude: number,
    name: string
}