import React from 'react';
import PropTypes from 'prop-types'

class GoogleMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markets: []
        }
    }


    componentDidMount() {

        const {properties, activeProperty: {latitude, longitude}} = this.props;

        // noinspection JSUnresolvedVariable
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: latitude, lng: longitude},
            mapTypeControl: false,
            zoom: 15,
        });

        this.createMarkers(properties);
    }

    createMarkers(properties) {

        const {setActiveProperty} = this.props;

        properties.map(property => {
            const {latitude, longitude, index} = property;
            // noinspection JSUnresolvedVariable
            this.marker = new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map: this.map,
                label: {
                    color: '#ffffff',
                    text: `${index + 1}`
                },
                icon: {
                    url: 'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png',
                    size: new google.maps.Size(22, 55),
                    origin: new google.maps.Point(0, -15),
                    anchor: new google.maps.Point(11, 52),
                }
            });

            this.marker.addListener('click', () => {
                // set active property onto the state
                setActiveProperty(property);
            });
        });

    }

    render(){
        return(
            <div className="mapContainer">
                <div id="map" ref="map"/>
            </div>
        );
    }

}

GoogleMap.propTypes = {
    properties: PropTypes.array.isRequired,
    activeProperty: PropTypes.object.isRequired,
    setActiveProperty: PropTypes.func.isRequired,
};

export default GoogleMap;
