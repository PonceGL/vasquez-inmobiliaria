import { useRef, useEffect } from "react";

// Styled-Components
import { ContainerMap } from "./style";

const HoseMap = ({ location }) => {
  const mapConatiner = useRef(null);

  const selectLocation = () => {
    // Crea el objeto map
    const map = new google.maps.Map(mapConatiner.current, {
      zoom: 14,
      center: new google.maps.LatLng(location.lat, location.lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    // crea un marcador arrastrable a las coordenadas previas
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(location.lat, location.lng),
      draggable: false,
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
  }, [mapConatiner, location]);

  return (
    <>
      <ContainerMap ref={mapConatiner} />
    </>
  );
};

export default HoseMap;
