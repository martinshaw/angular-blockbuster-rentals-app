// You should run this script using node.js

/**
 * Complete the steps in capturingMovieDataFromImdb.js before running this script to populate movieData.json
 * with up-to-date data.
 */

/**
 * It loads the thumbnail URLs from movieData.json,
 * then downloads them with the appropriate file names,
 * then copies the movieData.json file to the Angular project's assets.
 */

const path = require('path');
const fs = require('fs');
const https = require('https');

let dataScrapingPath = process.cwd();
if (fs.existsSync('data_scraping')) dataScrapingPath = path.join(dataScrapingPath, 'data_scraping');

const movieDataPath = path.join(dataScrapingPath, 'movieData.json');
if (!fs.existsSync(movieDataPath)) {
  console.error('movieData.json file does not exist. Fpllow steps in capturingMovieDataFromImdb.js first.');
  process.exit(1);
}

const movieData = JSON.parse(fs.readFileSync(movieDataPath, 'utf8'));

const angularAssetsPath = path.join(dataScrapingPath, '..', 'src', 'assets');
if (!fs.existsSync(angularAssetsPath)) fs.mkdirSync(angularAssetsPath);

// I would prefer to use symbolic links here, but I have spent too much time trying to get user elevation to work on Windows, without add additional packages.

const angularAssetsThumbnailPath = path.join(angularAssetsPath, 'thumbnails');

if (fs.existsSync(angularAssetsThumbnailPath)) fs.rmdirSync(angularAssetsThumbnailPath, { recursive: true });
fs.mkdirSync(angularAssetsThumbnailPath);

movieData.forEach(movie => {
  const filePath = path.join(angularAssetsThumbnailPath, `${movie.id}.jpg`);
  const file = fs.createWriteStream(filePath);

  https.get(movie.thumbnail, response => {
    response.pipe(file);
  });
});

const angularAssetsMovieDataPath = path.join(angularAssetsPath, 'movieData.json');

fs.copyFileSync(movieDataPath, angularAssetsMovieDataPath);
