let sliderImages = document.querySelectorAll('.slider__img'),
    sliderParent = document.querySelector('.slider'),
    dotsContainer = document.querySelector('.dots');

let sliderLength = sliderImages.length,
    sliderCount = 0,//Math.floor(sliderImages.length / 2)
    sliderWidth,
    windowWidth = window.screen.width,
    imgVisibleCount;

if (windowWidth > 950) {
    imgVisibleCount = 3;
} else if (windowWidth > 650 && windowWidth < 950) {
    imgVisibleCount = 2;
} else if (windowWidth < 650) {
    imgVisibleCount = 1;
}


function createDots() {
    for (let i = 0; i < sliderImages.length - (imgVisibleCount - 1); i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    };
}

function updateDots() {
    // Удалить класс 'active' у всех точек
    Array.from(dotsContainer.children).forEach(dot => {
        dot.classList.remove('active');
    });

    // Убедиться, что sliderCount находится в допустимом диапазоне
    if (sliderCount >= 0 && sliderCount < dotsContainer.children.length) {
        dotsContainer.children[sliderCount].classList.add('active');
    }
}

createDots();

function showSlide() {
    sliderWidth = document.querySelector('.swiper-slider').offsetWidth;
    sliderImages.forEach(item => [item.style.width, sliderParent.style.gap] = [(windowWidth - (17 * (imgVisibleCount - 1))) / imgVisibleCount + 'px', '17px']);
    rollSlide();
    // focusSlide();
}

showSlide();
// focusSlide();

function nextSlide() {
    sliderCount++;
    if (sliderCount > sliderImages.length - imgVisibleCount) sliderCount = 0;
    rollSlide();
    // unfocusSlide();
}

function prevSlide() {
    sliderCount--;
    if (sliderCount < 0) sliderCount = sliderImages.length - imgVisibleCount;
    rollSlide();

}

function rollSlide() {
    slider.style.transform = `translateX(${(-sliderCount * windowWidth / imgVisibleCount) - Number(sliderParent.style.gap.replace('px', ''))}px)`;
    console.log(sliderCount);
    updateDots();
    // focusSlide();
}

function focusSlide() {
    [sliderImages[sliderCount].style.opacity, sliderImages[sliderCount + 2].style.opacity] = ['.5', '.5'];
}

function unfocusSlide() {
    [sliderImages[sliderCount - 1].style.opacity, sliderImages[sliderCount++].style.opacity] = ['1', '1'];
}

// setInterval(nextSlide, 5000);

slider.addEventListener('resize', showSlide);