// $("header").append("<div class='glitch-window'></div>");
//fill div with clone of real header
// $( "h1.glitched" ).clone().appendTo( ".glitch-window" );

// Replace 'YOUR_ACCESS_TOKEN' with your actual access token
const accessToken = 'zaO1ibJIcARLCOVjnMOKA7eOOhgQCL';
const beatportApiURL = 'https://api.beatport.com/v4/catalog/labels/33556/releases'; // Replace with the specific endpoint you need
 // Replace with the specific endpoint you need

document.addEventListener('DOMContentLoaded', () => dispalayReleases());

async function getDataFromApi(url){
  return await fetch(url, {
    method: 'GET', // or 'POST' if required by the API
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .catch(error => {
    console.error('There was an error with the fetch operation:', error.message);
  });
}

function dispalayReleases(){
  const releases = getDataFromApi(beatportApiURL)
  .then(data => {
    addReleasesOnPage(data.results);
  })
  .catch(error => console.log(error));
}

function addReleasesOnPage(releases){
    const releasesContainer = document.querySelector('.latest-releases');
    for(let release of releases){
        let releaseCard = document.createElement('div');
        releaseCard.classList.add('release-card');
        const {artists, name, image, price, url} = release;
        const artistsString = artists.map(element=> element.name).join(', ');

        releaseCard.innerHTML = `
            <img src="${image.uri}" alt="1">
            <h3>${name}</h3>
            <p>${artistsString}</p>
            <p>${price.display}</p>
            <audio controls id="myAudio" onerror="handleError(event)">
            <source src="" type="audio/mp3">
            </audio>
            <button onclick="playAudio()">Play</button>
            <button onclick="pauseAudio()">Pause</button>
        `
        getDataFromApi(url).then(data =>{
          getDataFromApi(data.tracks[0]).then(data => {
            const audio = releaseCard.querySelector("#myAudio");
            const source = audio.querySelector('source');
            source.src = data.sample_url;
        }) 
        });

        releasesContainer.appendChild(releaseCard);
    }
}


function playAudio() {
    const audio = document.getElementById("myAudio");
    
    audio.play().catch(e => console.error(e));
  }
  
  function pauseAudio() {
    var audio = document.getElementById("myAudio");
    audio.pause();
  }
  
  function handleError(event) {
    console.error("Error loading audio:", event);
  }
