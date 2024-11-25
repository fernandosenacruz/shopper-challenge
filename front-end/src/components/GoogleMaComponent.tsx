import { useCallback, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

const GoogleMapComponent = ({
  options,
}: {
  options: {
    origin: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
    zoom: number;
    uiDisabled: boolean;
  };
}) => {
  const [_map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const { origin, destination, zoom, uiDisabled } = options;

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance);

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: origin.latitude, lng: origin.longitude },
          destination: {
            lat: destination.latitude,
            lng: destination.longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    },
    [origin, destination]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
    libraries: ['places'],
    id: 'google-maps-script',
  });

  const center = {
    lat: (origin.latitude + destination.latitude) / 2,
    lng: (origin.longitude + destination.longitude) / 2,
  };

  return (
    <div style={{ width: '100%' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: '50dvw',
            height: '50dvh',
            margin: '1rem',
            borderRadius: '1rem',
            padding: '1rem',
          }}
          center={center}
          options={{ disableDefaultUI: uiDisabled }}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={{ lat: origin.latitude, lng: origin.longitude }} />
          <Marker
            position={{ lat: destination.latitude, lng: destination.longitude }}
          />
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{ polylineOptions: { strokeColor: 'red' } }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapComponent;
