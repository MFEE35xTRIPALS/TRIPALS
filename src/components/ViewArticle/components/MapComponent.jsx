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
  constructor(props) {
    super(props);
    this.state = { spots:props.spots };
  }


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
           <MarkerF 
           icon={{
            path:
              "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "yellow",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "gold",
            strokeWeight: 2,
          }}
           position={center} />
        
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapComponent;

