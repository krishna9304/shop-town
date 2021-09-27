import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { useSelector } from "react-redux";

const Map = ({ hide, shops }) => {
  const center = useSelector((state) => state.userCurrLoc);
  let [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 13,
    width: "100%",
    height: "100%",
  });

  useEffect(() => {
    if (center) {
      setViewport((v) => ({ ...v, latitude: center[1], longitude: center[0] }));
    }
  }, [center]);

  return (
    <div
      className={`w-screen h-96 relative top-16 left-0 ${hide ? "hidden" : ""}`}
    >
      <ReactMapGL
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        mapboxApiAccessToken={
          "pk.eyJ1IjoicmliaTI5IiwiYSI6ImNrdGZtejF3ZjAyMzYyb3FzcGdlcHdyMmgifQ.mk68YIafe7p9eu-hVFJVpQ"
        }
        {...viewport}
        onViewportChange={(nextView) => setViewport(nextView)}
      >
        <Marker
          latitude={center ? center[1] : 0}
          longitude={center ? center[0] : 0}
        >
          <div
            style={{
              marginTop: -(viewport.zoom ** 3 / 60) / 2,
              marginLeft: -(viewport.zoom ** 3 / 60) / 2,
              height: viewport.zoom ** 3 / 60,
              width: viewport.zoom ** 3 / 60,
            }}
            className="bg-indigo-500 bg-opacity-25 rounded-full border-white"
          ></div>
        </Marker>
        <Marker
          latitude={center ? center[1] : 0}
          longitude={center ? center[0] : 0}
        >
          <div className="bg-indigo-500 w-4 h-4 transform -translate-x-2 -translate-y-2 rounded-full border-white border-2"></div>
        </Marker>
        {shops
          ? shops.map((shop, key) => {
              return (
                <Marker
                  key={key}
                  latitude={shop.locationCoords[1]}
                  longitude={shop.locationCoords[0]}
                >
                  <div className="w-6 h-6">
                    <img
                      className="w-full h-full"
                      src="/shopmarker.png"
                      alt="shop"
                    />
                  </div>
                </Marker>
              );
            })
          : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
