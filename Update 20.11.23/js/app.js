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
        updateMenuState();
	});

    closeButton.addEventListener('click', function () {
        toggleMenu();
    });
    
    // Функция для сворачивания/раскрывания меню
    function toggleMenu() {
        menu.classList.toggle('collapsed');
    }
    
    // Обновленный обработчик события scroll
    window.addEventListener('scroll', function () {
        updateMenuState();
    });

function updateMenuState() {
    const aboutSectionOffset = aboutSection.offsetTop;
    const artistsSectionOffset = artistsSection.offsetTop;
    const releaseSectionOffset = releaseSection.offsetTop;
    const demoSectionOffset = demoSection.offsetTop;
    const contactSectionOffset = contactSection.offsetTop;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const isMenuFixed = scrollTop > menu.offsetTop;

    if (
        (currentSection === aboutSection && scrollTop >= aboutSectionOffset) ||
        (currentSection === artistsSection && scrollTop >= artistsSectionOffset) ||
        (currentSection === releaseSection && scrollTop >= releaseSectionOffset) ||
        (currentSection === demoSection && scrollTop >= demoSectionOffset) ||
        (currentSection === contactSection && scrollTop >= contactSectionOffset)
    ) {
        menu.classList.add('fixed');
        if (menu.classList.contains('collapsed')) {
            expandMenu();
        }
    } else {
        menu.classList.remove('fixed');
        if (!menu.classList.contains('collapsed')) {
            collapseMenu();
        }
    }
}

    function collapseMenu() {
        menu.classList.add('collapsed');
    }
    function expandMenu() {
        menu.classList.remove('collapsed');
    }

    window.addEventListener('scroll', function () {
        updateMenuState();
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

//  ------------------- About Us -------------------------

const hiddenText = document.querySelector('.About_info');
let isVisible = false;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const elementPosition = hiddenText.offsetTop;
    const windowHeight = window.innerHeight;

    if (scrollPosition >= elementPosition - window.innerHeight / 2) {
        hiddenText.style.opacity = 1;
        hiddenText.style.transform = 'translateY(0)';
    }

    if (scrollPosition >= elementPosition - windowHeight / 2 && !isVisible) {
        hiddenText.style.opacity = 1;
        hiddenText.style.transform = 'translateY(0)';
        isVisible = true;
    } else if (scrollPosition < elementPosition - windowHeight / 2 && isVisible) {
        hiddenText.style.opacity = 0;
        hiddenText.style.transform = 'translateY(300px)';
        isVisible = false;
    }
});



