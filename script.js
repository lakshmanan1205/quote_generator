//VARIABLES
const quoteContainerElement = document.getElementById("quote_container");
const quoteTextElement = document.getElementById("quote");
const authorTextElement = document.getElementById("author");
const twitterBtnElement = document.getElementById("twitter");
const newQuoteBtnElement = document.getElementById("new_quote");
const loaderElement = document.getElementById("loader");
const webviewElement = document.getElementById("webview");

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
const { firstName } = decodeURIComponent(data);
// const { firstName } = decodeURIComponent(
//   "%7B%22status%22%3A%22success%22%2C%22data%22%3A%7B%22id%22%3A1%2C%22firstName%22%3A%22lakshmanan%22%2C%22lastName%22%3A%22moorthy%22%2C%22usertype%22%3A%22Customer%22%2C%22username%22%3A%22laksh%40yopmail.com%22%2C%22mobileNo%22%3A%229498398765%22%2C%22expoToken%22%3Anull%2C%22status%22%3Atrue%2C%22createdAt%22%3A%222024-01-29T18%3A10%3A01.000Z%22%2C%22updatedAt%22%3A%222024-01-29T18%3A10%3A01.000Z%22%2C%22token%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwNzA0NzQxOCwiZXhwIjoxNzA5NjM5NDE4fQ.VtjuIETD2bgpwlA2-hnFqm4I6ywWOhGnnx9Ir-QJhjM%22%2C%22authenticated%22%3Atrue%7D%7D"
// );
// webviewElement.textContent = decodeduser.firstName;
console.log("laksh", laksh);
webviewElement.textContent = "sriram";
webviewElement.textContent = firstName ? firstName : "check";
