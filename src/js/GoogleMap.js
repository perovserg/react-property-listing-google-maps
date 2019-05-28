import React from 'react';
import PropTypes from 'prop-types'

class GoogleMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: []
        }
    }

    closeAllMarkers() {
        const {markers} = this.state;
        // hide all other info boxes on click
        markers.forEach(marker => {
            marker.iw.close();
        });
    }

    showActivePropertyMarker(activeProperty) {
        const {markers} = this.state;
        // show active property info window
        markers && markers[activeProperty.index] && markers[activeProperty.index].iw.open(this.map, markers[activeProperty.index]);
    }

    componentWillReceiveProps(nextProps) {
        const {activeProperty} = nextProps;
        this.closeAllMarkers();
        this.showActivePropertyMarker(activeProperty);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.properties === this.props.properties) return;

        const {filteredProperties, isFiltering} = this.props;
        const {markers} = this.state;

        markers.forEach(marker => {
            // that is the associated property
            const {property} = marker;

            markers[property.index].setVisible(!isFiltering || filteredProperties.includes(property));
        });
    }

    componentDidMount() {
        const {
            properties,
            activeProperty: {latitude, longitude}
        } = this.props;

        // noinspection JSUnresolvedVariable
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: latitude, lng: longitude},
            mapTypeControl: false,
            zoom: 15,
        });

        this.createMarkers(properties);
    }

    createMarkers(properties) {

        const markers = [];
        const {activeProperty, setActiveProperty} = this.props;

        properties.map(property => {
            const {latitude, longitude, index, address} = property;

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

            this.marker.property = property;

            // create info window for each marker
            this.marker.iw = new google.maps.InfoWindow({
                content: `<h1>${address}</h1>`
            });

            this.marker.addListener('click', () => {

                this.closeAllMarkers();

                // set active property onto the state
                setActiveProperty(property);
            });

            //push this marker to the markers array on the state
            markers.push(this.marker);

        });

        this.setState({ markers });

        this.showActivePropertyMarker(activeProperty);

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
    filteredProperties: PropTypes.array,
    isFiltering: PropTypes.bool,
};

export default GoogleMap;
