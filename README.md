# Digital Audio Archive

## Project Description

The Digital Audio Archive is a web application that allows users to upload, view, and remove audio files. It uses Node.js for the backend, Express for routing, Multer for file uploads, SQLite as the database, and EJS as the templating engine for rendering HTML pages.

## Features

- **Audio File Upload**: Users can upload audio files through a web interface.
- **View Audio Files**: Users can view a list of all uploaded audio files.
- **Remove Audio Files**: Users can remove audio files from the list and the server.

## Requirements

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/digital-audio-archive.git cd digital-audio-archive
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the server**:

```bash
node server.js
```

4. **Access the application**:
   - Open your browser and go to `http://localhost:3000`.

## Project Structure

- `server.js`: The main file containing the server logic.
- `uploads/`: The directory where uploaded audio files are saved.
- `public/`: The directory containing static files (CSS, images, etc.).
- `views/`: The directory containing EJS files for rendering HTML pages.
- `database.db`: The SQLite database file.

## Usage

### Uploading an Audio File

1. Go to the homepage of the application.
2. Fill out the upload form with the title, artist, and select the audio file.
3. Click "Upload" to upload the file.

### Removing an Audio File

1. In the list of audio files, click the "Remove" button next to the file you want to remove.
2. The file will be removed from both the server and the database.

## Contributions

Contributions are welcome! If you would like to contribute, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the file for more details.
   
