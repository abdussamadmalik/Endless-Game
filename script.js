
const screens = document.querySelectorAll('.screen');
const choose_insect_btn = document.querySelectorAll('.choose-insect-btn');
const game_container = document.getElementById('game-container');
const start_btn = document.getElementById('btn-start');
const timeEl = document.getElementById('time');
const scoreEL = document.getElementById('score');
const stop_btn = document.getElementById('btn-stop');

let second = 0;
let score = 0;
let selected_insect = {};
let gameInterval;

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_insect_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');

        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

stop_btn.addEventListener('click', stopGame);

function startGame() {
    gameInterval = setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(second / 60);
    let s = second % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    second++;
}

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandom();
    insect.style.top = `${x}px`;
    insect.style.left = `${y}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform:rotate(${Math.random() * 360}deg)"/>`;

    insect.addEventListener('click', catchInsect);

    game_container.appendChild(insect);
}

function getRandom() {
    const padding = 100; // Adjust padding as needed to ensure insects don't spawn too close to the edges
    const width = game_container.offsetWidth - padding;
    const height = game_container.offsetHeight - padding;
    const x = Math.random() * height + padding / 2;
    const y = Math.random() * width + padding / 2;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 1000);
    addInsect();
}

function addInsect() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function increaseScore() {
    score++;
    scoreEL.innerHTML = `Score: ${score}`;
}

function stopGame() {
    clearInterval(gameInterval);
    second = 0;
    score = 0;
    selected_insect = {};
    timeEl.innerHTML = `Time: 00:00`;
    scoreEL.innerHTML = `Score: 0`;
    game_container.innerHTML = `
        <h3 id="time" class="time">Time: 00:00</h3>
        <h3 id="score" class="score">Score: 0</h3>
        <button id="btn-stop" class="btn-stop">Stop Game</button>
    `;

    // Reattach the event listener to the stop button
    document.getElementById('btn-stop').addEventListener('click', stopGame);

    // Remove the 'up' class from all screens to reset them
    screens.forEach(screen => screen.classList.remove('up'));
}
