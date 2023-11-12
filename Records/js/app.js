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