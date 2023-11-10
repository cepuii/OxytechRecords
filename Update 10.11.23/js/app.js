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
