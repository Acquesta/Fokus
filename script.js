const html = document.querySelector('html')
const botaoFoco = document.querySelector('.app__card-button--foco')
const botaoCurto = document.querySelector('.app__card-button--curto')
const botaoLongo = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')

const banner = document.querySelector('.app__image')

const titulo = document.querySelector('.app__title')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaIniciar = new Audio('/sons/play.wav')
const musicaPausar = new Audio('/sons/pause.mp3')
const musicaEncerrou = new Audio('/sons/beep.mp3')
musica.loop = true

const botaoStartPause = document.querySelector('#start-pause')
const spanBotaoStartPause = document.querySelector('#start-pause span')
const iconBotaoStartPause = document.querySelector('.app__card-primary-butto-icon')
let tempoDecorridoEmSegundos = 1500 
let intevaloId = null

const tempoNaTela = document.querySelector('#timer')

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botaoFoco.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    botaoFoco.classList.add('active')
})

botaoCurto.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    botaoCurto.classList.add('active')})

botaoLongo.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    botaoLongo.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;  
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaEncerrou.play()
        alert('tempo finalizado')
        spanBotaoStartPause.textContent = 'Começar'
        iconBotaoStartPause.setAttribute('src', '/imagens/play_arrow.png')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

botaoStartPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intevaloId){
        musicaPausar.play()
        spanBotaoStartPause.textContent = 'Voltar'
        iconBotaoStartPause.setAttribute('src', '/imagens/play_arrow.png')
        zerar()
        return
    }
    intevaloId = setInterval(contagemRegressiva, 1000)
    musicaIniciar.play()
    iconBotaoStartPause.setAttribute('src', '/imagens/pause.png')
    spanBotaoStartPause.textContent = 'Pausar'
}

function zerar() {
    clearInterval(intevaloId)
    intevaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()