class Slider {
    constructor(sliderSelector, gallerySelector, slidesPerView = 3) {
        this.slider = document.querySelector(sliderSelector);
        this.gallery = document.querySelector(gallerySelector);
        this.slidesPerView = slidesPerView;
        this.slidesCount = this.gallery.children.length;
        this.currentSlide = 0;
        this.galleryGap = 20;

        if (!this.slider || !this.gallery || !this.isSliderValid()) {
            console.error("Slider or gallery element not found, or slider is invalid.");
            return;
        }

        this.setDimensions();
        this.createSwitchers();
        this.paintSlides();
        this.deleteSlidesDrag();
        this.controlDots();
    }

    isSliderValid() {
        return Array.from(this.gallery.children).every(element => element.classList.contains('slide'));
    }

    setDimensions() {
        this.galleryWidth = this.slider.clientWidth;
        if (this.slidesPerView > 2) {
            this.slideWidth = (this.galleryWidth - (this.galleryGap * 2)) / this.slidesPerView;
        } else if (this.slidesPerView === 1) {
            this.slideWidth = (this.galleryWidth) / this.slidesPerView;
        } else if (this.slidesPerView === 2) {
            this.slideWidth = (this.galleryWidth - (this.galleryGap)) / this.slidesPerView;
        }
        Array.from(this.gallery.children).forEach(element => {
            element.style.width = `${this.slideWidth}px`;
        });
        this.gallery.style.gap = `${this.galleryGap}px`;
    }

    deleteSlidesDrag() {
        Array.from(this.gallery.children).forEach(element => {
            element.addEventListener('dragstart', (event) => {
                event.preventDefault();
            });
        });
    }


    paintSlides() {
        const max = 255;
        const min = 0;
        Array.from(this.gallery.children).forEach(element => {
            const r = Math.floor(Math.random() * (max - min + 1) + min);
            const g = Math.floor(Math.random() * (max - min + 1) + min);
            const b = Math.floor(Math.random() * (max - min + 1) + min);
            element.style.background = `rgb(${r}, ${g}, ${b})`; //Simplified color setting
        });
    }

    createSwitchers() {
        const newSpanLeft = document.createElement('span');
        newSpanLeft.className = 'switchSlideLeft';
        this.slider.appendChild(newSpanLeft);
        this.newSpanWidth = 40;
        newSpanLeft.style.position = 'absolute';
        newSpanLeft.style.width = `${this.newSpanWidth}px`;
        newSpanLeft.style.aspectRatio = '1 / 1'; //Note: aspect-ratio might not be supported in all browsers.
        newSpanLeft.style.background = 'black';
        newSpanLeft.style.top = '50%';
        newSpanLeft.style.transform = 'translateY(-50%)';
        newSpanLeft.style.cursor = 'pointer';
        newSpanLeft.style.left = `${-this.newSpanWidth / 2}px`;
        
        const newSpanRight = document.createElement('span');
        newSpanRight.className = 'switchSlideRight';
        this.slider.appendChild(newSpanRight);
        newSpanRight.style.position = 'absolute';
        newSpanRight.style.width = `${this.newSpanWidth}px`;
        newSpanRight.style.aspectRatio = '1 / 1'; //Note: aspect-ratio might not be supported in all browsers.
        newSpanRight.style.background = 'black';
        newSpanRight.style.top = '50%';
        newSpanRight.style.transform = 'translateY(-50%)';
        newSpanRight.style.cursor = 'pointer';
        newSpanRight.style.right = `${(-this.newSpanWidth / 2)}px`;

        //Add event listeners here to call rollSlideLeft/rollSlideRight
        newSpanLeft.addEventListener('click', () => this.rollSlide('left'));
        newSpanRight.addEventListener('click', () => this.rollSlide('right'));
        
    }

    rollSlide(direction) {
        if (direction === 'right') {
            if (this.canSwitchRight()) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
        } else if (direction === 'left') {
            if (this.canSwitchLeft()) {
                this.currentSlide--;
            } else {
                this.currentSlide = this.slidesCount - this.slidesPerView;
            }
        }
        this.updateSliderPosition();
    }

    controlDots() {
        if (!Array.from(this.slider.children).some(child => child.className.includes("dot"))) {
            this.dots = document.createElement('div');
            this.dots.className = 'dots';
            this.slider.appendChild(this.dots);
            for (let pos = 0; pos < this.slidesCount - (this.slidesPerView - 1); pos++) {
                const newDot = document.createElement('div');
                newDot.className = 'dot';
                this.dots.append(newDot);

                newDot.addEventListener('click', () => {
                    this.currentSlide = pos;
                    this.updateSliderPosition();
                });
            }
        }
    }

    canSwitchRight() {
        const lastVisibleSlideIndex = this.currentSlide + this.slidesPerView - 1;
        return lastVisibleSlideIndex < this.slidesCount - 1;
    }

    canSwitchLeft() {
        return this.currentSlide > 0;
    }

    updateSliderPosition() {
        const translateXValue = -this.currentSlide * (this.slideWidth + this.galleryGap);
        this.gallery.style.transform = `translateX(${translateXValue}px)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.slider', '.gallery');
});