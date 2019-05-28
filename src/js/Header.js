import React from 'react';
import PropTypes from 'prop-types';

import image from '../images/house-location-pin.svg';
import Filter from './Filter';

const Header = ({filterIsVisible, toggleFilter, handleFilterChange}) => {
    return (
        <header className={`${filterIsVisible ? 'filter-is-visible' : ''}`}>
            <Filter
                toggleFilter={toggleFilter}
                handleFilterChange={handleFilterChange}
            />
            <img src={image} alt={"Property Listings"} />
            <h1>Property Listings</h1>
            <button className="btn-filter" onClick={event => toggleFilter(event)}>Filter</button>
        </header>
    );
};

Header.propTypes = {
    filterIsVisible: PropTypes.bool.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
};

export default Header;
