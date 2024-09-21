document.addEventListener('DOMContentLoaded', () => {
    const parallaxBg = document.querySelector('.parallax-bgGBA');
    let lastScrollY = window.scrollY;

    function updateParallax() {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;
        const currentTransform = getComputedStyle(parallaxBgGBA).getPropertyValue('transform');
        const matrix = new DOMMatrix(currentTransform);
        const currentY = matrix.m42;
        const newY = Math.max(-280, Math.min(0, currentY - deltaY * 0.5));
        
        parallaxBg.style.transform = `translateY(${newY}px)`;
        lastScrollY = scrollY;

        requestAnimationFrame(updateParallax);
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });

    // Efecto de movimiento con el mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        const moveX = 20 * (0.5 - mouseX);
        const moveY = 20 * (0.5 - mouseY);

        parallaxBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});