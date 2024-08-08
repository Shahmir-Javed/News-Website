
const cardContainer = document.querySelector(".card-container");
const cardTemplate = document.querySelector("#card-template");

// const apiKey = "45af3b86a8414da7a52576abfabdfc00"; // api Key
// const url = "https://newsapi.org/v2/everything?q=";// api url
const url = "https://gnews.io/api/v4/search?q=";
const apiKey = "95da9727d1e3255716bba2281b9ed02f"; 

// Add Event Listener on object window to load  default data from API and show on UI page
window.addEventListener("load", () => {
  DataNews("coding");
});

async function DataNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
  const data = await response.json();
  console.log(data);
  // showCard(data.articles);
    
}

// create a function to show card 
function showCard(data) {
  cardContainer.innerHTML = "";
  data.forEach((articles) => {
    if (!articles.urlToImage) return;
    const cardClone = cardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, articles);
    cardContainer.appendChild(cardClone);
  });
}
//  create a function to fill data in card  
function fillDataInCard(cardClone, articles) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsTime = cardClone.querySelector("#news-time");
  const newsDec = cardClone.querySelector("#news-dec");

  newsImg.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  newsTime.innerHTML = articles.publishedAt;
  newsDec.innerHTML = articles.description;

  // create a date and time funcnality to show on card
  const date = new Date(articles.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });
  newsTime.innerHTML = `${articles.source.name} . ${date}`;
// Add Event Listener on card to open url in new tab

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(articles.url, "_blank");
  });
}
// create a function to onNavItme to select navbar item to show news
let currentId = null
function onNavItme(id) {
  DataNews(id);
    const onNavItme = document.getElementById(id)
  currentId?.classList.remove("active")
  currentId = onNavItme;
  currentId.classList.add("active")
}

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
  
  const searchText = document.querySelector(".news-input").value;
 
  if(!searchText) return
  DataNews(searchText);
  currentId?.classList.remove("active")
  currentId = null
});
// create reload function to reload page when click on logo on nav bar
function reload() {
  window.location.reload();
}
