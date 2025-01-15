const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iniciarOuPausarImagem = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPLay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioAlarme = new Audio('/sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause()
})


focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add("active");
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add("active");
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add("active");
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `

            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `

            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioAlarme.play();
        alert('tempo finalizado')
        audioAlarme.pause();
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        zerar()
        return        
    }
    audioPLay.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar"
    iniciarOuPausarImagem.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar"
    iniciarOuPausarImagem.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `
        ${tempoFormatado}
    `
}

mostrarTempo();