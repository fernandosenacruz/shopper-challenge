import { useEffect } from 'react';

interface GoogleMapsLoaderProps {
  apiKey?: string;
  onLoad?: () => void;
}

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({
  apiKey,
  onLoad,
}) => {
  useEffect(() => {
    if (!apiKey) {
      console.error('API Key não informada!');
      return;
    }
    const isGoogleLoaded = !!window.google;
    if (isGoogleLoaded) {
      onLoad?.();
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="https://maps.googleapis.com/maps/api/js"]'
    );
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps API carregada!');
      onLoad?.();
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, onLoad]);

  return null;
};

export default GoogleMapsLoader;
