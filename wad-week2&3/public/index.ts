// index.mjs - CLIENT SIDE code, runs in the browser

// Create a Song interface
// make "song" of type Song
interface song {
	title: string;
	artist: string;
	year: number;
}
	



// Make the AJAX run when we click a button
document.getElementById('search')!.addEventListener('click', async()=> {
    // Read the product type from a text field
    const artist = (document.getElementById('theArtist') as HTMLInputElement).value;
    try {
        // Send a request to our remote URL
        const response = await fetch(`http://localhost:3000/artist/${artist}`);

        // Parse the JSON.
        const songs: song[] = await response.json();

        // Loop through the array of JSON objects and add the results to a <div>
        let html = "";
        songs.forEach ( song => {
            html += `Title: ${song.title} Artist: ${song.artist} year: ${song.year}<br />`;
        });
        document.getElementById('htresults')!.innerHTML = html;
    } catch (e) {
        alert(`There was an error: ${e}`);
    }
});


document.getElementById("addsong")!.addEventListener("click", async () => {

  const title = (document.getElementById("songtitle") as HTMLInputElement).value;
  const artist = (document.getElementById("songartist") as HTMLInputElement).value;
  const year = (document.getElementById("songyear") as HTMLInputElement).value;
  const downloads = (document.getElementById("songdownload") as HTMLInputElement).value;
  const price = (document.getElementById("songprice") as HTMLInputElement).value;
  const quantity = (document.getElementById("songquantity") as HTMLInputElement).value;

  try {
    const response = await fetch("http://localhost:3000/song/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        artist: artist,
        year: year,
        downloads: downloads,
        price: price,
        quantity: quantity
      })
    });

    if (response.status === 400) {
      alert("All fields must be filled in");
      return;
    }

    if (!response.ok) {
      alert("Server error");
      return;
    }

    const data = await response.json();
    alert("Song added with ID: " + data.id);

  } catch (err) {
    console.error(err);
    alert("Network error");
  }
});
