/* ==========================================================
   Estância Gaúcha - produto.js
   Página de um produto (pages/produto.html?id=pasta/subpasta/arquivo)
   Mostra: foto com zoom, cores, tamanho, quantidade, preço,
   frete por CEP, descrição, pagamento, avaliações e relacionados.

   Precisa do comum.js e do carrinho.js carregados antes.
   ========================================================== */

// Tudo dentro de uma função para não misturar nomes com os outros scripts
(function () {

    /* ---------- Configurações (pode mudar à vontade) ---------- */
    
    // Número do WhatsApp da loja, com 55 + DDD (só números). Troque pelo número real.
    var WHATS_NUMERO = '5500000000000';
    
    // Parcelamento sem juros
    var PARCELAS = 6;
    
    // Nome bonito da categoria e do tipo: 'pasta/subpasta': ['Categoria', 'Tipo']
    var NOMES = {
        'pilcha-masculina/alpargatas': ["Pilcha Masculina", "Alpargatas"],
        'pilcha-masculina/bombachas-masculinas': ["Pilcha Masculina", "Bombachas Masculinas"],
        'pilcha-masculina/botas-masculinas': ["Pilcha Masculina", "Botas Masculinas"],
        'pilcha-masculina/camisas': ["Pilcha Masculina", "Camisas"],
        'pilcha-masculina/camisas-polo': ["Pilcha Masculina", "Camisas Polo"],
        'pilcha-masculina/camisetas': ["Pilcha Masculina", "Camisetas"],
        'pilcha-masculina/chiripas': ["Pilcha Masculina", "Chiripás"],
        'pilcha-masculina/faixas-de-cintura': ["Pilcha Masculina", "Faixas de Cintura"],
        'pilcha-masculina/guaiacas-e-cintos': ["Pilcha Masculina", "Guaiacas e Cintos"],
        'pilcha-masculina/jaquetas-e-coletes': ["Pilcha Masculina", "Jaquetas e Coletes"],
        'pilcha-masculina/lencos': ["Pilcha Masculina", "Lenços"],
        'pilcha-feminina/alpargatas': ["Pilcha Feminina", "Alpargatas"],
        'pilcha-feminina/bombachas-femininas': ["Pilcha Feminina", "Bombachas Femininas"],
        'pilcha-feminina/botas-femininas': ["Pilcha Feminina", "Botas Femininas"],
        'pilcha-feminina/blusas': ["Pilcha Feminina", "Blusas"],
        'pilcha-feminina/camisas-polo': ["Pilcha Feminina", "Camisas Polo"],
        'pilcha-feminina/camisetas': ["Pilcha Feminina", "Camisetas"],
        'pilcha-feminina/capas-e-ponchos': ["Pilcha Feminina", "Capas e Ponchos"],
        'pilcha-feminina/cintos': ["Pilcha Feminina", "Cintos"],
        'pilcha-feminina/faixas-de-cintura': ["Pilcha Feminina", "Faixas de Cintura"],
        'pilcha-feminina/flores-de-cabelo': ["Pilcha Feminina", "Flores de Cabelo"],
        'pilcha-feminina/jaquetas-e-coletes': ["Pilcha Feminina", "Jaquetas e Coletes"],
        'pilcha-feminina/lencos': ["Pilcha Feminina", "Lenços"],
        'pilcha-feminina/saias': ["Pilcha Feminina", "Saias"],
        'pilcha-feminina/vestidos': ["Pilcha Feminina", "Vestidos"],
        'pilcha-infantil/alpargatas-infantis': ["Pilcha Infantil", "Alpargatas Infantis"],
        'pilcha-infantil/bombachas-infantis': ["Pilcha Infantil", "Bombachas Infantis"],
        'pilcha-infantil/botas-infantis': ["Pilcha Infantil", "Botas Infantis"],
        'pilcha-infantil/camisetas-e-camisas-infantis': ["Pilcha Infantil", "Camisetas e Camisas Infantis"],
        'pilcha-infantil/chapeus-e-boinas': ["Pilcha Infantil", "Chapéus e Boinas"],
        'pilcha-infantil/faixas-de-cintura': ["Pilcha Infantil", "Faixas de Cintura"],
        'pilcha-infantil/guaiacas-e-cintos': ["Pilcha Infantil", "Guaiacas e Cintos"],
        'pilcha-infantil/jaquetas-e-coletes': ["Pilcha Infantil", "Jaquetas e Coletes"],
        'pilcha-infantil/lencos': ["Pilcha Infantil", "Lenços"],
        'pilcha-infantil/ponchos-e-palas-infantis': ["Pilcha Infantil", "Ponchos e Palas Infantis"],
        'pilcha-infantil/saias-infantis': ["Pilcha Infantil", "Saias Infantis"],
        'pilcha-infantil/vestidos-infantis': ["Pilcha Infantil", "Vestidos Infantis"],
        'chapelaria/chapeus-cury': ["Chapelaria", "Chapéus Cury"],
        'chapelaria/chapeus-lagomarsino': ["Chapelaria", "Chapéus Lagomarsino"],
        'chapelaria/chapeus-marcatto': ["Chapelaria", "Chapéus Marcatto"],
        'chapelaria/chapeus-pralana': ["Chapelaria", "Chapéus Pralana"],
        'chapelaria/chapeus-rio-branco': ["Chapelaria", "Chapéus Rio Branco"],
        'chapelaria/bones': ["Chapelaria", "Bonés"],
        'chapelaria/boinas': ["Chapelaria", "Boinas"],
        'chapelaria/barbicachos-e-vinchas': ["Chapelaria", "Barbicachos e Vinchas"],
        'chapelaria/palas-ponchos-e-capas': ["Chapelaria", "Palas, Ponchos e Capas"],
        'chimarrao/bombas': ["Chimarrão", "Bombas"],
        'chimarrao/cevadores': ["Chimarrão", "Cevadores"],
        'chimarrao/cuias': ["Chimarrão", "Cuias"],
        'chimarrao/cuias-e-bombas-de-ouro-e-prata': ["Chimarrão", "Cuias e Bombas de Ouro e Prata"],
        'chimarrao/enfeites-de-chimarrao': ["Chimarrão", "Enfeites de Chimarrão"],
        'chimarrao/erva-mate': ["Chimarrão", "Erva-Mate"],
        'chimarrao/mateiras': ["Chimarrão", "Mateiras"],
        'chimarrao/porta-cuias': ["Chimarrão", "Porta Cuias"],
        'chimarrao/porta-ervas': ["Chimarrão", "Porta Ervas"],
        'chimarrao/termicas': ["Chimarrão", "Térmicas"],
        'chimarrao/terere': ["Chimarrão", "Tereré"],
        'churrasco/acendedores': ["Churrasco", "Acendedores"],
        'churrasco/afiadores': ["Churrasco", "Afiadores"],
        'churrasco/aventais': ["Churrasco", "Aventais"],
        'churrasco/bifeiras': ["Churrasco", "Bifeiras"],
        'churrasco/copos': ["Churrasco", "Copos"],
        'churrasco/espetos': ["Churrasco", "Espetos"],
        'churrasco/farinheiras': ["Churrasco", "Farinheiras"],
        'churrasco/grelhas': ["Churrasco", "Grelhas"],
        'churrasco/porta-espetos': ["Churrasco", "Porta Espetos"],
        'churrasco/tabuas': ["Churrasco", "Tábuas"],
        'selaria/badanas': ["Selaria", "Badanas"],
        'selaria/barrigueiras': ["Selaria", "Barrigueiras"],
        'selaria/bastos': ["Selaria", "Bastos"],
        'selaria/bucais': ["Selaria", "Buçais"],
        'selaria/capas-de-cavalo': ["Selaria", "Capas de Cavalo"],
        'selaria/esporas': ["Selaria", "Esporas"],
        'selaria/freios': ["Selaria", "Freios"],
        'selaria/lacos': ["Selaria", "Laços"],
        'selaria/malas-de-garupa': ["Selaria", "Malas de Garupa"],
        'selaria/peiteiras': ["Selaria", "Peiteiras"],
        'selaria/pelegos': ["Selaria", "Pelegos"],
        'selaria/redeas-e-cabecadas': ["Selaria", "Rédeas e Cabeçadas"],
        'selaria/selas': ["Selaria", "Selas"],
        'selaria/sinchas-e-sobre-sinchas': ["Selaria", "Sinchas e Sobre-sinchas"],
        'selaria/tentos-e-correias-de-esporas': ["Selaria", "Tentos e Correias de Esporas"],
        'selaria/xergoes': ["Selaria", "Xergões"]
    };
    
    // Tamanhos de cada tipo de produto (o que não está aqui é "Único")
    var TAMANHOS = {
        'chapelaria/boinas': ["P", "M", "G"],
        'chapelaria/chapeus-cury': ["55", "56", "57", "58", "59", "60"],
        'chapelaria/chapeus-lagomarsino': ["55", "56", "57", "58", "59", "60"],
        'chapelaria/chapeus-marcatto': ["55", "56", "57", "58", "59", "60"],
        'chapelaria/chapeus-pralana': ["55", "56", "57", "58", "59", "60"],
        'chapelaria/chapeus-rio-branco': ["55", "56", "57", "58", "59", "60"],
        'chimarrao/cuias': ["Pequena", "Média", "Grande"],
        'churrasco/espetos': ["50 cm", "70 cm", "90 cm"],
        'churrasco/grelhas': ["Pequena", "Média", "Grande"],
        'churrasco/tabuas': ["Pequena", "Média", "Grande"],
        'pilcha-feminina/alpargatas': ["34", "35", "36", "37", "38", "39", "40"],
        'pilcha-feminina/blusas': ["P", "M", "G", "GG"],
        'pilcha-feminina/bombachas-femininas': ["36", "38", "40", "42", "44", "46", "48"],
        'pilcha-feminina/botas-femininas': ["34", "35", "36", "37", "38", "39", "40"],
        'pilcha-feminina/camisas-polo': ["P", "M", "G", "GG"],
        'pilcha-feminina/camisetas': ["P", "M", "G", "GG"],
        'pilcha-feminina/cintos': ["P", "M", "G"],
        'pilcha-feminina/jaquetas-e-coletes': ["P", "M", "G", "GG"],
        'pilcha-feminina/saias': ["P", "M", "G", "GG"],
        'pilcha-feminina/vestidos': ["P", "M", "G", "GG"],
        'pilcha-infantil/alpargatas-infantis': ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33"],
        'pilcha-infantil/bombachas-infantis': ["2 anos", "4 anos", "6 anos", "8 anos", "10 anos", "12 anos", "14 anos"],
        'pilcha-infantil/botas-infantis': ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33"],
        'pilcha-infantil/camisetas-e-camisas-infantis': ["2 anos", "4 anos", "6 anos", "8 anos", "10 anos", "12 anos", "14 anos"],
        'pilcha-infantil/chapeus-e-boinas': ["P", "M", "G"],
        'pilcha-infantil/guaiacas-e-cintos': ["P", "M", "G"],
        'pilcha-infantil/jaquetas-e-coletes': ["2 anos", "4 anos", "6 anos", "8 anos", "10 anos", "12 anos", "14 anos"],
        'pilcha-infantil/saias-infantis': ["2 anos", "4 anos", "6 anos", "8 anos", "10 anos", "12 anos", "14 anos"],
        'pilcha-infantil/vestidos-infantis': ["2 anos", "4 anos", "6 anos", "8 anos", "10 anos", "12 anos", "14 anos"],
        'pilcha-masculina/alpargatas': ["38", "39", "40", "41", "42", "43", "44"],
        'pilcha-masculina/bombachas-masculinas': ["38", "40", "42", "44", "46", "48", "50", "52"],
        'pilcha-masculina/botas-masculinas': ["38", "39", "40", "41", "42", "43", "44"],
        'pilcha-masculina/camisas-polo': ["P", "M", "G", "GG", "XG"],
        'pilcha-masculina/camisas': ["P", "M", "G", "GG", "XG"],
        'pilcha-masculina/camisetas': ["P", "M", "G", "GG", "XG"],
        'pilcha-masculina/chiripas': ["P", "M", "G", "GG"],
        'pilcha-masculina/guaiacas-e-cintos': ["P", "M", "G", "GG"],
        'pilcha-masculina/jaquetas-e-coletes': ["P", "M", "G", "GG", "XG"],
        'selaria/barrigueiras': ["P", "M", "G"],
        'selaria/bucais': ["Pequeno", "Médio", "Grande"],
        'selaria/capas-de-cavalo': ["P", "M", "G"],
        'selaria/selas': ["15", "16", "17"]
    };
    
    // Cores disponíveis por tipo de produto (o que não está aqui não mostra cores)
    var CORES_BASICAS = ['Branco', 'Preto', 'Vermelho', 'Azul-marinho', 'Verde'];
    var CORES_POR_TIPO = {
        'camisas': CORES_BASICAS,
        'camisas-polo': CORES_BASICAS,
        'camisetas': CORES_BASICAS,
        'blusas': CORES_BASICAS,
        'camisetas-e-camisas-infantis': CORES_BASICAS,
        'alpargatas': ['Preto', 'Branco', 'Marrom'],
        'alpargatas-infantis': ['Preto', 'Branco', 'Marrom'],
        'botas-masculinas': ['Marrom', 'Preto'],
        'botas-femininas': ['Marrom', 'Preto'],
        'botas-infantis': ['Marrom', 'Preto'],
        'cintos': ['Marrom', 'Preto'],
        'guaiacas-e-cintos': ['Marrom', 'Preto'],
        'lencos': ['Vermelho', 'Branco', 'Preto'],
        'bones': ['Preto', 'Branco', 'Verde'],
        'boinas': ['Preto', 'Cinza', 'Marrom'],
        'chapeus-e-boinas': ['Preto', 'Cinza', 'Marrom'],
        'aventais': ['Marrom', 'Preto', 'Verde'],
        'jaquetas-e-coletes': ['Preto', 'Marrom', 'Azul-marinho']
    };
    var COR_HEX = {
        'Branco': '#FFFFFF', 'Preto': '#1a1a1a', 'Vermelho': '#9b1c1c', 'Azul-marinho': '#14213d',
        'Verde': '#1F4d2b', 'Marrom': '#6b3f1d', 'Cinza': '#8a8a8a'
    };
    
    // Texto da descrição de cada categoria
    var DESCRICOES = {
        'pilcha-masculina': 'Peça da pilcha gaúcha masculina, pensada para o dia a dia e para eventos tradicionalistas, com acabamento reforçado e modelagem tradicional.',
        'pilcha-feminina': 'Peça da pilcha gaúcha feminina, feita para quem valoriza a tradição sem abrir mão do conforto, com acabamento caprichado e caimento elegante.',
        'pilcha-infantil': 'Peça da pilcha gaúcha infantil, confortável e resistente, ideal para ensaios, desfiles e festas tradicionalistas.',
        'chapelaria': 'Item de chapelaria gaúcha, produzido com materiais selecionados e acabamento tradicional, para completar a sua pilcha.',
        'chimarrao': 'Item para o chimarrão, feito para durar e para deixar a roda de mate ainda mais especial.',
        'churrasco': 'Utensílio para churrasco, resistente e prático, ideal para o domingo em família ou o encontro com os amigos.',
        'selaria': 'Artigo de selaria, produzido em materiais resistentes e acabamento caprichado, para o trabalho e a lida campeira.'
    };
    
    /* ---------- Atalhos ---------- */
    
    function pegar(id) { return document.getElementById(id); }
    
    // Evita que texto vire código HTML
    function esc(texto) { return limpar(texto); }
    
    /* ---------- Descobre qual produto abrir ---------- */
    
    var idProduto = new URLSearchParams(window.location.search).get('id') || '';
    var produto = null;
    for (var i = 0; i < PRODUTOS.length; i++) {
        var partes = PRODUTOS[i].split('|');          // [pasta, nome, preço]
        if (partes[0] === idProduto) {
            produto = { id: partes[0], nome: partes[1], preco: Number(partes[2]) };
        }
    }
    
    if (!produto) {
        pegar('produtoNaoEncontrado').classList.remove('oculto');
        pegar('detalheProduto').classList.add('oculto');
        pegar('abasProduto').classList.add('oculto');
        pegar('blocoRelacionados').classList.add('oculto');
        return;
    }
    
    var pedacos = produto.id.split('/');              // [categoria, tipo, arquivo]
    var chaveTipo = pedacos[0] + '/' + pedacos[1];
    var nomes = NOMES[chaveTipo] || [pedacos[0], pedacos[1]];
    var tamanhos = TAMANHOS[chaveTipo] || ['Único'];
    var cores = CORES_POR_TIPO[pedacos[1]] || [];
    var imagem = raiz + 'img/produtos/' + produto.id + '.jpg';
    
    // Código do produto: um número de 5 dígitos sempre igual para o mesmo produto
    var soma = 0;
    for (var c = 0; c < produto.id.length; c++) {
        soma = (soma * 31 + produto.id.charCodeAt(c)) % 90000;
    }
    var codigo = 10000 + soma;
    
    var tamanhoEscolhido = (tamanhos.length === 1) ? tamanhos[0] : '';
    var corEscolhida = cores.length > 0 ? cores[0] : '';
    var quantidade = 1;
    
    /* ---------- Cabeçalho da página ---------- */
    
    document.title = 'Estância Gaúcha | ' + produto.nome;
    pegar('pCaminhoProduto').innerHTML =
        '<a href="' + raiz + 'index.html">Início</a> &gt; ' +
        '<a href="' + raiz + 'pages/' + pedacos[0] + '.html">' + esc(nomes[0]) + '</a> &gt; ' +
        '<a href="' + raiz + 'pages/' + pedacos[0] + '/' + pedacos[1] + '.html">' + esc(nomes[1]) + '</a> &gt; ' +
        esc(produto.nome);
    
    pegar('nomeProduto').textContent = produto.nome;
    pegar('codigoProduto').innerHTML = 'Código: <b>' + codigo + '</b>';
    
    var foto = pegar('imgProduto');
    foto.src = imagem;
    foto.alt = produto.nome;
    
    /* ---------- Zoom na foto (passe o mouse por cima) ---------- */
    
    var caixaZoom = pegar('zoomCaixa');
    caixaZoom.addEventListener('mousemove', function (e) {
        var r = caixaZoom.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        foto.style.transformOrigin = x + '% ' + y + '%';
        foto.style.transform = 'scale(2.2)';
    });
    caixaZoom.addEventListener('mouseleave', function () {
        foto.style.transform = 'scale(1)';
    });
    
    /* ---------- Preço ---------- */
    
    pegar('precoProduto').textContent = dinheiro(produto.preco);
    pegar('precoAvista').innerHTML = '<b>' + dinheiro(produto.preco * (1 - DESCONTO_PIX)) + '</b> à vista no Pix (' + (DESCONTO_PIX * 100) + '% de desconto)';
    pegar('precoParcela').innerHTML = 'ou <b>' + PARCELAS + 'x</b> de <b>' + dinheiro(produto.preco / PARCELAS) + '</b> sem juros';
    pegar('avisoFreteGratis').innerHTML = '<b>Frete grátis</b> nas compras acima de ' + dinheiro(FRETE_GRATIS_ACIMA);
    
    /* ---------- Cores ---------- */
    
    function desenharCores() {
        var bloco = pegar('blocoCores');
        if (cores.length === 0) {
            bloco.classList.add('oculto');
            return;
        }
        var html = '';
        for (var k = 0; k < cores.length; k++) {
            var marcada = (cores[k] === corEscolhida) ? ' corMarcada' : '';
            html += '<button type="button" class="btnCor' + marcada + '" data-cor="' + esc(cores[k]) + '" title="' +
                esc(cores[k]) + '" style="background-color:' + COR_HEX[cores[k]] + '"></button>';
        }
        pegar('listaCores').innerHTML = html;
        pegar('corEscolhida').textContent = corEscolhida;
    }
    pegar('listaCores').addEventListener('click', function (e) {
        var botao = e.target.closest('.btnCor');
        if (botao) {
            corEscolhida = botao.getAttribute('data-cor');
            desenharCores();
        }
    });
    desenharCores();
    
    /* ---------- Tamanhos ---------- */
    
    function desenharTamanhos() {
        var html = '';
        for (var k = 0; k < tamanhos.length; k++) {
            var marcado = (tamanhos[k] === tamanhoEscolhido) ? ' tamMarcado' : '';
            html += '<button type="button" class="btnTam' + marcado + '" data-tam="' + esc(tamanhos[k]) + '">' + esc(tamanhos[k]) + '</button>';
        }
        pegar('listaTamanhos').innerHTML = html;
    }
    pegar('listaTamanhos').addEventListener('click', function (e) {
        var botao = e.target.closest('.btnTam');
        if (botao) {
            tamanhoEscolhido = botao.getAttribute('data-tam');
            pegar('msgCompra').textContent = '';
            desenharTamanhos();
        }
    });
    desenharTamanhos();
    
    /* ---------- Quantidade ---------- */
    
    pegar('btnMenos').addEventListener('click', function () {
        quantidade = Math.max(1, quantidade - 1);
        pegar('numQuantidade').textContent = quantidade;
    });
    pegar('btnMais').addEventListener('click', function () {
        quantidade = Math.min(99, quantidade + 1);
        pegar('numQuantidade').textContent = quantidade;
    });
    
    /* ---------- Comprar ---------- */
    
    // Texto do tamanho e da cor, do jeito que vai para o carrinho: "M / Preto"
    function textoVariacao() {
        return corEscolhida ? tamanhoEscolhido + ' / ' + corEscolhida : tamanhoEscolhido;
    }
    
    pegar('btnAdicionar').addEventListener('click', function () {
        var msg = pegar('msgCompra');
        if (tamanhoEscolhido === '') {
            msg.className = 'msg msgErro';
            msg.textContent = 'Escolha um tamanho antes de comprar.';
            return;
        }
        msg.textContent = '';
    
        var variacao = textoVariacao();
        var carrinho = lerCarrinho();
        var achou = false;
        for (var k = 0; k < carrinho.length; k++) {
            // mesmo produto e mesma variação: só aumenta a quantidade
            if (carrinho[k].id === produto.id && carrinho[k].tam === variacao) {
                carrinho[k].qtd = Math.min(99, carrinho[k].qtd + quantidade);
                achou = true;
            }
        }
        if (!achou) {
            carrinho.push({
                id: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                img: 'img/produtos/' + produto.id + '.jpg',
                tam: variacao,
                qtd: quantidade
            });
        }
        salvarCarrinho(carrinho);
        atualizarContador();
        mostrarAviso(quantidade + 'x ' + produto.nome + ' (' + variacao + ') foi para o carrinho!');
    });
    
    // Botão do WhatsApp: abre uma conversa já com o produto escrito
    pegar('btnWhats').addEventListener('click', function () {
        var texto = 'Olá! Tenho interesse neste produto: ' + produto.nome +
            (tamanhoEscolhido ? ' (' + textoVariacao() + ')' : '') +
            ' - ' + dinheiro(produto.preco) + '. ' + window.location.href;
        window.open('https://wa.me/' + WHATS_NUMERO + '?text=' + encodeURIComponent(texto), '_blank');
    });
    
    /* ---------- Frete e prazo por CEP (simulação) ---------- */
    
    // Prazo de entrega pela região do CEP (os 2 primeiros números)
    function regiaoDoCep(cep) {
        var inicio = Number(cep.slice(0, 2));
        if (inicio >= 90) { return { nome: 'Rio Grande do Sul', prazo: '2 a 4 dias úteis' }; }
        if (inicio >= 80) { return { nome: 'Paraná e Santa Catarina', prazo: '4 a 7 dias úteis' }; }
        if (inicio >= 70) { return { nome: 'Centro-Oeste', prazo: '6 a 10 dias úteis' }; }
        if (inicio >= 40) { return { nome: 'Norte e Nordeste', prazo: '8 a 15 dias úteis' }; }
        return { nome: 'Sudeste', prazo: '5 a 9 dias úteis' };
    }
    
    var campoCep = pegar('campoCep');
    // Coloca o traço sozinho: 12345678 vira 12345-678
    campoCep.addEventListener('input', function () {
        var numeros = campoCep.value.replace(/\D/g, '').slice(0, 8);
        campoCep.value = numeros.length > 5 ? numeros.slice(0, 5) + '-' + numeros.slice(5) : numeros;
    });
    
    function calcularFrete() {
        var resultado = pegar('resultadoFrete');
        var cep = campoCep.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            resultado.className = 'msg msgErro';
            resultado.textContent = 'Digite um CEP com 8 números.';
            return;
        }
        var regiao = regiaoDoCep(cep);
        var total = produto.preco * quantidade;
        var frete = (total >= FRETE_GRATIS_ACIMA) ? 0 : VALOR_FRETE;
        resultado.className = 'msg';
        resultado.innerHTML = 'Entrega para <b>' + regiao.nome + '</b> (CEP ' + esc(campoCep.value) + '):<br />' +
            'Entrega padrão: <b>' + (frete === 0 ? 'Grátis' : dinheiro(frete)) + '</b> em ' + regiao.prazo + '.' +
            '<br /><small>Valores de exemplo (simulação do projeto).</small>';
    }
    pegar('btnCep').addEventListener('click', calcularFrete);
    campoCep.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { calcularFrete(); }
    });
    
    /* ---------- Abas: descrição, pagamento e avaliações ---------- */
    
    function abrirAba(nome) {
        var botoes = document.querySelectorAll('.abaBtn');
        var paineis = document.querySelectorAll('.abaPainel');
        for (var k = 0; k < botoes.length; k++) {
            botoes[k].classList.toggle('abaAtiva', botoes[k].getAttribute('data-aba') === nome);
        }
        for (var p = 0; p < paineis.length; p++) {
            paineis[p].classList.toggle('oculto', paineis[p].id !== 'aba-' + nome);
        }
    }
    pegar('listaAbas').addEventListener('click', function (e) {
        var botao = e.target.closest('.abaBtn');
        if (botao) { abrirAba(botao.getAttribute('data-aba')); }
    });
    
    // Aba "Descrição Geral"
    pegar('textoDescricao').innerHTML =
        '<p><b>Descrição:</b> ' + esc(produto.nome) + '. ' + esc(DESCRICOES[pedacos[0]] || '') + '</p>' +
        '<ul class="listaFicha">' +
        '<li><b>Categoria:</b> ' + esc(nomes[0]) + '</li>' +
        '<li><b>Tipo:</b> ' + esc(nomes[1]) + '</li>' +
        '<li><b>Código:</b> ' + codigo + '</li>' +
        '<li><b>Tamanhos:</b> ' + esc(tamanhos.join(', ')) + '</li>' +
        (cores.length ? '<li><b>Cores:</b> ' + esc(cores.join(', ')) + '</li>' : '') +
        '</ul>';
    
    // Aba "Formas de Pagamento"
    var linhasParcelas = '';
    for (var n = 1; n <= PARCELAS; n++) {
        linhasParcelas += '<li>' + n + 'x de ' + dinheiro(produto.preco / n) + ' sem juros</li>';
    }
    pegar('textoPagamento').innerHTML =
        '<p><b>Pix:</b> ' + dinheiro(produto.preco * (1 - DESCONTO_PIX)) + ' (' + (DESCONTO_PIX * 100) + '% de desconto).</p>' +
        '<p><b>Cartão de crédito:</b> em até ' + PARCELAS + 'x sem juros.</p>' +
        '<ul class="listaFicha">' + linhasParcelas + '</ul>' +
        '<p><b>Cartão de débito:</b> o valor sai direto da sua conta.</p>' +
        '<p><b>Boleto bancário:</b> vence em 3 dias úteis. A compra é liberada após o pagamento.</p>';
    
    /* ---------- Avaliações ---------- */
    
    var CHAVE_AVALIACOES = 'estanciaAvaliacoes';
    var notaForm = 0;
    
    // Desenha estrelas: estrelas(4) -> ★★★★☆
    function estrelas(nota) {
        var texto = '';
        for (var k = 1; k <= 5; k++) {
            texto += (k <= Math.round(nota)) ? '★' : '☆';
        }
        return texto;
    }
    
    function avaliacoesDoProduto() {
        var todas = lerLista(CHAVE_AVALIACOES);
        var minhas = [];
        for (var k = 0; k < todas.length; k++) {
            if (todas[k].id === produto.id) { minhas.push(todas[k]); }
        }
        return minhas;
    }
    
    function desenharAvaliacoes() {
        var lista = avaliacoesDoProduto();
        var soma = 0;
        for (var k = 0; k < lista.length; k++) { soma += lista[k].nota; }
        var media = lista.length ? soma / lista.length : 0;
    
        // resumo no topo da página
        if (lista.length === 0) {
            pegar('resumoEstrelas').innerHTML = '<span class="estrelas">☆☆☆☆☆</span> <a href="#listaAbas" id="linkAvaliar">Seja o primeiro a opinar</a>';
        } else {
            pegar('resumoEstrelas').innerHTML = '<span class="estrelas">' + estrelas(media) + '</span> ' +
                media.toFixed(1).replace('.', ',') + ' (' + lista.length + (lista.length === 1 ? ' avaliação' : ' avaliações') + ') ' +
                '<a href="#listaAbas" id="linkAvaliar">Ver avaliações</a>';
        }
    
        // lista dentro da aba
        var html = '';
        if (lista.length === 0) {
            html = '<p>Este produto ainda não tem avaliações.</p>';
        }
        for (var j = lista.length - 1; j >= 0; j--) {
            html += '<div class="cartaoAvaliacao"><span class="estrelas">' + estrelas(lista[j].nota) + '</span> ' +
                '<b>' + esc(lista[j].nome) + '</b> <small>' + esc(lista[j].data) + '</small>' +
                '<p>' + esc(lista[j].texto) + '</p></div>';
        }
        pegar('listaAvaliacoes').innerHTML = html;
    }
    
    // Clicar nas estrelas do formulário
    pegar('estrelasForm').addEventListener('click', function (e) {
        var botao = e.target.closest('.estrelaForm');
        if (!botao) { return; }
        notaForm = Number(botao.getAttribute('data-nota'));
        var todas = document.querySelectorAll('.estrelaForm');
        for (var k = 0; k < todas.length; k++) {
            todas[k].textContent = (k < notaForm) ? '★' : '☆';
        }
    });
    
    // Enviar avaliação
    pegar('btnEnviarAvaliacao').addEventListener('click', function () {
        var msg = pegar('msgAvaliacao');
        var nome = pegar('avNome').value.trim();
        var texto = pegar('avTexto').value.trim();
        if (nome === '' || texto === '' || notaForm === 0) {
            msg.className = 'msg msgErro';
            msg.textContent = 'Escolha as estrelas e preencha seu nome e o comentário.';
            return;
        }
        var todas = lerLista(CHAVE_AVALIACOES);
        todas.push({
            id: produto.id,
            nome: nome,
            nota: notaForm,
            texto: texto,
            data: new Date().toLocaleDateString('pt-BR')
        });
        salvarLista(CHAVE_AVALIACOES, todas);
    
        pegar('avTexto').value = '';
        notaForm = 0;
        var estrelasForm = document.querySelectorAll('.estrelaForm');
        for (var k = 0; k < estrelasForm.length; k++) { estrelasForm[k].textContent = '☆'; }
        msg.className = 'msg msgOk';
        msg.textContent = 'Obrigado pela sua avaliação!';
        desenharAvaliacoes();
    });
    
    // Se a pessoa está logada, já preenche o nome
    var logado = usuarioAtual();
    if (logado) { pegar('avNome').value = logado.nome; }
    
    // Link "Seja o primeiro a opinar" abre a aba de avaliações
    document.addEventListener('click', function (e) {
        if (e.target.id === 'linkAvaliar') { abrirAba('avaliacoes'); }
    });
    
    desenharAvaliacoes();
    abrirAba('descricao');
    
    /* ---------- Produtos relacionados ---------- */
    
    // Primeiro os do mesmo tipo; depois os da mesma categoria, começando pelos que vêm logo depois deste
    var mesmoTipo = [];
    var mesmaCategoria = [];
    var posicao = 0;
    for (var q = 0; q < PRODUTOS.length; q++) {
        var p = PRODUTOS[q].split('|');
        if (p[0] === produto.id) { posicao = q; continue; }
        var pp = p[0].split('/');
        if (pp[0] === pedacos[0] && pp[1] === pedacos[1]) {
            mesmoTipo.push(p);
        } else if (pp[0] === pedacos[0]) {
            mesmaCategoria.push({ p: p, q: q });
        }
    }
    // os da mesma categoria que vêm depois deste na lista ficam na frente
    var depois = [];
    var antes = [];
    for (var m = 0; m < mesmaCategoria.length; m++) {
        if (mesmaCategoria[m].q > posicao) { depois.push(mesmaCategoria[m].p); } else { antes.push(mesmaCategoria[m].p); }
    }
    var relacionados = mesmoTipo.concat(depois, antes).slice(0, 4);
    
    var htmlRel = '';
    for (var r = 0; r < relacionados.length; r++) {
        var rp = relacionados[r];
        var preco = Number(rp[2]);
        var link = 'produto.html?id=' + rp[0];
        htmlRel += '<div class="divProduto">' +
            '<a href="' + link + '"><img src="' + raiz + 'img/produtos/' + rp[0] + '.jpg" alt="' + esc(rp[1]) + '" /></a>' +
            '<h3 class="nomeProduto"><a class="linkNomeProduto" href="' + link + '">' + esc(rp[1]) + '</a></h3>' +
            '<p class="precoProduto">' + dinheiro(preco) + '</p>' +
            '<p class="parcela">' + dinheiro(preco * (1 - DESCONTO_PIX)) + ' no Pix<br />ou ' + PARCELAS + 'x de ' + dinheiro(preco / PARCELAS) + ' sem juros</p>' +
            '<a class="btnComprar" href="' + link + '">Comprar</a>' +
            '</div>';
    }
    pegar('listaRelacionados').innerHTML = htmlRel;
    
    })();