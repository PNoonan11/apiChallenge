const baseURL = "https://api.artic.edu/api/v1/artworks";

let searchURL;
let apiURL;
let imgURL;

const searchForm = document.querySelector("form");

const artName = document.querySelector("h1"); 
const searchTerm = document.querySelector('.artSearch');
const submitBtn = document.querySelector('#submit');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

const loader = document.querySelector("#loading");

searchForm.addEventListener('submit', fetchArt);


function displayLoading() {
    loader.classList.add("display");
    
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    loader.classList.remove("display");
}


function fetchArt(e) {
    
    e.preventDefault();
    searchURL = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm.value}`;while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    // searchURL = `https://api.artic.edu/api/v1/artworks/search?q=monet`;
    console.log('URL:', searchURL);
    
    
    fetch(searchURL)
    //loader
    
    .then(function (result) {
        displayLoading();
        //console.log(result);
        return result.json();
    })
    .then(function (json) {        
        console.log("line 31" + json);
        let artwork = json.data;
        
        for(art of artwork){
            fetch(art.api_link)
            .then(response => {
                //console.log(response);
                return response.json();
                
            })
            .then(finalBoss => {
             console.log(finalBoss);
                displayArt(finalBoss);
                hideLoading();
            })
            .catch(error => console.log("There is an error:", error))
        //displayArt(artwork)
        
    };
        }
    )}
    
    function displayArt(art) {
        
    let artDisplay = document.createElement("article")
    let img = document.createElement("img");
         img.src = `https://www.artic.edu/iiif/2/${art.data.image_id}/full/600,/0/default.jpg`;
         //console.log(img.src);
         section.appendChild(img);
    let artistsName = document.createElement('h1');
         artistsName.textContent = art.data.artist_title;
         section.appendChild(artistsName);
    let heading = document.createElement('h2');
         heading.textContent = art.data.title;
         section.appendChild(heading);
    let artDescription = document.createElement('p');
            artDescription.textContent = art.data.thumbnail.alt_text;
            section.appendChild(artDescription);
    let clearfix = document.createElement('div');
    
    clearfix.setAttribute('class', 'clearfix');
            artDisplay.appendChild(artistsName);
            artDisplay.appendChild(heading);
            artDisplay.appendChild(img);
            artDisplay.appendChild(artDescription);
            artDisplay.appendChild(clearfix);
            section.appendChild(artDisplay);
            }

         