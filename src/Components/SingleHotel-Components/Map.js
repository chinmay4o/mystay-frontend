import { Loader } from "@googlemaps/js-api-loader"
import React from "react";

  
  const Map = ({location}) => {
    const mapRef = React.useRef();

    React.useEffect(() => {
        const loader = new Loader({
          apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          version: 'weekly', 
        });
    
        loader.load().then(() => {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              const latLng = results[0].geometry.location;
    
              const map = new window.google.maps.Map(mapRef.current, {
                center: latLng,
                zoom: 15,
              });
    
              new window.google.maps.Marker({
                position: latLng,
                map: map,
                title: 'Location Marker',
              });
            } else {
              console.error('Geocode was not successful for the following reason: ' + status);
            }
          });
        });
      }, [location]);
    return (
        <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    )
  }
  
  export default Map