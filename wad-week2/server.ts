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

	

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
