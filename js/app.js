// $("header").append("<div class='glitch-window'></div>");
//fill div with clone of real header
// $( "h1.glitched" ).clone().appendTo( ".glitch-window" );
 

// fetch('https://api.beatport.com/v4/auth/login/?next=/v4/auth/o/authorize/%3Fresponse_type%3Dcode%26client_id%3D0GIvkCltVIuPkkwSJHp6NDb3s0potTjLBQr388Dd%26redirect_uri%3Dhttps%253A%252F%252Fapi.beatport.com%252Fv4%252Fauth%252Fo%252Fpost-message%252F', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     'username': "cepuii",
//     'password': "Chernousov1992"
//   })
// })
// .then(response => console.log(response))
// .catch((error) => console.error(code: wpXyCwlZLJKrVez76d9LYLqYuFCtv7
//   grant_type: authorization_code
//   redirect_uri: https://api.beatport.com/v4/auth/o/post-message/
//   client_id: 0GIvkCltVIuPkkwSJHp6NDb3s0potTjLBQr388Dd'Error:', error));

// fetch('https://api.beatport.com/v4/docs/')
// .then(response => response.text())
// .then(data => console.log(data))
// .catch((error) => console.error('Error:', error));


const authorizationEndpoint = 'https://api.beatport.com/v4/auth/o/authorize';
const clientId = '0GIvkCltVIuPkkwSJHp6NDb3s0potTjLBQr388Dd'; // Replace with your actual client ID
const redirectUri = 'https://cepuii.github.io/OxytechRecords/'; // Replace with your actual redirect URI

const url = `${authorizationEndpoint}?client_id=${encodeURIComponent(clientId)}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;

// Redirect the user to the authorization URL
window.location.href = url;

// Parse the query string to extract the authorization code
const queryParams = new URLSearchParams(window.location.search);
const code = queryParams.get('code');

if (code) {
    // Now exchange the authorization code for an access token
    const tokenEndpoint = 'https://api.beatport.com/v4/auth/o/token/';
    const body = new URLSearchParams();
    body.append('client_id', clientId);
    body.append('code', code);
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', redirectUri);

    // Make the POST request to the token endpoint
    fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Access Token:', data.access_token);
        // You can now use the access token to make authenticated requests to the API
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Replace 'YOUR_ACCESS_TOKEN' with your actual access token
const accessToken = 'zaO1ibJIcARLCOVjnMOKA7eOOhgQCL';
const beatportApiURL = 'https://api.beatport.com/v4/catalog/labels/33556/releases'; // Replace with the specific endpoint you need
 // Replace with the specific endpoint you need

// document.addEventListener('DOMContentLoaded', () => dispalayReleases());

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
