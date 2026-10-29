/* ==========================================================
   Estância Gaúcha - carrinho.js
   Carrinho de compras (simulação): guarda os itens no
   navegador usando o localStorage.
   ========================================================== */

var CHAVE = 'estanciaCarrinho';
var FRETE_GRATIS_ACIMA = 299;   // frete grátis a partir deste valor
var VALOR_FRETE = 29.90;        // frete nas compras menores
var DESCONTO_PIX = 0.05;        // 5% de desconto no Pix

/* ---------- Funções básicas ---------- */

// Lê o carrinho salvo (lista de produtos)
function lerCarrinho() {
    try {
        var dados = JSON.parse(localStorage.getItem(CHAVE));
        if (Array.isArray(dados)) {
            return dados;
        }
    } catch (erro) {}
    return [];
}

// Salva o carrinho no navegador
function salvarCarrinho(carrinho) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
    } catch (erro) {}
}

// Quantidade total de itens (para o número ao lado de "Carrinho")
function atualizarContador() {
    var total = 0;
    var carrinho = lerCarrinho();
    for (var i = 0; i < carrinho.length; i++) {
        total += Number(carrinho[i].qtd) || 0;
    }
    var contador = document.getElementById('contadorCarrinho');
    if (contador) {
        contador.textContent = total;
    }
}

/* ---------- Adicionar produto ---------- */

function adicionar(botao) {
    var card = botao.closest('.divProduto');
    var seletor = card.querySelector('.selTamanho');
    var tamanho = seletor ? seletor.value : (botao.getAttribute('data-tam') || 'Único');

    var item = {
        id: botao.getAttribute('data-id'),
        nome: botao.getAttribute('data-nome'),
        preco: Number(botao.getAttribute('data-preco')),
        img: botao.getAttribute('data-img'),
        tam: tamanho,
        qtd: 1
    };

    var carrinho = lerCarrinho();
    var achou = false;
    for (var i = 0; i < carrinho.length; i++) {
        // mesmo produto e mesmo tamanho: só aumenta a quantidade
        if (carrinho[i].id === item.id && carrinho[i].tam === item.tam) {
            carrinho[i].qtd = Math.min(99, carrinho[i].qtd + 1);
            achou = true;
        }
    }
    if (!achou) {
        carrinho.push(item);
    }
    salvarCarrinho(carrinho);
    atualizarContador();
    mostrarAviso(item.nome + ' (' + item.tam + ') foi para o carrinho!');
}

// Aviso que aparece no canto da tela
var temporizador;
function mostrarAviso(mensagem) {
    var aviso = document.getElementById('avisoCarrinho');
    if (!aviso) {
        aviso = document.createElement('div');
        aviso.id = 'avisoCarrinho';
        document.body.appendChild(aviso);
    }
    aviso.innerHTML = limpar(mensagem) + ' <a href="' + raiz + 'pages/carrinho.html">Ver carrinho</a>';
    aviso.style.display = 'block';
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
        aviso.style.display = 'none';
    }, 3500);
}

// Clique em qualquer botão "Adicionar ao carrinho"
document.addEventListener('click', function (evento) {
    var botao = evento.target.closest('.btnAdd');
    if (botao) {
        adicionar(botao);
    }
});

atualizarContador();

/* ==========================================================
   PÁGINA DO CARRINHO (só roda em carrinho.html)
   ========================================================== */

var corpo = document.getElementById('corpoCarrinho');

