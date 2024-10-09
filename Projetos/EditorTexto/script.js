let optionsButtons = document.querySelectorAll(".option-button"); // Seleciona todos os botões de opção
let advancedOptionButton = document.querySelectorAll(".adv-option-button"); // Seleciona botões de opção avançada
let fontName = document.getElementById("fontName"); // Seleciona o seletor de nome da fonte
let fontSizeRef = document.getElementById("fontSize"); // Seleciona o seletor de tamanho da fonte
let writingArea = document.getElementById("text-input"); // Seleciona a área de texto editável
let linkButton = document.getElementById("createLink"); // Seleciona o botão de criar link
let alignButtons = document.querySelectorAll(".align"); // Seleciona botões de alinhamento
let spacingButtons = document.querySelectorAll(".spacing"); // Seleciona botões de espaçamento
let formatButtons = document.querySelectorAll(".format"); // Seleciona botões de formatação
let scriptButtons = document.querySelectorAll(".script"); // Seleciona botões de sobrescrito e subscrito

// Lista de fontes disponíveis
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

// Função inicializadora
const intializer = () => {
    // Define comportamentos para os botões
    highlighter(alignButtons, true); // Alinhamento
    highlighter(spacingButtons, true); // Espaçamento
    highlighter(formatButtons, false); // Formatação
    highlighter(scriptButtons, true); // Sobrescrito e subscrito

    // Preenche o seletor de fontes
    fontList.map((value) => {
        let option = document.createElement("option"); // Cria nova opção (variavel)
        option.value = value; // Define o valor da opção
        option.innerHTML = value; // Define o texto da opção
        fontName.appendChild(option); // Adiciona a opção ao seletor
    });

    // Preenche o seletor de tamanhos de fonte
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option"); // Cria nova opção
        option.value = i; // Define o valor da opção
        option.innerHTML = i; // Define o texto da opção
        fontSizeRef.appendChild(option); // Adiciona a opção ao seletor
    }

    fontSizeRef.value = 3; // Define o tamanho padrão
};

// Função para modificar texto usando comandos
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value); // Executa o comando de edição
};

// Adiciona eventos de clique para botões de opção
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null); // Modifica o texto de acordo com o botão clicado
    });
});

// Adiciona eventos de mudança para botões de opção avançada
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value); // Modifica texto com base na seleção
    });
});

// Evento para criar link
linkButton.addEventListener("click", () => {
    let userLink = prompt(" Informe a URL?"); // Solicita URL ao usuário
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink); // Cria link se URL é válida
    } else {
        userLink = "http://" + userLink; // Adiciona http:// se não presente
        modifyText(linkButton.id, false, userLink); // Cria link
    }
});

// Função para destacar botões
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true; // Verifica se o botão já está ativo
                }
                highlighterRemover(className); // Remove destaque de todos os botões
                if (!alreadyActive) {
                    button.classList.add("active"); // Adiciona destaque se não estava ativo
                }
            } else {
                button.classList.toggle("active"); // Alterna destaque se não precisa remover
            }
        });
    });
};

// Função para remover destaque
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active"); // Remove a classe "active" de todos os botões
    });
};

// Chama a função inicializadora quando a página carrega
window.onload = intializer();
