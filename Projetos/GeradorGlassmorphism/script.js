const blurInput = document.getElementById("blur"); // Referência ao controle de desfoque
const transparencyInput = document.getElementById("transparency"); // Referência ao controle de transparência
const colorInput = document.getElementById("color"); // Referência ao seletor de cor
const outlineInput = document.getElementById("outline"); // Referência ao controle de contorno
const cssResult = document.getElementById("css-code"); // Referência à área de texto do CSS gerado
const glassRec = document.querySelector(".glass-preview-rectangle"); // Referência ao retângulo de pré-visualização

// Definindo valores padrão para a pré-visualização
blurInput.value = 1; 
transparencyInput.value = 0.31; 
colorInput.value = "#000"; 
outlineInput.value = 0;

// Inicializa a pré-visualização com valores padrão
updateGlassPreview();

// Adiciona ouvintes de eventos aos controles deslizantes
blurInput.addEventListener('input', updateGlassPreview);
transparencyInput.addEventListener('input', updateGlassPreview);
outlineInput.addEventListener('input', updateGlassPreview);

// Adiciona ouvinte de eventos ao seletor de cor
colorInput.addEventListener('input', () => {
    updateGlassPreview();
    updateCSSCode();
});

function updateGlassPreview() {
    const blurValue = blurInput.value; // Captura o valor de desfoque
    const transparencyValue = transparencyInput.value; // Captura o valor de transparência
    const colorValue = colorInput.value; // Captura a cor selecionada
    const outlineValue = outlineInput.value; // Captura o valor do contorno

    // Atualiza o retângulo de pré-visualização
    glassRec.style.backdropFilter = `blur(${blurValue}px)`;
    glassRec.style.backgroundColor = `rgba(${hexToRgb(colorValue)}, ${transparencyValue})`;
    glassRec.style.outline = `${outlineValue}px solid ${colorValue}`;

    updateCSSCode(); // Atualiza o código CSS gerado
}

function updateCSSCode() {
    const blurValue = blurInput.value; // Captura o valor de desfoque
    const transparencyValue = transparencyInput.value; // Captura o valor de transparência
    const colorValue = colorInput.value; // Captura a cor selecionada
    const outlineValue = outlineInput.value; // Captura o valor do contorno

    const cssCode = `background-color: rgba(${hexToRgb(colorValue)}, ${transparencyValue});\nbackdrop-filter: blur(${blurValue}px);\n-webkit-backdrop-filter: blur(${blurValue}px);\noutline: ${outlineValue}px solid ${colorValue};\nborder-radius: 10px;\nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`;

    // Exibe o código CSS gerado na área de texto
    cssResult.value = cssCode;
}

// Função auxiliar para converter HEX para RGB (cores)
function hexToRgb(hex) {
    const shorthandRegax = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegax, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

// Adiciona ouvinte de eventos ao botão "Copiar para a área de transferência"
const copyButton = document.getElementById("copy-button");
copyButton.addEventListener('click', copyToClipboard);

function copyToClipboard() {
    const copyText = cssResult.value; // Captura o texto a ser copiado
    const textArea = document.createElement("textarea"); // Cria um elemento textarea temporário
    textArea.value = copyText; // Define o valor do textarea
    document.body.appendChild(textArea); // Adiciona o textarea ao DOM
    textArea.select(); // Seleciona o texto
    document.execCommand("copy"); // Executa o comando de cópia
    document.body.removeChild(textArea); // Remove o textarea do DOM

    // Muda o texto do botão para indicar que foi copiado
    copyButton.textContent = "Copied!";

    // Reseta o texto do botão após um curto atraso
    setTimeout(() => {
        copyButton.textContent = "Copy To Clipboard";
    }, 1000);
}
