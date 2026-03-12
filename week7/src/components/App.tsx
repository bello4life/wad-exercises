import React from "react";
import { useState } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import Map from "./Map";

export default function App() {
    const [latLng, setLatLng] = useState(L.latLng(51.05, -0.72));

    return(
        <div>
        Lat: <input id='lat' />
        Lon: <input id='lon' />
        <input type='button' value='go' onClick={setPos} />
        <p>Map centred at: {latLng.lat} {latLng.lng}</p>
        <Map lat={latLng.lat} lon={latLng.lng} />
        </div>
    );

    function setPos() {
        const latLng1 = L.latLng(
            parseFloat((document.getElementById('lat') as HTMLInputElement).value),
            parseFloat((document.getElementById('lon') as HTMLInputElement).value)
        );
        setLatLng(latLng1);
    }
}