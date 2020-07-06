import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import PageLoader from '../../components/pageLoader/PageLoader';
import useCountries from '../../hooks/useCountries';
import IAppReducer from '../../lib/interfaces/IAppReducer';
import CountryCard from '../../components/countryCard/CountryCard';
import ICountryReducer from '../../lib/interfaces/ICountryReducer';
import Banner from '../../components/banner/Banner';
import AddCountryForm from '../../components/addCountryForm/AddCountryForm';
import ISelectedCountry from '../../lib/interfaces/ISelectedCountry';
import ICountryAdd from '../../lib/interfaces/ICountryAdd';
import './Dashboard.css';

const Dashboard = () => {
    const { addCountry, deleteCountry } = useCountries();
    const countries = useSelector<IAppReducer, ICountryReducer>(state => state.countries);
    const [showAddCountry, setShowAddCountry] = useState(false);
    const [addError, setAddError] = useState("");
    const [addingCountry, setAddingCountry] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const countryInfo = countries.data;
    const count = countryInfo.length;
    const percentage = count * 10;

    const toogleAddForm = () => {
        setShowAddCountry(!showAddCountry);
    }

    const onAddCountryHandler = async (selectedCountry: ISelectedCountry) => {
        try {
            setAddError("");
            const findCountry = countryInfo.
                find(country => country.countryCode === selectedCountry.value);

            if (findCountry) {
                setAddError("Country has already been added");
                return;
            }
            setAddingCountry(true);
            toogleAddForm();
            const country: ICountryAdd = {
                countryCode: selectedCountry.value,
                countryName: selectedCountry.label
            }
            await addCountry(country);
            setErrorMessage("");
            setAddingCountry(false);
        } catch (e) {
            setErrorMessage("Unable to add country at this time. Please try again later");
        }
    }

    const onDeleteContryHandler = async (id) => {
        try {
            await deleteCountry(id);
            setErrorMessage("");
        } catch (e) {
            setErrorMessage("Unable to delete country at this time. Please try again later");
        }
    }

    return (
        <div className="vh-100 dashboard-container pb-5">
            {
                countries.loading && countryInfo.length === 0 ?
                    <PageLoader />
                    :
                    <div className="container">
                        <Banner
                            title="Welcome to Country Dashboard 👋"
                            count={count}
                            percentage={percentage}
                            onAdd={toogleAddForm}
                            loading={addingCountry}
                        />
                        {
                            errorMessage ?
                                <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                                    <Alert.Heading>Oops! Something went wrong!</Alert.Heading>
                                    <p>{errorMessage}</p>
                                </Alert>
                                : null
                        }
                        <div className="d-flex flex-row flex-wrap justify-content-between">
                            {
                                countryInfo.map((country) => (
                                    <CountryCard
                                        key={country.id}
                                        name={country.countryName}
                                        abbreviated={country.details.id}
                                        code={country.countryCode}
                                        latitude={country.details.latitude}
                                        longitude={country.details.longitude}
                                        capitalCity={country.details.capitalCity}
                                        incomeLevel={country.details.incomeLevel}
                                        region={country.details.region}
                                        onDelete={() => onDeleteContryHandler(country.id)}
                                    />
                                ))
                            }
                        </div>
                        <AddCountryForm
                            header="Add Country"
                            onClose={toogleAddForm}
                            show={showAddCountry}
                            onAdd={onAddCountryHandler}
                            errorDescription={addError}
                        />
                    </div>
            }
        </div>
    );
}

export default Dashboard;