const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

function showLoadSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  !quote.author ?
    authorText.textContent = 'Unknown':
    authorText.textContent = quote.author;

  quote.text.length > 100 ?
    quoteText.classList.add('long-quote'):
    quoteText.classList.remove('long-quote');

  quoteText.textContent = quote.text;
  removeLoadSpinner();
}

async function getQuoteFromAPI() {
  showLoadSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    console.log(error)
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuoteFromAPI();
