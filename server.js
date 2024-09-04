const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Configuration for saving audio files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// SQLite database configuration
const db = new sqlite3.Database('database.db');

// Create the table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS audio_files (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, artist TEXT, file_path TEXT)");
});

// Middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Route for the homepage
app.get('/', (req, res) => {
  db.all("SELECT * FROM audio_files", (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('index', { files: rows });
  });
});

// Route for uploading audio files
app.post('/upload', upload.single('audioFile'), (req, res) => {
  const { title, artist } = req.body;
  const filePath = req.file.path;

  db.run("INSERT INTO audio_files (title, artist, file_path) VALUES (?, ?, ?)", [title, artist, filePath], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// Route for removing audio files
app.post('/remove/:id', (req, res) => {
  const fileId = req.params.id;

  db.get("SELECT file_path FROM audio_files WHERE id = ?", [fileId], (err, row) => {
    if (err) {
      throw err;
    }

    if (row) {
      fs.access(row.file_path, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(row.file_path, (err) => {
            if (err) {
              console.error(`Errore durante la rimozione del file: ${err.message}`);
            }
            db.run("DELETE FROM audio_files WHERE id = ?", [fileId], (err) => {
              if (err) {
                throw err;
              }
              res.redirect('/');
            });
          });
        } else {
          console.warn(`File non trovato: ${row.file_path}`);
          db.run("DELETE FROM audio_files WHERE id = ?", [fileId], (err) => {
            if (err) {
              throw err;
            }
            res.redirect('/');
          });
        }
      });
    } else {
      res.redirect('/');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/* 
    Route : A route is a way to define how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).
    Middleware: Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. 
    Multer: is a middleware for handling multipart/form-data, which is primarily used for uploading files.
    SQLite: is a lightweight, disk-based database. It doesn’t require a separate server process and allows access to the database using a nonstandard variant of the SQL query language.
    EJS: is a simple templating language that lets you generate HTML markup with plain JavaScript.
    Express: is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. 
 */
