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


//  =====================  Scroll Animation =======================

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX ||  document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}

// ============================== Contact Scroll Animation ============================================

const animItems2 = document.querySelectorAll('.button.btn1, .button.btn2, .button.btn3, .button.btn4');

if (animItems2.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    
    function animOnScroll() {
        for (let i = 0; i < animItems2.length; i++) {
            const animItem = animItems2[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                    animItem.style.transition = 'all 0.3s ease-out';
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', handleMouseEnter);
});

function handleMouseEnter() {
    this.style.transition = 'all 0.3s ease-in';
    this.style.opacity = 1;
    this.style.transform = 'translate(0px, 0px)';
}

// =============================  Release ==============================

async function getAccessToken() {
    let token = sessionStorage.getItem("token");
    let expirationDate = sessionStorage.getItem("expirationDate");
    if (!token || isExpired(expirationDate)) {
      console.log('get token from server');
      const tokenResponse = await axios(
        "https://expressserver-0u05.onrender.com/token"
      ).catch((error) => console.log(`Can't get token from server`));
      const tokenObj = tokenResponse.data;
      token = tokenObj.access_token;
      updateTokenInSession(tokenObj);
    }
    return token;
  }
  
  function isExpired(expirationDate) {
    return new Date().getTime - expirationDate > 0;
  }
  
  function updateTokenInSession(tokenObj) {
    const expireTime = new Date();
    expireTime.setTime(expireTime.getTime() + tokenObj.expires_in);
    sessionStorage.setItem("expirationDate", expireTime.getTime());
    sessionStorage.setItem("token", tokenObj.access_token);
  }
  
  const beatportApiURL ="https://api.beatport.com/v4/catalog/labels/33556/releases";
  
  const headerButton = document.querySelector(".headerbtn");

  const loader = document.querySelector('#loader');
  document.addEventListener("DOMContentLoaded", () => {
    getAccessToken();
    dispalayReleases();
  });
  
  async function getDataFromApi(url) {
    const accessToken = await getAccessToken();
    if(!url.startsWith('https')){
      url = "https://" + url;
    }
    return await fetch(url, {
      method: "GET", // or 'POST' if required by the API
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(
          "There was an error with the fetch operation:",
          error.message
        );
      });
  }
  
  async function dispalayReleases(url = beatportApiURL) {
    console.log(`get info from url: ${url}`);
    const releases = await getDataFromApi(url)
      .then((data) => {
        console.log(data);
        addReleasesOnPage(data.results);
        updateButtonsPagination( data.next, data.previous);
      })
      .catch((error) => console.log(error));
  }
  
  const releasesContainer = document.querySelector(".release-container");
  document.querySelector(".release-li").addEventListener("click", () =>{
    releasesContainer.classList.toggle('hidden');
  });
  
  function updateButtonsPagination(next, previous){

    const nextButton =  document.querySelector('#nextPage')
    
    const prevButton = document.querySelector('#prevPage');

    previous ? (prevButton.disabled=false) : (prevButton.disabled=true);
    next ? (nextButton.disabled=false) : (nextButton.disabled=true);


    nextButton.onclick = () => dispalayReleases(next);
    prevButton.onclick = () => dispalayReleases(previous);

  }

  function addReleasesOnPage(releases) {
    loader.style.display = "none";
    releasesContainer.innerHTML='';
    for (let release of releases) {
      let releaseCard = document.createElement("div");
      releaseCard.classList.add("release-card");
      const { id, artists, name, image, price, url } = release;
      const artistsString = artists.map((element) => element.name).join(", ");
      releaseCard.innerHTML = `
          <div class="image-container release-card">
            <div class="front-side">
              <div class="inner">
                <img src="${image.uri}" alt="1">
              </div>
            </div>
            <div class="back-side">
              <div class="inner" style="display:flex; justify-content:center; align-items:center;">
                <audio id="${id}" hidden onerror="handleError(event)">
                </audio>
                <div class="audio">
                  <div class="progress"></div>
                  <div class="info">
                    <div class="thumbnail">
                      <img src="${image.uri}" alt=""/>
                      <span class="play_pause">
                        <i class="bx bx-play-circle"></i>
                      </span>
                    </div>
                    <div class="volume">
                      <span class="volume-down"> - </span>
                      <div class="volume-progress">
                        <div class="volume-bar"></div>
                      </div>
                      <span class="volume-up"> + </span>
                    </div>
                    <div class="action">
                      <div class="song">
                        <div class="name">${name}</div>
                        <div class="singer">${artistsString}</div>
                      </div>
                      <div class="time">
                        <span class="current">0:00</span>
                        /
                        <span class="duration">0:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;
      
      
      const audio = releaseCard.querySelector("audio");

      // get mp3 url
      getDataFromApi(url).then((data) => {
        getDataFromApi(data.tracks[0]).then((data) => {
          audio.src = data.sample_url;
        });
      });
  

      (() => {
        const progressBar = releaseCard.querySelector(".progress");
  
        for (i = 0; i < 100; i++) {
          let span = document.createElement("span");
          span.style.setProperty("--i", i);
          progressBar.append(span);
        }
      })();
  
      /**
       * Audio player controls
       */
      let play_pause = releaseCard.querySelector(".play_pause");
      let duration = releaseCard.querySelector(".duration");
      let current = releaseCard.querySelector(".current");
      let list_span = releaseCard.querySelectorAll(".progress span");
      let volume_span = releaseCard.querySelectorAll(".volume span");
  
      let timeFormat = (time) => {
        second = Math.floor(time % 60);
        minute = Math.floor((time / 60) % 60);
        if (second < 10) {
          second = "0" + second;
        }
  
        time = minute + ":" + second;
        return time;
      };
  
      audio.addEventListener("loadedmetadata", () => {
        duration.textContent = timeFormat(audio.duration);
      });
  
      
      const playPauseButtonToggle =() => {
        let iBtn = releaseCard.querySelector(".play_pause i");
  
        if (audio.paused) {
          audio.play();
          iBtn.classList.replace("bx-play-circle", "bx-pause-circle");
        } else {
          audio.pause();
          iBtn.classList.replace("bx-pause-circle", "bx-play-circle");
        }
      }
      
      play_pause.addEventListener("click", playPauseButtonToggle);

      audio.addEventListener("timeupdate", () => {
        time_current = audio.currentTime;
        time_duration = audio.duration;
  
        let position = Math.floor((time_current * 100) / time_duration);
  
        current.textContent = timeFormat(time_current);
  
        list_span[position].classList.add("active");
      });
  
      /**
       * Volume controll
       */
      audio.volume = 0.5;
  
      volume_span.forEach((element) => {
        element.addEventListener("click", (e) => {
          let volume = 0;
          
          if (element.classList.contains("volume-down")) {
            volume = audio.volume - 0.1;
          } else if (element.classList.contains("volume-up")) {
            volume = audio.volume + 0.1;
          }
  
          audio.volume = Math.min(1, Math.max(0, volume));
  
          let width = audio.volume * 150;
          let bar = releaseCard.querySelector(".volume-bar");
          bar.style.setProperty("width", width + "px");
        });
      });
  
      /**
       * Seeking
       */
  
      list_span.forEach((element, index) => {
        element.addEventListener("click", (e) => {
          //remove active classes
          list_span.forEach((e) => {
            e.classList.remove("active");
          });
  
          //add active class to selected range
          for (k = 0; k <= index; k++) {
            list_span[k].classList.add("active");
          }
  
          //set current time
          let time_go = (index * audio.duration) / 100;
          audio.currentTime = time_go;
        });
      });
  
      const stopAudio = () => {
        let iBtn = releaseCard.querySelector(".play_pause i");
        iBtn.classList.replace("bx-pause-circle", "bx-play-circle");
        current.textContent = "0:00";
  
        list_span.forEach((e) => {
          e.classList.remove("active");
        });
      }

      // pause audio playing when mouse leave card borders
      releaseCard.querySelector('.image-container').addEventListener("mouseleave", () => {
        let iBtn = releaseCard.querySelector(".play_pause i");
        audio.pause();
        iBtn.classList.replace("bx-pause-circle", "bx-play-circle");
      });
      
      // stop audio playing when song is end
      audio.addEventListener("ended", stopAudio);
  
      releasesContainer.appendChild(releaseCard);
    
    }
  }
  
  

  function handleError(event) {
    console.error("Error loading audio:", event);
  }
