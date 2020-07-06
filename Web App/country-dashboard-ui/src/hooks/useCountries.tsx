import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { CountiesFetch } from '../lib/enums/Country';
import ICountry from '../lib/interfaces/ICountry';
import ISelectedCountry from '../lib/interfaces/ICountryAdd';
import ICounrtyDetails from '../lib/interfaces/ICountryDetails';

const useCountries = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        try {
            dispatch({
                type: CountiesFetch.Loading
            });
            const response = await axios.get(process.env.REACT_APP_DASHBOARD_API);
            const { data, status } = response;

            if (status === 200) {
                let finalResult: any[] = [];
                for (let country of data) {
                    let countryInfo: ICountry = country;
                    let details = await fetchCountryDetails(countryInfo.countryCode);
                    finalResult.push({ details, ...country });
                }
                dispatch({
                    type: CountiesFetch.Success,
                    payload: finalResult
                });
            }
        } catch (e) {
            dispatch({
                type: CountiesFetch.Failed,
                error: e.message
            });
        }
    };

    const fetchCountryDetails = async (countryCode: string = "") => {
        let result: ICounrtyDetails = {
            id: "",
            capitalCity: "",
            incomeLevel: "",
            latitude: "",
            longitude: "",
            region: ""
        };

        try {
            const url: string = process.env.REACT_APP_COUNTRY_DETAILS_API
                .replace('{country_code}', countryCode);
            const response = await axios.get(url);
            const { data, status } = response;

            if (status === 200) {
                result.id = _.get(data, ['1', '0', 'id'], '');
                result.capitalCity = _.get(data, ['1', '0', 'capitalCity'], '');
                result.incomeLevel = _.get(data, ['1', '0', 'incomeLevel', 'value'], '');
                result.latitude = _.get(data, ['1', '0', 'latitude'], '');
                result.longitude = _.get(data, ['1', '0', 'longitude'], '');
                result.region = _.get(data, ['1', '0', 'region', 'value'], '');
            }

            return result;
        } catch (e) {
            console.log(e)
            return result;
        }
    };

    const addCountry = async (country: ISelectedCountry) => {
        try {
            await axios.post(process.env.REACT_APP_DASHBOARD_API, country);
            await getCountries();
        } catch (e) {
            throw e;
        }
    }

    const deleteCountry = async (id: string) => {
        try {
            const url = `${process.env.REACT_APP_DASHBOARD_API}/${id}`
            await axios.delete(url);
            await getCountries(); 
        } catch (e) {
            throw e;
        }
    }

    return {
        getCountries,
        addCountry,
        deleteCountry
    }
}

export default useCountries;