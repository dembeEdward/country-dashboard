import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import ISelectedCountry from '../../lib/interfaces/ISelectedCountry';

const initCountryState: ISelectedCountry = {
    label: "",
    value: ""
}

const AddCountryForm = (props) => {
    const show = _.get(props, ['show'], false);
    const onAdd = _.get(props, ['onAdd'], () => { });
    const onClose = _.get(props, ['onClose'], () => { });
    const header = _.get(props, ['header'], '');
    const errorDescription = _.get(props, ['errorDescription'], '');
    const countries = countryList().getData();
    const [selectedCountry, setSelectedCountry] = useState(initCountryState);

    const onSelectHandler = (country) => {
        setSelectedCountry(country);
    }

    const onAddHandler = () => {
        onAdd(selectedCountry);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errorDescription ?
                        <Alert variant="danger">
                            {errorDescription}
                        </Alert>
                        : null
                }
                <Form>
                    <Form.Group controlId="addCountryForm">
                        <Form.Label>Country</Form.Label>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            
                            isClearable={false}
                            isSearchable={true}
                            name="countries"
                            options={countries}
                            onChange={onSelectHandler}
                        />
                        <Form.Text className="text-muted">
                            Select a country from the dropdown
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={onAddHandler}
                    disabled={_.isEmpty(selectedCountry)}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

AddCountryForm.propTypes = {
    header: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onAdd: PropTypes.func,
    errorDescription: PropTypes.string
}

export default React.memo(AddCountryForm);