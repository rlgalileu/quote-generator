const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');

let apiQuotes = [];

// Show New Quote
function newQuote() {
  const random = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[random];

  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
}

// Get quotes from API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    console.log(error)
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuotes();
