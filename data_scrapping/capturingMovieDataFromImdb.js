// 1. Navigate to https://www.imdb.com/search/title/?title_type=feature&user_rating=3,10&release_date=1990-01-01,2005-01-01&sort=moviemeter,asc&num_votes=300000,100000000&languages=en

// 2. Load each page of the paginated results; click '50 more' until all results are loaded

// 3. Run the following on each paginated page
[...document.querySelectorAll('.ipc-metadata-list-summary-item')].map(itemElement => {
  return {
      id: parseInt(itemElement.querySelector('.ipc-title__text').innerText.split('. ')[0]),
      thumbnail: itemElement.querySelector('img').srcset.split(', ').at(-1).split(' ').slice(0, -1).join(),
      title: itemElement.querySelector('.ipc-title__text').innerText.split('. ').slice(1).join(),
      year: itemElement.querySelector('.dli-title-metadata').children[0].innerText,
      length: itemElement.querySelector('.dli-title-metadata').children[1].innerText.split(' ').reduce((carry, current) => {
if (current.indexOf('h') > -1) carry.h = parseInt(current.match(/(\d+)/)[0]);
if (current.indexOf('m') > -1) carry.m = parseInt(current.match(/(\d+)/)[0]);
if (current.indexOf('s') > -1) carry.s = parseInt(current.match(/(\d+)/)[0]);
          return carry;
      }, {h: 0, m: 0, s: 0}),
      rating: itemElement.querySelector('.dli-title-metadata').children[2].innerText,
      ranking: parseFloat(itemElement.querySelector('.ipc-rating-star').getAttribute('aria-label').split(' ').slice(-1).join()),
      voteCount: ([...itemElement.querySelectorAll('span')].filter(e=>e.innerText === 'Votes')[0].parentElement.innerText.split('Votes')[1]),
      metarating: itemElement.querySelector('.metacritic-score-box').innerText,
      description: itemElement.querySelector('.ipc-html-content-inner-div').innerText,
  };
});

/**
 * Note: this could be done automatically using puppeteer, but that would increase the size of the Angular project unnecessarily.
 */
