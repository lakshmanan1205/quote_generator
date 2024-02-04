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
// SET VAR WHEN WEBVIEW COMMUNICATES
function communication(data) {
  lakshElement.textContent = data;
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
function getUrlParams(e) {
  console.log("laksh-getUrlParams", e);
}
//  EVENT LISTENERS
newQuoteBtnElement.addEventListener("click", makeQuote);
twitterBtnElement.addEventListener("click", makeTweet);
window.addEventListener("hashchange", getUrlParams);
window.onhashchange = function () {
  alert("url changed!");
};

//ON LOAD
// loading()
getQuotes(); //generate quotes from online using api
const url_string = window.location.href;
console.log(url_string);
// const url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5";
const url = new URL(url_string);
const data = url.searchParams.get("data");
console.log(typeof data);
console.log(decodeURIComponent(data));
