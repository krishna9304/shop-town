import React from "react";
import { Marker } from "react-map-gl";

const Zone = ({ zoom, lat, lon }) => {
  return (
    <Marker longitude={lat} latitude={lon}>
      <div
        className="bg-indigo-500 bg-opacity-25 rounded-full"
        style={{
          marginTop: -(zoom ** 3.14) / 2,
          marginLeft: -(zoom ** 3.14) / 2,
          height: zoom ** 3.14,
          width: zoom ** 3.14,
        }}
      ></div>
    </Marker>
  );
};

export default Zone;
