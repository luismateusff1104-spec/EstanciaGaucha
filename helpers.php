<?php
// helpers.php - funções pequenas que as páginas usam
require_once __DIR__ . '/config.php';

// Escreve um valor em reais: 189.9 vira "R$ 189,90"
function dinheiro($valor) {
    return 'R$ ' . number_format($valor, 2, ',', '.');
}

// Deixa um texto seguro para colocar dentro do HTML
function e($texto) {
    return htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');
}

// Faixa verde do topo, montada com os valores do config.php
function textoTopo() {
    return 'Frete grátis acima de ' . dinheiro(FRETE_GRATIS_ACIMA)
        . ' | Parcele em até ' . PARCELAS . 'x sem juros'
        . ' | Troca em até ' . TROCA_DIAS . ' dias';
}