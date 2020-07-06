import ICountry from './ICountry';

export default interface ICountryReducer {
    loading: Boolean,
    data: ICountry[],
    error: String
}