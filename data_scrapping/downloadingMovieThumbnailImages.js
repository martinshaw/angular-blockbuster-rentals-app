// You should run this script using node.js as a administrator-type user (on Windows) or as root (on Linux).

/**
 * It loads the thumbnail URLs from movieData.json,
 * then downloads them with the appropriate file names,
 * then creates a symlink to the thumbnails folder and movieData.json file in the Angular project's assets folder
 */

const path = require('path');
const fs = require('fs');
const https = require('https');

let dataScrappingPath = process.cwd();
if (fs.existsSync('data_scrapping')) dataScrappingPath = path.join(dataScrappingPath, 'data_scrapping');

const movieData = JSON.parse(fs.readFileSync(path.join(dataScrappingPath, 'movieData.json'), 'utf8'));

const movieDataPath = path.join(dataScrappingPath, 'movieData.json');

const thumbnailsPath = path.join(dataScrappingPath, 'thumbnails');
if (!fs.existsSync(thumbnailsPath)) fs.mkdirSync(thumbnailsPath);

movieData.forEach(movie => {
  const filePath = path.join(thumbnailsPath, `${movie.id}.jpg`);
  const file = fs.createWriteStream(filePath);

  https.get(movie.thumbnail, response => {
    response.pipe(file);
  });
});

const angularAssetsPath = path.join(dataScrappingPath, '..', 'src', 'assets');
if (!fs.existsSync(angularAssetsPath)) fs.mkdirSync(angularAssetsPath);

const angularAssetsThumbnailPath = path.join(angularAssetsPath, 'thumbnails');
if (fs.existsSync(angularAssetsThumbnailPath)) fs.unlinkSync(angularAssetsThumbnailPath);
if (!fs.existsSync(angularAssetsThumbnailPath)) fs.symlinkSync(thumbnailsPath, angularAssetsThumbnailPath);

const angularAssetsMovieDataPath = path.join(angularAssetsPath, 'movieData.json');
if (fs.existsSync(angularAssetsMovieDataPath)) fs.unlinkSync(angularAssetsMovieDataPath);
if (!fs.existsSync(angularAssetsMovieDataPath)) fs.symlinkSync(movieDataPath, angularAssetsMovieDataPath);
