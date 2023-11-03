import React, { useEffect } from 'react';

function Map() {
  useEffect(() => {
    const loadGoogleMapScript = () => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', initializeMap);
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 23.777176, lng: 90.399452 },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoom: 11,
      });

      const waqiMapOverlay = new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          return (
            `https://tiles.aqicn.org/tiles/usepa-aqi/${zoom}/${coord.x}/${coord.y}.png?token=8f45e008c92e9c7ae7236be05cfd80103152b2e8`
          );
        },
        name: 'Air Quality',
      });

      map.overlayMapTypes.insertAt(0, waqiMapOverlay);
    };

    loadGoogleMapScript();
  }, []);

  return <div id="map" style={{ height: '380px' }} />;
}

function App() {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;