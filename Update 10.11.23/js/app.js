//  ---------------- меню ------------------------

// Отобразим только хедер

document.addEventListener('DOMContentLoaded', function() {
const menu = document.querySelector('.menu');
const button = document.querySelector('.headerbtn');
const aboutSection = document.querySelector('.about-us-section');
const artistsSection = document.querySelector('.section-artists');
const releaseSection = document.querySelector('.release-section');
const demoSection = document.querySelector('#contenedor');
const contactSection = document.querySelector('.contact-section');
let currentSection = null;

const modal = document.getElementById('myModal');
const closeButton = document.getElementsByClassName('close')[0];

document.querySelector('.send-demo-li').addEventListener('click', function() {
    showSection(contactSection);
    modal.style.display = 'block';
  });
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
});

    button.addEventListener('click', function(e){
		e.preventDefault();
		menu.classList.toggle('active');
	});

	function scrollToSection(section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
	document.querySelector('.dark-music-header').style.display = 'block';

	function showSection(section) {
        if (currentSection === section) {
            section.style.display = 'none';
            currentSection = null;
        } else {
            if (currentSection) {
                currentSection.style.display = 'none';
            }
            section.style.display = 'block';
            scrollToSection(section);
            currentSection = section;
        }
    }

		aboutSection.style.display = 'none';
		artistsSection.style.display = 'none';
		releaseSection.style.display = 'none';
		demoSection.style.display = 'none';
		contactSection.style.display = 'none';

// Добавим обработчики для каждого пункта меню
document.querySelector('.about-li').addEventListener('click', function() {
    showSection(aboutSection);
});
document.querySelector('.artists-li').addEventListener('click', function() {
    showSection(artistsSection);
});
document.querySelector('.release-li').addEventListener('click', function() {
    showSection(releaseSection);
});
document.querySelector('.send-demo-li').addEventListener('click', function() {
    showSection(demoSection);
});
document.querySelector('.contact-li').addEventListener('click', function() {
    showSection(contactSection);
});
});


const accessToken = 'Ve05OQaQlh04IxuPaZbldp6blyB6qe';
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
    const releasesContainer = document.querySelector('.release-section');
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
            <audio onerror="handleError(event)">
            </audio>
            <button class='play' >Play</button>
            <button class='pause' >Pause</button>
            `
            const audio = releaseCard.querySelector('audio');
        getDataFromApi(url).then(data =>{
          getDataFromApi(data.tracks[0]).then(data => {
            console.log(data);
            audio.src = data.sample_url;
        }) 
        });

        releaseCard.querySelector('.play').addEventListener('click',() => audio.play());
        releaseCard.querySelector('.pause').addEventListener('click',() => audio.pause());

        releasesContainer.appendChild(releaseCard);
    }
}
  
  function handleError(event) {
    console.error("Error loading audio:", event);
  }
