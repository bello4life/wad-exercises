import express from 'express';
import ViteExpress from 'vite-express';
import database from 'better-sqlite3';

const app = express();
const db = new database("wadsongs.db");

app.get('/artist/:artist', (req, res) => {
	const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
	const results = stmt.all (req.params.artist);
	res.json(results);
});

const PORT = 3000;

ViteExpress.listen(app, PORT, () => `Express server with Vite integration now running on ${PORT}...`);