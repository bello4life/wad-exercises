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

map.on("click", async (e) =>{
    const artist = prompt("Please enter an artist name");
    if (artist === null) return;

    const hometown = prompt("Please enter the hometown name");
    if (hometown === null) return;


    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    try{
        const response = await fetch("http://localhost:3000/hometown", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: artist,
                lat: lat,
                lon: lon,
                hometown: hometown
            })
        });
        if (response.status === 200) {
            const newMarker = L.marker([lat, lon]).addTo(map);
            newMarker.bindPopup(`<b>${artist}</b><br>${hometown}`).openPopup();
        } else {
            alert("Failed to add hometown. ");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }

});

interface artisthometown {
    hometown: string;
    lat: number;
    lon: number;
}

document.getElementById('search')!.addEventListener('click', async()=> {
    const artistName = (document.getElementById('artistName') as HTMLInputElement).value;
    if (!artistName) {
        alert("please enter artist name")
        return;
    }
    try{
        const response = await fetch(`http://localhost:3000/hometown/${artistName}`);

        if (!response.ok) {
            alert("Artist not found")
            return;
        }
        const artistdetails: artisthometown = await response.json();

        const newPosition = L.latLng(artistdetails.lat, artistdetails.lon);

        map.setView(newPosition, 10);


        const newMarker = L.marker(newPosition).addTo(map);
        newMarker.bindPopup(`<b>${artistName}</b><br>${artistdetails.hometown}`).openPopup();

    } catch (error) {
    console.error(error);
    alert("Something went wrong.");
}
});



