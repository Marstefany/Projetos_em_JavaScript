function irParaProjeto1() {
    window.location.href = "/Projetos/EditorTexto/index.html";
}

function irParaProjeto2() {
    window.location.href = "/Projetos/GeradorGlassmorphism/index.html";
}

function irParaProjeto3() {
    window.location.href = "/Projetos/AvaliadorFilme/index.html";
}

function irParaProjeto4() {
    window.location.href = "/Projetos/Cobrinha/index.html";
}

function irParaProjeto5() {
    window.location.href = "/Projetos/Sudoku/index.html";
}

// script.js

// Filtro de Projetos
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || category === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});


