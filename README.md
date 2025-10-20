## Movie Watchlist

A simple, responsive web app to search movies and build a personal watchlist using the OMDb API.

### Live Demo
- Live site: [movies-watchlistx.netlify.app](https://movies-watchlistx.netlify.app/)

### Features
- Search for movies by title
- View key details: poster, title, IMDb rating, runtime, genre, and plot
- Add/remove movies to/from your watchlist
- Watchlist persists using browser localStorage
- Dedicated watchlist page that renders saved movies

### Tech Stack
- HTML, CSS, JavaScript (no framework)
- Icons: Font Awesome
- Data: OMDb API (Open Movie Database)

### Getting Started (Local)
1. Clone this repository
2. Open the project folder
3. Start a local server (for example):
   - Python 3: `python3 -m http.server 8000`
4. Visit `http://localhost:8000/index.html`
5. Click "My Watchlist" in the header to view saved movies

### How It Works
- Search page (`index.html`):
  - Enter a title and click Search to fetch matching movies from OMDb
  - Click "Watchlist" to store the movie's IMDb ID in `localStorage`
- Watchlist page (`watchlist.html`):
  - Reads IMDb IDs from `localStorage`
  - Fetches full details for each ID from OMDb and renders the list
  - Supports removing movies, which updates `localStorage` and re-renders

### Configuration
- The app expects an OMDb API key defined in `src/main.js` as `apiKey`
- You can register and learn more at the OMDb website

### Notes
- LocalStorage is per-browser. Your watchlist on one device/browser won't sync to others.
- Network errors or rate limits from OMDb may impact search/results.

### Credits
- Data by OMDb API
- Icons by Font Awesome

### License
This project is provided for educational/demo purposes.
