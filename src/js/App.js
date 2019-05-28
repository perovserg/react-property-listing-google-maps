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
    };
  }

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

    const {properties, activeProperty, filterIsVisible} = this.state;

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
          <Header
              filterIsVisible={filterIsVisible}
              toggleFilter={this.toggleFilter}
          />
          <div className="cards container">
            <div className="cards-list row ">

                {
                    properties.map(property => {
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
            properties={properties}
            activeProperty={activeProperty}
            setActiveProperty={this.setActiveProperty}
        />
      </div>
    )
  }
}

export default App;
