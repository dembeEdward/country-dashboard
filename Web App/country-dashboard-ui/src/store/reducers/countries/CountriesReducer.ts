import ICountryReducer from '../../../lib/interfaces/ICountryReducer';
import IAction from '../../../lib/interfaces/IAction';
import {CountiesFetch} from '../../../lib/enums/Country';

const initState : ICountryReducer = {
    loading: false,
    data: [],
    error: ""
};

const CountriesReducer = (state = initState, action : IAction) : ICountryReducer => {
    switch (action.type) {
        case CountiesFetch.Loading:
            return {
                ...state,
                loading: true,
                error: ""
            };
        case CountiesFetch.Success:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case CountiesFetch.Failed:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default CountriesReducer;