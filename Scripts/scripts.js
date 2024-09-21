// Initialize Lucide icons
lucide.createIcons();

// Parallax effect
function parallax() {
    const parallaxBg = document.querySelector('.parallax-bg');
    let scrollPosition = window.pageYOffset;
    parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
}

window.addEventListener('scroll', parallax);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

