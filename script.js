window.addEventListener("message", (message) => {
  console.log("sri-laksh", message.data); // Wayne is coming!!!
  window.ReactNativeWebView.postMessage("Client received data");
});
//VARIABLES
const quoteContainerElement = document.getElementById("quote_container");
const quoteTextElement = document.getElementById("quote");
const authorTextElement = document.getElementById("author");
const twitterBtnElement = document.getElementById("twitter");
const newQuoteBtnElement = document.getElementById("new_quote");
const loaderElement = document.getElementById("loader");

let quotesList = [];
// FUNCTIONS
//FETCH QUOTES LIST FROM API
async function getQuotes() {
  loading();
  const quoteUrl = "https://type.fit/api/quotes";
  try {
    const apiQuotesList = await fetch(quoteUrl);
    quotesList = await apiQuotesList.json();
    makeQuote();
  } catch (error) {
    console.log(error);
  }
}
//GET INDIVIDUAL QUOTE FROM QUOTES LIST
function makeQuote() {
  loading();
  let quote = quotesList[Math.floor(Math.random() * quotesList.length)];

  // check author if not available make it as "Unnown"
  if (quote.author) {
    authorTextElement.textContent = quote.author;
  } else {
    authorTextElement.textContent = "Unknown";
  }
  //change fontsize when quote text is length is long
  if (quote.text.length > 50) {
    quoteTextElement.classList.add("long_quote");
  } else {
    quoteTextElement.classList.remove("long_quote");
  }
  quoteTextElement.textContent = quote.text;
  complete();
}
//SET A TWEET WHEN CLICKED
function makeTweet() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteTextElement.textContent} - ${authorTextElement.textContent}`;
  window.open(tweetUrl, "_blank");
}
//LOADER SHOW
function loading() {
  loaderElement.hidden = false;
  quoteContainerElement.hidden = true;
}
function complete() {
  quoteContainerElement.hidden = false;
  loaderElement.hidden = true;
}
//  EVENT LISTENERS
newQuoteBtnElement.addEventListener("click", makeQuote);
twitterBtnElement.addEventListener("click", makeTweet);

//ON LOAD
// loading()
getQuotes(); //generate quotes from online using api
