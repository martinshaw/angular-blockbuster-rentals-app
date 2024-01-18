const { faker } = require('@faker-js/faker');
const fs = require('fs')
const path = require('path')

const getMoviesTable = () => {
  let rootPath = process.cwd();
  if (rootPath.endsWith('\\data_scraping') || rootPath.endsWith('/data_scraping')) rootPath = path.join(rootPath, '..');
  if (rootPath.endsWith('\\mock_api') || rootPath.endsWith('/mock_api')) rootPath = path.join(rootPath, '..');

  let dataScrapingPath = path.join(rootPath, 'data_scraping');

  const movieDataPath = path.join(dataScrapingPath, 'movieData.json');
  if (!fs.existsSync(movieDataPath)) {
    console.error('movieData.json file does not exist. Follow steps in capturingMovieDataFromImdb.js first.');
    process.exit(1);
  }

  const movieData = JSON.parse(fs.readFileSync(movieDataPath, 'utf8'));

  return movieData.map(movie => {
    const total = faker.number.int({ min: 0, max: 50 });
    const availableForRental = faker.number.int({ min: 0, max: total });
    const availableForSale = faker.number.int({ min: 0, max: total - availableForRental });

    return {
      ...movie,
      count_available_for_sale: availableForSale,
      count_available_for_rental: availableForRental,
      count_owned: total,

      barcode: faker.string.alphanumeric({
        length: 12,
        casing: 'lower',
        exclude: ['g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      }),
    };
  });
};

const getMovieRentalPricesTable = (movies) => {
  return movies.map(movie => {
    return [
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 2, max: 4 }).toFixed(2),
        period: '1 day',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 3, max: 5 }).toFixed(2),
        period: '2 days',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 4, max: 6 }).toFixed(2),
        period: '3 days',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 5, max: 7 }).toFixed(2),
        period: '1 week',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 9, max: 11 }).toFixed(2),
        period: '2 weeks',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 13, max: 15 }).toFixed(2),
        period: '3 weeks',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 16, max: 18 }).toFixed(2),
        period: '1 month',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 30, max: 33 }).toFixed(2),
        period: '2 months',
      },
      {
        movie_id: movie.id,
        price: faker.number.float({ min: 40, max: 43 }).toFixed(2),
        period: '3 months',
      },
    ];
  }).flat();
};

const getCustomersTable = () => {
  const customers = [];

  for (let i = 0; i < 20; i++) {
    customers.push({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address_line_1: faker.location.streetAddress(),
      address_line_2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      region: faker.location.state(),
      postal_code: faker.location.zipCode(),
      country: faker.location.country(),
    });
  }

  return customers;
};

const createRentalsTable = () => {
  return [];
}

const createRentalMoviePivotTable = () => {
  return [];
}

module.exports = () => {
  const movies = getMoviesTable();
  const movieRentalPrices = getMovieRentalPricesTable(movies);
  const customers = getCustomersTable();
  const rentals = createRentalsTable();
  const rentalMoviePivot = createRentalMoviePivotTable();

  return {
    movies,
    movieRentalPrices,
    customers,
    rentals,
    rentalMoviePivot,
  };
}
