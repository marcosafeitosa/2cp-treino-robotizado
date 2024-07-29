const contentArray = [
  
  "APRESENTAÇÃO E GUIA DO TREINAMENTO ROBOTIZADO (TpR).",
    "I - Introdução. (Balão Verde)",
    "Seja bem-vindo(a) ao Treinamento Preparatório Robotizado.",
    "Este treinamento tem por finalidade ensinar aos Praças do Exército Brasileiro a como treinar na sala de Treinamento Básico I Robotizado.",
    "O treinamento robotizado é composto por 3 Estágios, onde o treino será aplicado automaticamente pelo ‘’Bot’’.",
    "Ao final de cada tópico, é obrigatório a remoção de dúvidas dos treinados.",
    "Dúvidas?",
    "II - Envio do treinamento robotizado na ADR. (Balão Verde)",
    "Estarei passando um slide ensinando como enviar o treinamento robotizado.",
    "Acesse o link: abre,ai/enviartpr (Trocar a , por . )",
    "LINK SECUNDÁRIO:",
    "https://docs.google.com/presentation/d/1K2nEggEG7BMeetFdX2oXVov9YbRwnE5ih-FQc3Cpv3g/edit#slide=id.p",
    "Quando terminar, me comunique.",
    "Dúvidas sobre o envio do Treinamento Robotizado?",
    "III - Guia passo a passo sobre como aplicar o treinamento. (Balão Verde)",
    "Tenha em mente que ao chegar no 1° Estágio, você treinador deverá anunciar que irá iniciar o treinamento robotizado.",
    "Deve desejar boas-vindas ao treinado, falar como se dirigir a você e perguntar por onde eles jogam, se é pelo Launcher, Celular ou BETA.",
    "Caso jogue pelo BETA, diga para o treinado acompanhar o treinamento pelo histórico,",
    "pois pode acontecer da fala do Bot não aparecer normalmente no quarto.",
    "-> Sempre remover as dúvidas dos treinados ao final de cada tópico.",
    "-> Para evitar BUGS, aguardar 5 segundos após o término de um tópico para iniciar o próximo.",
    "O tópico Finalização deve ser aplicado manualmente no final do 3° Estágio, auxilie os novos Soldados a realizar as alterações:",
    "missão, grupo, fardamento e desprivar o perfil.",
    "Utilize o comando :vestir para adicionar o fardamento ao novo Soldado.",
    "Em caso de BUG, aplique o comando :voltar para retornar aos rollers.",
    "Acesse o link do slide para acompanhar o funcionamento e guia do Treinamento Robotizado: abre,ai/guiausotpr (Trocar a , por . )",
    "LINK SECUNDÁRIO:",
    "https://docs.google.com/presentation/d/1pEO5Gzwr5SP_2Nr8A_AMDKery2R5jPbrUG0ayjVt0ns/edit#slide=id.p",
    "Dúvidas sobre o uso do Treinamento Básico I Robotizado?",
    "IV - Finalização. (Balão Verde)",
    "O Treinamento Preparatório Robotizado chegou ao fim.",
    "Você está aprovado(a) no treinamento!",
    "Altere sua sigla T1 para TpR."
  ];

const container = document.getElementById('container');
const alertBox = document.getElementById('alert');
const copyPreviousButton = document.getElementById('copyPrevious');
const copyNextButton = document.getElementById('copyNext');
const startAutoCopyButton = document.getElementById('startAutoCopy');
const stopAutoCopyButton = document.getElementById('stopAutoCopy');

let autoCopyInterval;

contentArray.forEach((paragraph, index) => {
    const p = document.createElement('p');
    p.className = 'paragraph';
    if (paragraph.includes('(Balão Verde)')) {
        p.classList.add('balao-verde');
    }
    p.dataset.index = index;
    p.innerText = paragraph;
    container.appendChild(p);
});

const paragraphs = document.querySelectorAll('.paragraph');

function copyText(index) {
    if (index < 0 || index >= paragraphs.length) return;

    const textToCopy = paragraphs[index].innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        paragraphs.forEach(p => p.classList.remove('copied'));
        paragraphs[index].classList.add('copied');

        // Scroll to center the paragraph
        const containerHeight = container.clientHeight;
        const paragraphOffsetTop = paragraphs[index].offsetTop;
        const paragraphHeight = paragraphs[index].offsetHeight;
        const scrollTop = paragraphOffsetTop - (containerHeight / 2) + (paragraphHeight / 2);
        container.scrollTo({ top: scrollTop, behavior: 'smooth' });

        // Show alert if paragraph contains "(Balão Verde)"
        if (paragraphs[index].classList.contains('balao-verde')) {
            showAlert();
            clearInterval(autoCopyInterval); // Stop the timer if "(Balão Verde)" is found
        }
    }).catch(err => console.error('Failed to copy text: ', err));
}

function showAlert() {
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
        enableButtons();
    }, 3000);
}

function enableButtons() {
    copyPreviousButton.disabled = false;
    copyNextButton.disabled = false;
}

let currentIndex = 0;

copyPreviousButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        copyText(currentIndex);
    }
});

copyNextButton.addEventListener('click', () => {
    if (currentIndex < paragraphs.length - 1) {
        currentIndex++;
        copyText(currentIndex);
    }
});

startAutoCopyButton.addEventListener('click', () => {
    clearInterval(autoCopyInterval); // Clear any existing interval to prevent multiple intervals running
    autoCopyInterval = setInterval(() => {
        if (currentIndex < paragraphs.length - 1) {
            currentIndex++;
            copyText(currentIndex);
        } else {
            clearInterval(autoCopyInterval);
        }
    }, 6000);
});

stopAutoCopyButton.addEventListener('click', () => {
    clearInterval(autoCopyInterval);
});

window.onload = () => {
    copyText(currentIndex);
};