if (corpo) {

    var blocoVazio = document.getElementById('carrinhoVazio');
    var blocoCheio = document.getElementById('carrinhoCheio');
    var blocoFinal = document.getElementById('pedidoFinalizado');

    // Desenha a tabela com os produtos
    function desenharCarrinho() {
        var carrinho = lerCarrinho();

        if (carrinho.length === 0) {
            blocoVazio.classList.remove('oculto');
            blocoCheio.classList.add('oculto');
            atualizarContador();
            return;
        }
        blocoVazio.classList.add('oculto');
        blocoCheio.classList.remove('oculto');

        var linhas = '';
        for (var i = 0; i < carrinho.length; i++) {
            var p = carrinho[i];
            var subtotal = p.preco * p.qtd;
            linhas += '<tr>' +
                '<td><img class="imgCarrinho" src="' + raiz + limpar(p.img) + '" alt="' + limpar(p.nome) + '" />' +
                '<span class="nomeCarrinho">' + limpar(p.nome) + '</span></td>' +
                '<td align="center">' + limpar(p.tam) + '</td>' +
                '<td align="center">' + dinheiro(p.preco) + '</td>' +
                '<td align="center">' +
                '<button class="btnQtd" data-acao="menos" data-i="' + i + '">-</button> ' +
                '<span class="numQtd">' + p.qtd + '</span> ' +
                '<button class="btnQtd" data-acao="mais" data-i="' + i + '">+</button>' +
                '</td>' +
                '<td align="center" class="preco">' + dinheiro(subtotal) + '</td>' +
                '<td align="center"><button class="btnRemover" data-acao="remover" data-i="' + i + '">Remover</button></td>' +
                '</tr>';
        }
        corpo.innerHTML = linhas;
        atualizarResumo();
        atualizarContador();
    }

    // Calcula subtotal, frete, desconto e total
    function calcular() {
        var carrinho = lerCarrinho();
        var subtotal = 0;
        for (var i = 0; i < carrinho.length; i++) {
            subtotal += carrinho[i].preco * carrinho[i].qtd;
        }
        var metodo = metodoEscolhido();
        var desconto = (metodo === 'pix') ? subtotal * DESCONTO_PIX : 0;
        var frete = (subtotal >= FRETE_GRATIS_ACIMA || subtotal === 0) ? 0 : VALOR_FRETE;
        return {
            subtotal: subtotal,
            desconto: desconto,
            frete: frete,
            total: subtotal - desconto + frete
        };
    }

    function metodoEscolhido() {
        var marcado = document.querySelector('input[name="pagamento"]:checked');
        return marcado ? marcado.value : 'pix';
    }

    var textosPagamento = {
        pix: 'Pix: 5% de desconto. O pagamento é confirmado na hora.',
        credito: 'Cartão de crédito: parcele em até 6x sem juros.',
        debito: 'Cartão de débito: o valor sai direto da sua conta.',
        boleto: 'Boleto bancário: vence em 3 dias úteis. A compra é liberada após o pagamento.'
    };

    // Mostra os valores do resumo do pedido
    function atualizarResumo() {
        var v = calcular();
        var metodo = metodoEscolhido();

        document.getElementById('valSubtotal').textContent = dinheiro(v.subtotal);
        document.getElementById('valFrete').textContent = v.frete === 0 ? 'Grátis' : dinheiro(v.frete);
        document.getElementById('valDesconto').textContent = '- ' + dinheiro(v.desconto);
        document.getElementById('valTotal').textContent = dinheiro(v.total);
        document.getElementById('infoPagamento').textContent = textosPagamento[metodo];

        // Parcelas só aparecem no cartão de crédito
        var caixa = document.getElementById('boxParcelas');
        var select = document.getElementById('selParcelas');
        if (metodo === 'credito') {
            var escolhida = select.value || '1';
            var opcoes = '';
            for (var n = 1; n <= 6; n++) {
                opcoes += '<option value="' + n + '">' + n + 'x de ' + dinheiro(v.total / n) + ' sem juros</option>';
            }
            select.innerHTML = opcoes;
            select.value = escolhida;
            caixa.classList.remove('oculto');
        } else {
            caixa.classList.add('oculto');
        }
    }

    // Botões da tabela: mais, menos e remover
    corpo.addEventListener('click', function (evento) {
        var botao = evento.target.closest('button');
        if (!botao) { return; }
        var carrinho = lerCarrinho();
        var i = Number(botao.getAttribute('data-i'));
        var acao = botao.getAttribute('data-acao');

        if (acao === 'mais') {
            carrinho[i].qtd = Math.min(99, carrinho[i].qtd + 1);
        } else if (acao === 'menos') {
            carrinho[i].qtd = carrinho[i].qtd - 1;
            if (carrinho[i].qtd < 1) { carrinho.splice(i, 1); }
        } else if (acao === 'remover') {
            carrinho.splice(i, 1);
        }
        salvarCarrinho(carrinho);
        desenharCarrinho();
    });

    // Trocar a forma de pagamento atualiza os valores
    var radios = document.querySelectorAll('input[name="pagamento"]');
    for (var r = 0; r < radios.length; r++) {
        radios[r].addEventListener('change', atualizarResumo);
    }

    // Esvaziar carrinho
    document.getElementById('btnEsvaziar').addEventListener('click', function () {
        if (confirm('Deseja esvaziar o carrinho?')) {
            salvarCarrinho([]);
            desenharCarrinho();
        }
    });

    // Finalizar compra (simulação)
    document.getElementById('btnFinalizar').addEventListener('click', function () {
        var carrinho = lerCarrinho();
        if (carrinho.length === 0) { return; }

        // Só finaliza quem está logado
        var usuario = usuarioAtual();
        var msg = document.getElementById('msgFinalizar');
        if (!usuario) {
            msg.className = 'msg msgErro';
            msg.innerHTML = 'Para finalizar a compra, <a href="' + raiz + 'pages/conta.html">entre na sua conta ou cadastre-se</a>. Seu carrinho continua salvo.';
            return;
        }

        var v = calcular();
        var metodo = metodoEscolhido();
        var nomes = { pix: 'Pix', credito: 'Cartão de crédito', debito: 'Cartão de débito', boleto: 'Boleto bancário' };
        var forma = nomes[metodo];
        if (metodo === 'credito') {
            var n = Number(document.getElementById('selParcelas').value);
            forma += ' em ' + n + 'x de ' + dinheiro(v.total / n);
        }

        var itens = '';
        for (var i = 0; i < carrinho.length; i++) {
            itens += '<li class="liProdutos">' + carrinho[i].qtd + 'x ' + limpar(carrinho[i].nome) +
                ' (tam. ' + limpar(carrinho[i].tam) + ')</li>';
        }

        var numero = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('numPedido').textContent = '#' + numero;
        document.getElementById('resumoFinal').innerHTML =
            '<ul class="ulProdutos">' + itens + '</ul>' +
            '<p class="pText">Pagamento: <b>' + limpar(forma) + '</b><br />Total: <b>' + dinheiro(v.total) + '</b></p>';

        // Guarda o pedido para aparecer em "Minha conta"
        var pedidos = lerLista('estanciaPedidos');
        var qtdTotal = 0;
        for (var k = 0; k < carrinho.length; k++) { qtdTotal += carrinho[k].qtd; }
        pedidos.push({
            numero: numero,
            email: usuario.email,
            data: new Date().toLocaleString('pt-BR'),
            qtd: qtdTotal,
            forma: forma,
            total: v.total
        });
        salvarLista('estanciaPedidos', pedidos);

        salvarCarrinho([]);
        blocoCheio.classList.add('oculto');
        blocoVazio.classList.add('oculto');
        blocoFinal.classList.remove('oculto');
        atualizarContador();
        window.scrollTo(0, 0);
    });

    desenharCarrinho();
}
