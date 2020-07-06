import {combineReducers} from 'redux';
import CountriesReducer from './countries/CountriesReducer';

const reducers = {
    countries: CountriesReducer
}

export default combineReducers({...reducers});
