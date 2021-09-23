import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmliaTI5IiwiYSI6ImNrdGZtejF3ZjAyMzYyb3FzcGdlcHdyMmgifQ.mk68YIafe7p9eu-hVFJVpQ";

const Map = ({ radius }) => {
  const [origin, setOrigin] = useState([0, 0]);
  const [zoom, setZoom] = useState(14);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        setOrigin(center);
        map.current.setCenter(center);
        map.current.setZoom(zoom);
        let ele1 = document.createElement("div");
        let ele2 = document.createElement("div");
        ele1.classList.add(
          "w-6",
          "h-6",
          "rounded-full",
          "bg-indigo-500",
          "border-2",
          "border-white"
        );
        ele2.classList.add(
          "w-96",
          "h-96",
          "rounded-full",
          "bg-indigo-500",
          "bg-opacity-25",
          "border-2",
          "border-white"
        );

        new mapboxgl.Marker(ele1).setLngLat(center).addTo(map.current);
        new mapboxgl.Marker(ele2).setLngLat(center).addTo(map.current);
      },
      console.error,
      {
        enableHighAccuracy: true,
      }
    );
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: origin,
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
    map.current.on("move", () => {
      const pos = map.current.getCenter();
      setOrigin([pos.lng, pos.lat]);
    });
    map.current.on("zoom", () => {
      const zoom = map.current.getZoom();
      setZoom(zoom);
    });

    return () => {
      map.current.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-screen h-96 relative top-0 left-0"
    ></div>
  );
};

export default Map;
