import React from 'react';
import PropTypes from 'prop-types';

import {price as priceFormat} from './utils/Formatters';

const Card = ({property, activeProperty, setActiveProperty}) => {

    const {price, index, address, city, picture, bedrooms, bathrooms, carSpaces} = property;
    const isActive = activeProperty._id === property._id;

    return (
        <div
            id={`card-${index}`}
            className={`card col-sm-12 col-md-6 col-lg-4 ${isActive ? 'is-active': ''}`}
            onClick={() => setActiveProperty(property, false)}
        >
            <img src={picture} alt={city} />
            <p className="price">{priceFormat(price)}</p>
            <div className="details">
                <span className="index">{index+1}</span>
                <p className="location">
                    {city}<br />{address}
                </p>
                <ul className="features">
                    <li className="icon-bed">{bedrooms}<span>bedrooms</span></li>
                    <li className="icon-bath">{bathrooms}<span>bathrooms</span></li>
                    <li className="icon-car">{carSpaces}<span>parking spots</span></li>
                </ul>
            </div>
        </div>
    );
};

Card.PropTypes = {
    property: PropTypes.object.isRequired,
    activeProperty: PropTypes.object.isRequired,
    setActiveProperty: PropTypes.func.isRequired,
};

export default Card;
