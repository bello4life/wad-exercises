import { useState } from "react";

interface song {
    id: number
    title: string;
    artist: string;
    year: number;
    download: number;
    price: number;
    quatity: number;
    
}

export default function Hittastic() {
    const [artist, setArtist] = useState<song[]>([]);;
    const songResult = artist.map (song => <div key={song.id}>
        {song.title} <br />
        {song.artist} <br />
        {song.year} <br />
        {song.download} <br />
        {song.price} <br />
        {song.quatity}
    </div>)

    return(
        <div>
        <h2>Search for artist</h2>
        <input id='artistName' type='text'  />
        <div> Artist details: {songResult} </div>
        <button onClick={searchArtist}>Search!</button>
        </div>
    );


   async function searchArtist(){
        const artistname  = (document.getElementById("artistName") as HTMLInputElement).value;
        

        const response = await fetch(`http://localhost:3000/artist/${artistname}`);

        const data = await response.json();
        setArtist(data);
    }

}