import express from 'express';
import database from 'better-sqlite3';

const app = express();
app.use(express.json());
const db = new database("wadsongs.db")
app.use(express.static('public'));

app.get('/', (req,res)=> {
    res.send('Hello World from Express!');
});

app.get('/artist/:artist', (req, res) => {
	const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
	const results = stmt.all (req.params.artist);
	res.json(results);
});

app.get('/title/:title', (req, res) => {
	const stmt = db.prepare("SELECT * FROM wadsongs WHERE title=?");
	const results = stmt.all (req.params.title);
	res.json(results);
});

app.get ('/search/:artist/:title', (req, res) => {
	const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=? AND title=?");
	const results = stmt.all (req.params.artist, req.params.title);
	res.json(results);
});

app.get ('/song/:id', (req, res) => {
	const stmt = db.prepare("SELECT * FROM wadsongs WHERE id=?");
	const song = stmt.all (req.params.id);
	res.json(song);
});
app.post('/song/create', (req, res) => {
	try {
		const stmt = db.prepare("INSERT INTO wadsongs(title, artist, year, downloads, price, quantity) VALUES(?,?,?,?,?,?)");
		const info = stmt.run(
		  req.body.title,
		  req.body.artist,
		  req.body.year,
		  req.body.downloads,
		  req.body.price,
		  req.body.quantity
		);
		res.json({id: info.lastInsertRowid});
    } catch(error) {
        console.log(error); 
        res.status(500).json({ error: "Failed to create song" });
    }
});

app.put("/song/:id", (req, res) => {

  const { price, quantity } = req.body;
  const id = req.params.id;

  if (price === "" || quantity === "") {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const stmt = db.prepare(
      "UPDATE wadsongs SET price = ?, quantity = ? WHERE id = ?"
    );

    const result = stmt.run(price, quantity, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({ message: "Song updated" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
});


app.delete("/song/:id", (req, res) => {

  const id = req.params.id;

  try {
    const stmt = db.prepare("DELETE FROM wadsongs WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Song not found" });
    }

    res.json({ message: "Song deleted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

interface SongRow {
  quantity: number;
}


app.post("/song/:id/buy", (req, res) => {

  const id = req.params.id;

  try {

    // 1) Check stock
    const getSong = db.prepare(
      "SELECT quantity FROM wadsongs WHERE id = ?"
    );

    const song = getSong.get(id) as SongRow | undefined;


    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    if (song.quantity <= 0) {
      return res.status(400).json({ error: "Out of stock" });
    }

    // 2) Reduce quantity
    const updateStmt = db.prepare(
      "UPDATE wadsongs SET quantity = quantity - 1 WHERE id = ?"
    );
    updateStmt.run(id);

    // 3) Create order
    const orderStmt = db.prepare(
      "INSERT INTO orders(song_id, quantity) VALUES (?, ?)"
    );
    orderStmt.run(id, 1);

    res.json({ message: "Order created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Purchase failed" });
  }
});

	

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
