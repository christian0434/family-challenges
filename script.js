// Datos de Retos para Morir de Risa
const retosRisa = [
    {
        title: "🎤 El Doblaje Familiar",
        description: "Elijan a un familiar. Durante 30 segundos, otra persona deberá hablar por él como si fuera su 'voz oficial'.",
        time: 30
    },
    {
        title: "👗 Pasarela de la Casa",
        description: "Cada jugador debe elegir un objeto de la casa y convertirlo en un accesorio de moda. Después hagan una pasarela.",
        time: 120
    },
    {
        title: "🗿 Estatua Familiar",
        description: "Una persona grita una situación: '¡Todos estamos en un barco que se hunde!'. Todos deben crear una estatua representándola.",
        time: 60
    },
    {
        title: "🕵️ Imitación Secreta",
        description: "Imita a alguien de la familia sin decir su nombre. Los demás deben descubrir quién es.",
        time: 45
    },
    {
        title: "😂 La Risa Prohibida",
        description: "Dos jugadores deben mirarse fijamente durante 30 segundos. El primero que se ría pierde.",
        time: 30
    },
    {
        title: "📺 Comercial Absurdo",
        description: "Tomen cualquier objeto cercano y hagan un comercial de 20 segundos intentando convencer a los demás de comprarlo.",
        time: 20
    },
    {
        title: "🎬 Película en 3 Segundos",
        description: "Representa una película únicamente con gestos. Tienes 3 segundos para comenzar.",
        time: 3
    },
    {
        title: "🗣️ El Traductor Familiar",
        description: "Un jugador habla en un idioma inventado y otro debe 'traducir' lo que supuestamente está diciendo.",
        time: 60
    },
    {
        title: "📸 Foto Congelada",
        description: "Todos tienen 10 segundos para crear una fotografía humana de un recuerdo familiar.",
        time: 10
    },
    {
        title: "🎭 Cambio de Personalidad",
        description: "Durante un minuto, actúa como otro integrante de la familia.",
        time: 60
    },
    {
        title: "🔤 Abecedario Rápido",
        description: "Di el abecedario en menos de 10 segundos.",
        time: 10
    }
];

// Datos de Retos para Crear Recuerdos
const retosRecuerdos = [
    {
        title: "📖 La Historia Perdida",
        description: "Pregunta a un familiar por una historia de su infancia que nunca hayas escuchado.",
        time: 120
    },
    {
        title: "❤️ Nuestro Momento Favorito",
        description: "Todos cuentan un momento familiar que quisieran repetir.",
        time: 180
    },
    {
        title: "🙏 El Agradecimiento Secreto",
        description: "Elige a alguien y dile algo que realmente agradezcas de esa persona.",
        time: 60
    },
    {
        title: "⏰ La Cápsula del Tiempo",
        description: "Todos escriben una frase que quieran recordar dentro de 5 años.",
        time: 120
    },
    {
        title: "✈️ Si Pudiéramos Viajar Juntos",
        description: "La familia debe decidir un lugar al que viajarían juntos y explicar por qué.",
        time: 180
    },
    {
        title: "🎭 El Recuerdo Actuado",
        description: "Representen entre todos un recuerdo familiar sin hablar. Los demás deben descubrir cuál es.",
        time: 120
    },
    {
        title: "🖼️ La Fotografía Imposible",
        description: "Recrear una fotografía antigua de la familia utilizando únicamente lo que tengan en casa.",
        time: 240
    },
    {
        title: "💝 Una Cosa Que Nunca Te Dije",
        description: "Dile a otro jugador algo bonito que probablemente nunca le hayas dicho.",
        time: 90
    }
];

// Datos de Misiones Secretas
const misionesSecretas = [
    {
        title: "🤗 El Abrazo Invisible",
        description: "Tu misión es conseguir que alguien de la familia te dé un abrazo sin pedirlo directamente."
    },
    {
        title: "🚫 La Palabra Prohibida",
        description: "Haz que alguien diga una palabra específica sin preguntársela directamente. La palabra es: 'risas'"
    },
    {
        title: "🎭 El Imitador",
        description: "Haz que otro jugador imite exactamente uno de tus movimientos sin que lo notes."
    },
    {
        title: "😆 La Risa Contagiosa",
        description: "Consigue que alguien se ría contigo sin contar un chiste directo."
    },
    {
        title: "📦 El Objeto Viajero",
        description: "Haz que otro jugador te entregue un objeto específico sin decirle cuál necesitas. El objeto: cualquier cosa de color rojo."
    },
    {
        title: "💬 El Cumplido",
        description: "Consigue que alguien te diga algo bonito durante el juego."
    },
    {
        title: "🧠 El Recuerdo",
        description: "Haz que alguien cuente una anécdota de cuando era pequeño sin preguntarle directamente."
    },
    {
        title: "🔍 El Detective",
        description: "Descubre cuál es el recuerdo favorito de otro jugador mediante preguntas indirectas."
    },
    {
        title: "🤝 El Ayudante Secreto",
        description: "Consigue que alguien te ayude a realizar una tarea pequeña sin revelar tu misión."
    },
    {
        title: "✨ La Palabra Mágica",
        description: "Haz que alguien diga 'gracias' durante la partida de forma natural."
    },
    {
        title: "🪑 El Cambio de Lugar",
        description: "Consigue que otro jugador cambie de asiento contigo sin sospechar."
    },
    {
        title: "👏 El Aplauso",
        description: "Haz que toda la familia aplauda sin decir 'aplaudan'."
    },
    {
        title: "❓ La Pregunta Imposible",
        description: "Consigue que alguien te haga una pregunta durante el juego."
    },
    {
        title: "🎬 El Director",
        description: "Haz que dos jugadores realicen exactamente el mismo movimiento sin que ellos lo noten."
    },
    {
        title: "📷 El Fotógrafo",
        description: "Consigue que alguien tome una fotografía contigo sin explicar por qué."
    }
];

