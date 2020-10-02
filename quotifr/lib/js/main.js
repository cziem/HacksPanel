const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Show loading state
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading state
function hideLoading() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  loading();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // default to annoynmous if there is no author
    data.quoteAuthor === '' ? authorText.innerText = 'Annoynmous' : authorText.innerText = data.quoteAuthor;

    // Dynamically change text size
    data.quoteText.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    quoteText.innerText = data.quoteText;

    // show quote
    hideLoading();
  } catch (error) {
    getQuote();
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, '_blank');
}

// Hook up the new tweet event
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// OnLoad
getQuote();