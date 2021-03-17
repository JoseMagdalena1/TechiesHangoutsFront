import React, { useEffect, useRef, useState, useCallback } from "react";

export function Map({ place }) {
  const inputRef = useRef(null);
  const [lugar, setPlace] = useState("");

  useEffect(() => {
    setPlace(place);
    console.log(lugar);
  }, [lugar]);

  return <Mapper place={place} />;
}

function Mapper({ place: lugar }) {
  const mapRef = useRef();
  const infowindow = useRef(new window.google.maps.InfoWindow());
  const service = new window.google.maps.places.PlacesService(mapRef.current);

  const createMarker = useCallback((map, place) => {
    let marker = new window.google.maps.Marker({
      map,
      position: lugar.geometry.location
    });

    window.google.maps.event.addListener(marker, "click", function() {
      infowindow.current.setContent(lugar.name);
      infowindow.current.open(map, this);
    });
  }, []);

  useEffect(() => {
    let map = new window.google.maps.Map(mapRef.current, {
      zoom: 15
    });

    let request = {
      query: lugar,
      fields: ["name", "geometry"]
    };

    service.findPlaceFromQuery(request, function(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(map, results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });
  }, [lugar]);

  return <div id="map" ref={mapRef} />;
}
