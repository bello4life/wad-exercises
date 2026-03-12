import { useState } from "react";
import Map from "./Map";

export default function App() {

  const [lat, setLat] = useState(51.05);
  const [lon, setLon] = useState(-0.72);

  function setPos() {

    const latVal = parseFloat(
      (document.getElementById("lat") as HTMLInputElement).value
    );

    const lonVal = parseFloat(
      (document.getElementById("lon") as HTMLInputElement).value
    );

    setLat(latVal);
    setLon(lonVal);
  }

  return (
    <div>

      Lat: <input id="lat" />
      Lon: <input id="lon" />

      <input type="button" value="go" onClick={setPos} />

      <p>Map centred at: {lat} {lon}</p>

      <Map lat={lat} lon={lon} />

    </div>
  );
}