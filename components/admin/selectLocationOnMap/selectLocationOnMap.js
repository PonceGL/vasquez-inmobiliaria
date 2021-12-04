import React, { useRef, useEffect } from "react";

// Components
import Modal from "../modal/modal";

// Styled Components
import {
  TextLocation,
  MapContainer,
} from "../../../styles/admin/selectLocationOnMap/style";

const SelectLocationOnMap = ({
  isOpen,
  latitudeInput,
  setLatitudeInput,
  longitudeInput,
  setLongitudeInput,
  handleClose,
}) => {
  const mapConatiner = useRef(null);

  const handleSubmit = () => {
    handleClose();
  };

  const selectLocation = () => {
    // Crea el objeto map
    const map = new google.maps.Map(mapConatiner.current, {
      zoom: 18,
      center: new google.maps.LatLng(latitudeInput, longitudeInput),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ]
          : [],
    });

    // crea un marcador arrastrable a las coordenadas previas
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitudeInput, longitudeInput),
      draggable: true,
    });

    // añade un oyente al marcador que obtiene las coordenadas
    // cuando el evento de arrastre termina
    // luego actualiza la entrada con las nuevas coordenadas
    google.maps.event.addListener(marker, "dragend", (e) => {
      setLatitudeInput(e.latLng.lat().toFixed(6));
      setLongitudeInput(e.latLng.lng().toFixed(6));

      map.panTo(e.latLng);
    });

    // centra el mapa en las coordenadas de los marcadores
    map.setCenter(marker.position);

    // añade el marcador en el mapa
    marker.setMap(map);
  };

  useEffect(() => {
    if (mapConatiner.current !== null) {
      selectLocation();
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        typeButton="button"
        click={handleSubmit}
      >
        <TextLocation>
          {latitudeInput}, {longitudeInput}
        </TextLocation>
        <MapContainer ref={mapConatiner} />
      </Modal>
    </>
  );
};

export default SelectLocationOnMap;
