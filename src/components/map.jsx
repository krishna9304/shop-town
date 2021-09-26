import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const Map = ({ radius, hide }) => {
  const [center, setCenter] = useState([0, 0]);
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 14,
    width: "100%",
    height: "100%",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
      }
    );
    return () => {};
  }, []);

  useEffect(() => {
    setViewport((v) => ({ ...v, latitude: center[1], longitude: center[0] }));
  }, [center]);

  return (
    <div
      className={`w-screen h-96 relative top-0 left-0 ${hide ? "hidden" : ""}`}
    >
      <ReactMapGL
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        mapboxApiAccessToken={
          "pk.eyJ1IjoicmliaTI5IiwiYSI6ImNrdGZtejF3ZjAyMzYyb3FzcGdlcHdyMmgifQ.mk68YIafe7p9eu-hVFJVpQ"
        }
        {...viewport}
        onViewportChange={(nextView) => setViewport(nextView)}
      >
        <Marker latitude={center[1]} longitude={center[0]}>
          <div
            style={{
              marginTop: (-(viewport.zoom ** 2.9 / 100) / 2) * radius,
              marginLeft: (-(viewport.zoom ** 2.9 / 100) / 2) * radius,
              height: (viewport.zoom ** 2.9 / 100) * radius,
              width: (viewport.zoom ** 2.9 / 100) * radius,
            }}
            className="bg-indigo-500 bg-opacity-25 rounded-full border-white"
          ></div>
        </Marker>
        <Marker latitude={center[1]} longitude={center[0]}>
          <div className="bg-indigo-500 w-4 h-4 transform -translate-x-2 -translate-y-2 rounded-full border-white border-2"></div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
