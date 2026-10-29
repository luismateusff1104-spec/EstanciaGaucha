/* ==========================================================
   Estância Gaúcha - comum.js
   Funções usadas em todas as páginas.
   ========================================================== */

// "raiz" é o caminho até a pasta principal do site (vem do HTML)
var raiz = document.currentScript.getAttribute('data-raiz') || './';

// Lê uma lista salva no navegador (localStorage)
function lerLista(chave) {
    try {
        var dados = JSON.parse(localStorage.getItem(chave));
        if (Array.isArray(dados)) {
            return dados;
        }
    } catch (erro) {}
    return [];
}

// Salva uma lista no navegador
function salvarLista(chave, lista) {
    try {
        localStorage.setItem(chave, JSON.stringify(lista));
    } catch (erro) {}
}

// Transforma número em dinheiro: 1299.9 vira "R$ 1.299,90"
function dinheiro(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Evita que texto digitado vire código HTML
function limpar(texto) {
    var div = document.createElement('div');
    div.textContent = String(texto);
    return div.innerHTML;
}

// Embaralha a senha antes de salvar (é só uma simulação, NÃO é seguro de verdade)
function embaralharSenha(senha) {
    var texto = 'estancia-' + senha;
    var h = 5381;
    for (var i = 0; i < texto.length; i++) {
        h = ((h << 5) + h + texto.charCodeAt(i)) >>> 0;
    }
    return String(h);
}

// Quem está logado agora (ou null)
function usuarioAtual() {
    var email = null;
    try {
        email = localStorage.getItem('estanciaSessao');
    } catch (erro) {}
    if (!email) { return null; }
    var usuarios = lerLista('estanciaUsuarios');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            return usuarios[i];
        }
    }
    return null;
}

// Troca "Minha conta" por "Olá, Nome" quando a pessoa está logada
function atualizarCabecalhoConta() {
    var usuario = usuarioAtual();
    var links = document.querySelectorAll('.linkContaTxt');
    for (var i = 0; i < links.length; i++) {
        links[i].textContent = usuario ? 'Olá, ' + usuario.nome.split(' ')[0] : 'Minha conta';
    }
}

atualizarCabecalhoConta();