// Colores Aleatorios
const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6'];

// Variables Globales
let currentScreen = 'retos';
let timerInterval = null;
let timerRunning = false;
let timeLeft = 0;
let currentPlayer = 1;
let totalPlayers = 4;
let usedMissions = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupModeButtons();
});

// Setup de Botones de Modo
function setupModeButtons() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            currentScreen = this.getAttribute('data-mode');
            document.getElementById(currentScreen + '-screen').classList.add('active');
            
            resetChallenge();
        });
    });
}

// Generar Reto
function generateChallenge(type) {
    let challenges = type === 'retos' ? retosRisa : retosRecuerdos;
    let challenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    let titleId = type === 'retos' ? 'challenge-title' : 'recuerdos-title';
    let descriptionId = type === 'retos' ? 'challenge-description' : 'recuerdos-description';
    
    document.getElementById(titleId).textContent = challenge.title;
    document.getElementById(descriptionId).textContent = challenge.description;
    
    // Aplicar color aleatorio
    let card = document.querySelector('.card-container .challenge-card');
    card.className = 'challenge-card ' + colors[Math.floor(Math.random() * colors.length)];
    
    // Establecer tiempo del reto
    timeLeft = challenge.time;
    updateTimerDisplay();
}

// Generar Misión
function generateMission() {
    if (usedMissions.length === misionesSecretas.length) {
        usedMissions = [];
    }
    
    let availableMissions = misionesSecretas.filter((_, i) => !usedMissions.includes(i));
    let randomIndex = Math.floor(Math.random() * availableMissions.length);
    let mission = availableMissions[randomIndex];
    let missionIndex = misionesSecretas.indexOf(mission);
    
    usedMissions.push(missionIndex);
    
    document.getElementById('mission-title').textContent = mission.title;
    document.getElementById('mission-description').textContent = mission.description;
    
    // Color aleatorio para tarjeta secreta
    let card = document.querySelector('.card-container .mission-card');
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}

// Cambiar Jugador
function nextPlayer() {
    if (currentPlayer < totalPlayers) {
        currentPlayer++;
    } else {
        currentPlayer = 1;
    }
    document.getElementById('current-player').textContent = currentPlayer;
    generateMission();
}

// Establecer Número de Jugadores
function setPlayerCount() {
    let count = parseInt(document.getElementById('player-count').value);
    if (count >= 2 && count <= 10) {
        totalPlayers = count;
        currentPlayer = 1;
        document.getElementById('total-players').textContent = totalPlayers;
        document.getElementById('current-player').textContent = currentPlayer;
        usedMissions = [];
        generateMission();
    }
}

// Temporizador
function toggleTimer() {
    if (!timerRunning) {
        startTimer();
    } else {
        stopTimer();
    }
}

function toggleTimerRecuerdos() {
    if (!timerRunning) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    if (timeLeft > 0) {
        timerRunning = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                stopTimer();
                playNotification();
            }
        }, 1000);
    }
}

function stopTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (currentScreen === 'retos') {
        document.getElementById('timer').textContent = display;
    } else if (currentScreen === 'recuerdos') {
        document.getElementById('timer-recuerdos').textContent = display;
    }
}

function resetChallenge(type = 'retos') {
    stopTimer();
    timeLeft = 0;
    updateTimerDisplay();
    
    if (type === 'retos') {
        document.getElementById('challenge-title').textContent = '¡PRESIONA EL BOTÓN!';
        document.getElementById('challenge-description').textContent = 'Presiona para generar un reto aleatorio';
    } else {
        document.getElementById('recuerdos-title').textContent = '¡PRESIONA EL BOTÓN!';
        document.getElementById('recuerdos-description').textContent = 'Presiona para un reto de recuerdos';
    }
}

function resetMissions() {
    stopTimer();
    currentPlayer = 1;
    usedMissions = [];
    timeLeft = 0;
    document.getElementById('current-player').textContent = currentPlayer;
    document.getElementById('mission-title').textContent = '¡PRESIONA PARA REVELAR!';
    document.getElementById('mission-description').textContent = 'Tu misión aparecerá aquí';
}

function playNotification() {
    // Crear un sonido simple usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function closeModal() {
    document.getElementById('rules-modal').classList.remove('show');
}