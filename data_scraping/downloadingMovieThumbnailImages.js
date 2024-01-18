// You should run this script using Node.js

/**
 * Complete the steps in capturingMovieDataFromImdb.js before running this script to populate movieData.json
 * with up-to-date data.
 */

/**
 * It loads the thumbnail URLs from movieData.json,
 * then downloads them with the appropriate file names.
 */

const path = require('path');
const fs = require('fs');
const https = require('https');

let rootPath = process.cwd();
if (rootPath.endsWith('\\data_scraping') || rootPath.endsWith('/data_scraping')) rootPath = path.join(rootPath, '..');
if (rootPath.endsWith('\\mock_api') || rootPath.endsWith('/mock_api')) rootPath = path.join(rootPath, '..');

let dataScrapingPath = path.join(rootPath, 'data_scraping');
if (fs.existsSync('data_scraping')) dataScrapingPath = path.join(dataScrapingPath, 'data_scraping');

const movieDataPath = path.join(dataScrapingPath, 'movieData.json');
if (!fs.existsSync(movieDataPath)) {
  console.error('movieData.json file does not exist. Follow steps in capturingMovieDataFromImdb.js first.');
  process.exit(1);
}

const movieData = JSON.parse(fs.readFileSync(movieDataPath, 'utf8'));

const angularAssetsPath = path.join(dataScrapingPath, '..', 'src', 'assets');
if (!fs.existsSync(angularAssetsPath)) fs.mkdirSync(angularAssetsPath);

/**
 * I would prefer to use symbolic links here, but I have spent too much time trying to get user
 * elevation to work on Windows,without add additional packages.
 */

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
