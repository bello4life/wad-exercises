import React, { useRef, useState, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface MapProps {
    lat: number
    lon: number
}

export default function Map( {lat, lon}: MapProps) {
    const map = useRef<L.Map | null>(null);
    

    useEffect( ()=> {
        if(map.current == null) {
            map.current = L.map("map1");
        

            // Set the map up in the normal way
            L.tileLayer
            ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: "Copyright OSM contributors, ODBL" } ).addTo(map.current);
  
       

         // Handle the map moveend event by updating the state appropriately
            map.current.on("moveend", e=> {
                 const centre = map.current!.getCenter();
               
             });
        }

      map.current.setView(L.latLng(lat,lon), 14);
    },[lat, lon]);

    return(
       <div id="map1" style={{width:"800px", height:"600px"}}></div>
    )

}