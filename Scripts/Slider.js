
const sliderContent = document.querySelector('.slider-content');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
const totalSlides = document.querySelectorAll('.project-card').length;

// Function to update the slider's position
function updateSlider() {
    sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Add event listeners to the buttons
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
});