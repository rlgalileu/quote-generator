// Show New Quote
function newQuote() {
  const random = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[random];

  // return quote;
  console.log(quote)
}

// Get quotes from API
let apiQuotes = [];

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (error) {

  }
}

// On Load
getQuotes();
