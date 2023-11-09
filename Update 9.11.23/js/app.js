let menu = document.querySelector('.menu');
let button = document.querySelector('.headerbtn');
let isMenuOpen = false;

button.addEventListener('click', function (e) {
    e.preventDefault();
    isMenuOpen = !isMenuOpen;
    menu.classList.toggle('active', isMenuOpen)

    // if (isMenuOpen) {
    //     document.body.style.overflow = 'hidden';
    // } else {
    //     document.body.style.overflow = '';
    // }
    if (isMenuOpen) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

window.addEventListener('scroll', function () {
    let shouldFixMenu = window.scrollY > 50 && !isMenuOpen;
    menu.classList.toggle('fixed-menu', shouldFixMenu);

    //  Добавлен код для скрытия меню при прокрутке
     if (shouldFixMenu && isMenuOpen) {
        menu.classList.remove('active');
        isMenuOpen = false;
        document.body.classList.remove('menu-open');
     }
});

document.querySelectorAll('.menu ul li').forEach(function (item) {
    item.addEventListener('click', function () {
        let sectionId = this.textContent.toLowerCase().replace(' ', '');

        // Показываем выбранную секцию
        let section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden');
            scrollToSection(sectionId);
            menu.classList.remove('active');
            isMenuOpen = false;
            // document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }   
    });
});

// Функция для плавной прокрутки к секции
function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);

    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}