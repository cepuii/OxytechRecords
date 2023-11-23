//  ---------------- меню ------------------------
// Отобразим только хедер

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");
  const button = document.querySelector(".headerbtn");
  const aboutSection = document.querySelector(".about-us-section");
  const artistsSection = document.querySelector(".section-artists");
  const releaseSection = document.querySelector(".release-section");
  const demoSection = document.querySelector("#contenedor");
  const contactSection = document.querySelector(".contact-section");
  let currentSection = null;

  const modal = document.getElementById("myModal");
  const closeButton = document.getElementsByClassName("close")[0];

  document
    .querySelector(".send-demo-li")
    .addEventListener("click", function () {
      showSection(contactSection);
      modal.style.display = "block";
    });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  button.addEventListener("click", function (e) {
    e.preventDefault();
    menu.classList.toggle("active");
    updateMenuState();
  });

  closeButton.addEventListener("click", function () {
    toggleMenu();
  });

  // Функция для сворачивания/раскрывания меню
  function toggleMenu() {
    menu.classList.toggle("collapsed");
  }

  // Обновленный обработчик события scroll
  window.addEventListener("scroll", function () {
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
      (currentSection === artistsSection &&
        scrollTop >= artistsSectionOffset) ||
      (currentSection === releaseSection &&
        scrollTop >= releaseSectionOffset) ||
      (currentSection === demoSection && scrollTop >= demoSectionOffset) ||
      (currentSection === contactSection && scrollTop >= contactSectionOffset)
    ) {
      menu.classList.add("fixed");
      if (menu.classList.contains("collapsed")) {
        expandMenu();
      }
    } else {
      menu.classList.remove("fixed");
      if (!menu.classList.contains("collapsed")) {
        collapseMenu();
      }
    }
  }

  function collapseMenu() {
    menu.classList.add("collapsed");
  }
  function expandMenu() {
    menu.classList.remove("collapsed");
  }

  window.addEventListener("scroll", function () {
    updateMenuState();
  });

  function scrollToSection(section) {
    section.scrollIntoView({ behavior: "smooth" });
  }

  document.querySelector(".dark-music-header").style.display = "block";

  function showSection(section) {
    if (currentSection === section) {
      section.style.display = "none";
      currentSection = null;
    } else {
      if (currentSection) {
        currentSection.style.display = "none";
      }
      section.style.display = "block";
      scrollToSection(section);
      currentSection = section;
    }
  }

  aboutSection.style.display = "none";
  artistsSection.style.display = "none";
  releaseSection.style.display = "none";
  demoSection.style.display = "none";
  contactSection.style.display = "none";

  // Добавим обработчики для каждого пункта меню
  document.querySelector(".about-li").addEventListener("click", function () {
    showSection(aboutSection);
  });
  document.querySelector(".artists-li").addEventListener("click", function () {
    showSection(artistsSection);
  });
  document.querySelector(".release-li").addEventListener("click", function () {
    showSection(releaseSection);
  });
  document
    .querySelector(".send-demo-li")
    .addEventListener("click", function () {
      showSection(demoSection);
    });
  document.querySelector(".contact-li").addEventListener("click", function () {
    showSection(contactSection);
  });
});

//  ------------------- About Us -------------------------

const hiddenText = document.querySelector(".About_info");
let isVisible = false;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const elementPosition = hiddenText.offsetTop;
  const windowHeight = window.innerHeight;

  if (scrollPosition >= elementPosition - window.innerHeight / 2) {
    hiddenText.style.opacity = 1;
    hiddenText.style.transform = "translateY(0)";
  }

  if (scrollPosition >= elementPosition - windowHeight / 2 && !isVisible) {
    hiddenText.style.opacity = 1;
    hiddenText.style.transform = "translateY(0)";
    isVisible = true;
  } else if (scrollPosition < elementPosition - windowHeight / 2 && isVisible) {
    hiddenText.style.opacity = 0;
    hiddenText.style.transform = "translateY(300px)";
    isVisible = false;
  }
});

//  ------------------- Latest releases -------------------------

async function getAccessToken() {
  let token = sessionStorage.getItem("token");
  if (!token) {
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
  const now = new Date();
  const tokenExpirationDate = now.getTime() + tokenObj.expires_in;
  sessionStorage.setItem("expirationDate", tokenExpirationDate);
  sessionStorage.setItem("token", tokenObj.access_token);
}

const beatportApiURL =
  "https://api.beatport.com/v4/catalog/labels/33556/releases";

const headerButton = document.querySelector(".headerbtn");

document.addEventListener("DOMContentLoaded", () => {
  getAccessToken();
  dispalayReleases();
});

async function getDataFromApi(url) {
  const accessToken = await getAccessToken();
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

  const releases = await getDataFromApi(url)
    .then((data) => {
      addReleasesOnPage(data.results);
    })
    .catch((error) => console.log(error));
}

const releasesContainer = document.createElement("div");

document
  .querySelector(".release-li")
  .addEventListener("click", () =>
    document.querySelector(".release-section").appendChild(releasesContainer)
  );

function addReleasesOnPage(releases) {
  releasesContainer.classList.add("release-container");
  console.log(releases);
  for (let release of releases) {
    let releaseCard = document.createElement("div");
    releaseCard.classList.add("release-card");
    const { id, artists, name, image, price, url } = release;
    const artistsString = artists.map((element) => element.name).join(", ");
    releaseCard.innerHTML = `
      <div class="image-parlax" ontouchstart="this.classList.toggle('hover');">
        <div class="image-container release-card">
          <div class="front-side">
            <div class="inner">
              <img src="${image.uri}" alt="1">
            </div>
          </div>
          <div class="back-side" style="background-image: url(${image.uri}); background-size:contain; backgtound-position:center">
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
      </div>
    `;

    const audio = releaseCard.querySelector("audio");
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

    play_pause.addEventListener("click", () => {
      let iBtn = releaseCard.querySelector(".play_pause i");

      if (audio.paused) {
        audio.play();
        iBtn.classList.replace("bx-play-circle", "bx-pause-circle");
      } else {
        audio.pause();
        iBtn.classList.replace("bx-pause-circle", "bx-play-circle");
      }
    });

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

        if (volume < 0) {
          audio.volume = 0;
        } else if (volume > 1) {
          audio.volume = 1;
        } else {
          audio.volume = volume;
        }

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

    audio.addEventListener("ended", (e) => {
      let iBtn = releaseCard.querySelector(".play_pause i");
      iBtn.classList.replace("bx-pause-circle", "bx-play-circle");
      current.textContent = "0:00";

      list_span.forEach((e) => {
        e.classList.remove("active");
      });
    });

    releasesContainer.appendChild(releaseCard);
  
  }


  // let player = new Playerjs({ replace: "audio" });
}

function handleError(event) {
  console.error("Error loading audio:", event);
}
