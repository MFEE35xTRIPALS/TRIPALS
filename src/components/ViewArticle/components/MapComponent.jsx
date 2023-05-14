import React, { Component } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  height: '100%',
};

const center = {
  lat: 25.033964,
  lng: 121.564472
};
const options = {
  disableDefaultUI: true,
  gestureHandling: 'greedy'
  };
class MapComponent extends Component {
  render() {

    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDhO21SyzfdV8hcAc1jvjr6XZSTZdPFlhY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          options={options}
        >
           <MarkerF position={center} />
        
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapComponent;

