import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    attribution: attrib 
}).addTo(map);
            
const lagos = L.latLng(6.5244, 3.3792);
map.setView(lagos, 10);
const marker = L.marker(lagos).addTo(map);
marker.bindPopup("My home town");

map.on("click", e =>{
    const text = prompt("Please enter some text");

    if (text !== null) {
        const newMarker = L.marker(e.latlng).addTo(map);
        newMarker.bindPopup(text).openPopup();
        
    }
    alert(`You clicked at:${e.latlng.lat} ${e.latlng.lng}`);
     

});