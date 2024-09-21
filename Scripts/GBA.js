const techLogos = [
    { name: 'HTML', color: '#E34F26', logo: 'assets/html.png' },
    { name: 'CSS', color: '#1572B6', logo: 'assets/css.png' },
    { name: 'JavaScript', color: '#F7DF1E', logo: 'assets/js.png' },
    { name: 'React', color: '#61DAFB', logo: 'assets/react.png' },
    { name: 'Unity', color: '#000000', logo: 'assets/unity.png' },
    { name: 'Unreal Engine', color: '#313131', logo: 'assets/unreal-engine.png' }
];

let currentTech = 0;

const techLogo = document.getElementById('techLogo');
const techName = document.getElementById('techName');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const screen = document.querySelector('.screen');

function updateTech() {
    const tech = techLogos[currentTech];
    techLogo.src = tech.logo;
    techLogo.alt = `Logo de ${tech.name}`;
    techName.textContent = tech.name;
    screen.style.backgroundColor = tech.color;
}

prevButton.addEventListener('click', () => {
    currentTech = (currentTech > 0) ? currentTech - 1 : techLogos.length - 1;
    updateTech();
});

nextButton.addEventListener('click', () => {
    currentTech = (currentTech < techLogos.length - 1) ? currentTech + 1 : 0;
    updateTech();
});

// Inicializar la pantalla
updateTech();