import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Jumbotron, Button, Spinner } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Banner.css';

const Banner = (props) => {
    const title = _.get(props, ['title'], '');
    const percentage = _.get(props, ['percentage'], 0);
    const count = _.get(props, ['count'], 0);
    const onAdd = _.get(props, ['onAdd'], () => { });
    const loading = _.get(props, ['loading'], false);

    return (
        <Jumbotron className="shadow">
            <div className="d-flex justify-content-center">
                <h1>{title}</h1>
            </div>
            <div className="stats-container">
                <CircularProgressbar
                    className="stats"
                    value={percentage}
                    text={`${count}/10`}
                />
                <div className="d-flex justify-content-center">
                    <span className="stats-label">Countries</span>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-end">
                <Button
                    variant="primary"
                    onClick={onAdd}
                    disabled={count >= 10 || loading}
                    className="mt-2 mb-2"
                >
                    {loading ? 'Adding ...' : 'Add Country'}
                </Button>
                {
                    count >= 10 ?
                        <span className="text-muted excess-text">
                            You have exceeded the number of countries you can add
                        </span>
                        : null
                }
            </div>
        </Jumbotron>
    );
};

Banner.propTypes = {
    title: PropTypes.string,
    percentage: PropTypes.number,
    count: PropTypes.number,
    onAdd: PropTypes.func,
    loading: PropTypes.bool
};

export default React.memo(Banner);