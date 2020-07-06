import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import _ from 'lodash';
import './CountryCard.css';

const CountryCard = (props) => {
    const name = _.get(props, ['name'], '');
    const abbreviated = _.get(props, ['abbreviated'], '');
    const code = _.get(props, ['code'], '');
    const latitude = _.get(props, ['latitude'], '');
    const longitude = _.get(props, ['longitude'], '');
    const capitalCity = _.get(props, ['capitalCity'], '');
    const incomeLevel = _.get(props, ['incomeLevel'], '');
    const region = _.get(props, ['region'], '');
    const onDelete = _.get(props, ['onDelete'], () => { });
    const [mouseHover, setMouseHover] = useState(false);
    let flagURL = "";
    let mapURL = "";

    if (code) {
        flagURL = process.env.REACT_APP_COUNTRY_FLAGS
            .replace('{country_code}', code)
    }

    if (latitude && longitude) {
        mapURL = process.env.REACT_APP_GOOGLE_MAPS
            .replace('{lat}', latitude)
            .replace('{lng}', longitude);
    }

    return (
        <div className="d-flex card-container mt-5 col-sm-12 col-md-6 col-lg-4">
            <Card
                className={mouseHover ? "" : "shadow"}
                onMouseEnter={() => setMouseHover(true)}
                onMouseLeave={() => setMouseHover(false)}
            >
                <Card.Body className={mouseHover ? "hovered-state" : ""} >
                    <div className="d-flex justify-content-between">
                        {
                            flagURL ?
                                <div>
                                    <img src={flagURL} className="flag" />
                                </div>
                                : null
                        }
                        {
                            mouseHover ?
                                <Button onClick={onDelete} variant="light">x</Button>
                                : null
                        }
                    </div>

                    <Card.Title>{name} ({abbreviated})</Card.Title>
                    <Card.Text>
                        Found in the <span className="value-text">{region}</span> region
                        and the name of the capital city is <span className="value-text">{capitalCity}</span>.
                        This is a <span className="value-text">{incomeLevel}</span> country.
                        <br /><br />
                        <span className="contry-code">County code: {code}</span>
                    </Card.Text>
                    {
                        mapURL ?
                            <div>
                                <a href={mapURL} target="_balnk">View on map</a>
                            </div>
                            : null
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

CountryCard.propTypes = {
    name: PropTypes.string,
    abbreviated: PropTypes.string,
    code: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    capitalCity: PropTypes.string,
    incomeLevel: PropTypes.string,
    region: PropTypes.string,
    onDelete: PropTypes.func
}

export default React.memo(CountryCard);