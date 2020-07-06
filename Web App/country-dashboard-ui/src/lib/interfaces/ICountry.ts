import ICounrtyDetails from './ICountryDetails';

export default interface ICountry {
    id: string,
    countryName: string,
    countryCode: string,
    details: ICounrtyDetails
}