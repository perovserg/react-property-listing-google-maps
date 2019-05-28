import React from 'react';
import jump from 'jump.js';

import data from './data/Data';

import Card from './Card';
import GoogleMap from './GoogleMap';
import Header from './Header';
import {easeInOutCubic} from './utils/Easing';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        properties: data.properties,
        activeProperty: data.properties[0],
        filterIsVisible: false,
        filteredProperties: [],
        isFiltering: false,
        filterBedrooms: 'any',
    };
  }

  handleFilterChange = (event) => {
      const {target: {value, name}} = event;
      this.setState({
          [name]: value
      }, () => {
          this.filterProperties();
      });
      // setState не всегда выполняется мгновенно
      // поэтому если далее есть вычисления зависящие от state
      // нужно использовать callback
      // или lifecycle метод componentDidUpdate
  };

  filterProperties = () => {
      const {properties, filterBedrooms} = this.state;
      const isFiltering = filterBedrooms !== 'any';

      const filter = {
        bedrooms: filterBedrooms
      };

      const filteredProperties = properties.filter(property => {

          if (filter.bedrooms !== 'any'
              && property.bedrooms !== parseInt(filter.bedrooms)) {

              return false;
          }

          return true;
      });

      this.setState({
          filteredProperties,
          activeProperty: filteredProperties.length && filteredProperties[0],
          isFiltering
      });

  };

  toggleFilter = (event) => {
      event.preventDefault();
      this.setState(({filterIsVisible}) => {
          return { filterIsVisible: !filterIsVisible }
      });
  };

  setActiveProperty = (property, scroll = true) => {
      this.setState({
          activeProperty: property
      });

      if (scroll) {
          // scroll to the right property
          jump(`#card-${property.index}`, {
              duration: 800,
              easing: easeInOutCubic,
          });
      }
  };


    render(){

    const {
        properties,
        activeProperty,
        filterIsVisible,
        filteredProperties,
        isFiltering
    } = this.state;

    const cardsList = isFiltering ? filteredProperties : properties;

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
          <Header
              filterIsVisible={filterIsVisible}
              toggleFilter={this.toggleFilter}
              handleFilterChange={this.handleFilterChange}
          />
          <div className="cards container">
            <div className="cards-list row ">
                {
                    cardsList.map(property => {
                        return <Card
                            key={property._id}
                            property={property}
                            activeProperty={activeProperty}
                            setActiveProperty={this.setActiveProperty}
                        />;
                    })
                }
            </div>
          </div>
        </div>
        {/* listings - End */}

        <GoogleMap
            properties={cardsList}
            activeProperty={activeProperty}
            setActiveProperty={this.setActiveProperty}
            filteredProperties={filteredProperties}
            isFiltering={isFiltering}
        />
      </div>
    )
  }
}

export default App;
