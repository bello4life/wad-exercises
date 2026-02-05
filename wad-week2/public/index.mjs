// index.mjs - CLIENT SIDE code, runs in the browser


// Make the AJAX run when we click a button
document.getElementById('search').addEventListener('click', async()=> {
    // Read the product type from a text field
    const artist = document.getElementById('theArtist').value;
    try {
        // Send a request to our remote URL
        const response = await fetch(`http://localhost:3000/artist/${artist}`);

        // Parse the JSON.
        const songs = await response.json();

        // Loop through the array of JSON objects and add the results to a <div>
        let html = "";
        songs.forEach ( song => {
            html += `Title: ${song.title} Artist: ${song.artist} year: ${song.year}<br />`;
        });
        document.getElementById('htresults').innerHTML = html;
    } catch (e) {
        alert(`There was an error: ${e}`);
    }
});