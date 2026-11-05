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
    } catch (erro) { }
    return [];
}

// Salva uma lista no navegador
function salvarLista(chave, lista) {
    try {
        localStorage.setItem(chave, JSON.stringify(lista));
    } catch (erro) { }
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
    } catch (erro) { }
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

/* ---------- Lista de produtos da busca ----------
   Um produto por linha:  pasta/subpasta/arquivo | Nome | Preço
   Para um produto novo aparecer na busca, é só incluir uma linha aqui. */
var PRODUTOS = [
    'pilcha-masculina/alpargatas/alpargata-lona-preta|Alpargata Lona Preta|39.9',
    'pilcha-masculina/alpargatas/alpargata-lona-branca|Alpargata Lona Branca|44.9',
    'pilcha-masculina/alpargatas/alpargata-sola-de-corda|Alpargata Sola de Corda|51.9',
    'pilcha-masculina/alpargatas/alpargata-estampada|Alpargata Estampada|61.9',
    'pilcha-masculina/bombachas-masculinas/bombacha-sarja-tradicional|Bombacha Sarja Tradicional|189.9',
    'pilcha-masculina/bombachas-masculinas/bombacha-gabardine-campeira|Bombacha Gabardine Campeira|212.9',
    'pilcha-masculina/bombachas-masculinas/bombacha-brim-peao|Bombacha Brim Peão|246.9',
    'pilcha-masculina/bombachas-masculinas/bombacha-xadrez-gaucha|Bombacha Xadrez Gaúcha|293.9',
    'pilcha-masculina/botas-masculinas/bota-couro-cano-medio|Bota Couro Cano Médio|349.9',
    'pilcha-masculina/botas-masculinas/bota-couro-cano-longo|Bota Couro Cano Longo|391.9',
    'pilcha-masculina/botas-masculinas/bota-gaucha-com-elastico|Bota Gaúcha com Elástico|454.9',
    'pilcha-masculina/botas-masculinas/bota-campeira-reforcada|Bota Campeira Reforçada|541.9',
    'pilcha-masculina/camisas/camisa-manga-longa-lisa|Camisa Manga Longa Lisa|129.9',
    'pilcha-masculina/camisas/camisa-manga-longa-xadrez|Camisa Manga Longa Xadrez|144.9',
    'pilcha-masculina/camisas/camisa-manga-curta-bordada|Camisa Manga Curta Bordada|168.9',
    'pilcha-masculina/camisas/camisa-social-gaucha|Camisa Social Gaúcha|200.9',
    'pilcha-masculina/camisas-polo/polo-lisa-piquet|Polo Lisa Piquet|99.9',
    'pilcha-masculina/camisas-polo/polo-bordada-brasao|Polo Bordada Brasão|111.9',
    'pilcha-masculina/camisas-polo/polo-listrada|Polo Listrada|129.9',
    'pilcha-masculina/camisas-polo/polo-tradicionalista|Polo Tradicionalista|154.9',
    'pilcha-masculina/camisetas/camiseta-estampa-cuia|Camiseta Estampa Cuia|59.9',
    'pilcha-masculina/camisetas/camiseta-brasao-rs|Camiseta Brasão RS|66.9',
    'pilcha-masculina/camisetas/camiseta-manga-longa|Camiseta Manga Longa|77.9',
    'pilcha-masculina/camisetas/camiseta-gola-v|Camiseta Gola V|92.9',
    'pilcha-masculina/chiripas/chiripa-tradicional-preto|Chiripá Tradicional Preto|219.9',
    'pilcha-masculina/chiripas/chiripa-la-xadrez|Chiripá Lã Xadrez|245.9',
    'pilcha-masculina/chiripas/chiripa-brim-bordado|Chiripá Brim Bordado|285.9',
    'pilcha-masculina/chiripas/chiripa-campeiro|Chiripá Campeiro|340.9',
    'pilcha-masculina/faixas-de-cintura/faixa-la-vermelha|Faixa Lã Vermelha|49.9',
    'pilcha-masculina/faixas-de-cintura/faixa-la-preta|Faixa Lã Preta|55.9',
    'pilcha-masculina/faixas-de-cintura/faixa-algodao-bordada|Faixa Algodão Bordada|64.9',
    'pilcha-masculina/faixas-de-cintura/faixa-tecido-xadrez|Faixa Tecido Xadrez|76.9',
    'pilcha-masculina/guaiacas-e-cintos/guaiaca-couro-cru|Guaiaca Couro Cru|159.9',
    'pilcha-masculina/guaiacas-e-cintos/guaiaca-dupla-fivela|Guaiaca Dupla Fivela|178.9',
    'pilcha-masculina/guaiacas-e-cintos/cinto-tiras-prateado|Cinto Tiras Prateado|207.9',
    'pilcha-masculina/guaiacas-e-cintos/cinto-rastra-bordado|Cinto Rastra Bordado|247.9',
    'pilcha-masculina/jaquetas-e-coletes/colete-brim|Colete Brim|259.9',
    'pilcha-masculina/jaquetas-e-coletes/colete-la-xadrez|Colete Lã Xadrez|290.9',
    'pilcha-masculina/jaquetas-e-coletes/jaqueta-couro|Jaqueta Couro|337.9',
    'pilcha-masculina/jaquetas-e-coletes/jaqueta-sarja-forrada|Jaqueta Sarja Forrada|402.9',
    'pilcha-masculina/lencos/lenco-vermelho-classico|Lenço Vermelho Clássico|29.9',
    'pilcha-masculina/lencos/lenco-branco-bordado|Lenço Branco Bordado|32.9',
    'pilcha-masculina/lencos/lenco-maragato|Lenço Maragato|38.9',
    'pilcha-masculina/lencos/lenco-seda-estampado|Lenço Seda Estampado|45.9',
    'pilcha-feminina/alpargatas/alpargata-prenda-lona|Alpargata Prenda Lona|39.9',
    'pilcha-feminina/alpargatas/alpargata-bordada|Alpargata Bordada|44.9',
    'pilcha-feminina/alpargatas/alpargata-flores|Alpargata Flores|51.9',
    'pilcha-feminina/alpargatas/alpargata-cano-alto|Alpargata Cano Alto|61.9',
    'pilcha-feminina/bombachas-femininas/bombacha-feminina-sarja|Bombacha Feminina Sarja|169.9',
    'pilcha-feminina/bombachas-femininas/bombacha-feminina-campeira|Bombacha Feminina Campeira|189.9',
    'pilcha-feminina/bombachas-femininas/bombacha-feminina-cintura-alta|Bombacha Feminina Cintura Alta|220.9',
    'pilcha-feminina/bombachas-femininas/bombacha-feminina-xadrez|Bombacha Feminina Xadrez|262.9',
    'pilcha-feminina/botas-femininas/bota-couro-cano-curto|Bota Couro Cano Curto|329.9',
    'pilcha-feminina/botas-femininas/bota-couro-cano-longo|Bota Couro Cano Longo|368.9',
    'pilcha-feminina/botas-femininas/bota-campeira-feminina|Bota Campeira Feminina|428.9',
    'pilcha-feminina/botas-femininas/bota-com-franja|Bota com Franja|510.9',
    'pilcha-feminina/blusas/blusa-renda-branca|Blusa Renda Branca|89.9',
    'pilcha-feminina/blusas/blusa-manga-bufante|Blusa Manga Bufante|100.9',
    'pilcha-feminina/blusas/blusa-bordada|Blusa Bordada|116.9',
    'pilcha-feminina/blusas/blusa-gola-alta|Blusa Gola Alta|138.9',
    'pilcha-feminina/camisas-polo/polo-feminina-lisa|Polo Feminina Lisa|99.9',
    'pilcha-feminina/camisas-polo/polo-feminina-bordada|Polo Feminina Bordada|111.9',
    'pilcha-feminina/camisas-polo/polo-feminina-listrada|Polo Feminina Listrada|129.9',
    'pilcha-feminina/camisas-polo/polo-feminina-tradicionalista|Polo Feminina Tradicionalista|154.9',
    'pilcha-feminina/camisetas/baby-look-estampa-cuia|Baby Look Estampa Cuia|59.9',
    'pilcha-feminina/camisetas/camiseta-brasao-rs|Camiseta Brasão RS|66.9',
    'pilcha-feminina/camisetas/camiseta-manga-longa|Camiseta Manga Longa|77.9',
    'pilcha-feminina/camisetas/camiseta-alongada|Camiseta Alongada|92.9',
    'pilcha-feminina/capas-e-ponchos/poncho-de-la-tradicional|Poncho de Lã Tradicional|289.9',
    'pilcha-feminina/capas-e-ponchos/capa-feminina-gola-alta|Capa Feminina Gola Alta|324.9',
    'pilcha-feminina/capas-e-ponchos/poncho-xadrez|Poncho Xadrez|376.9',
    'pilcha-feminina/capas-e-ponchos/capa-bordada|Capa Bordada|448.9',
    'pilcha-feminina/cintos/cinto-couro-fivela-prata|Cinto Couro Fivela Prata|99.9',
    'pilcha-feminina/cintos/cinto-bordado|Cinto Bordado|111.9',
    'pilcha-feminina/cintos/cinto-largo-de-prenda|Cinto Largo de Prenda|129.9',
    'pilcha-feminina/cintos/cinto-com-tachas|Cinto com Tachas|154.9',
    'pilcha-feminina/faixas-de-cintura/faixa-prenda-vermelha|Faixa Prenda Vermelha|49.9',
    'pilcha-feminina/faixas-de-cintura/faixa-bordada|Faixa Bordada|55.9',
    'pilcha-feminina/faixas-de-cintura/faixa-de-renda|Faixa de Renda|64.9',
    'pilcha-feminina/faixas-de-cintura/faixa-xadrez|Faixa Xadrez|76.9',
    'pilcha-feminina/flores-de-cabelo/flor-de-cabelo-vermelha|Flor de Cabelo Vermelha|24.9',
    'pilcha-feminina/flores-de-cabelo/flor-de-cabelo-branca|Flor de Cabelo Branca|27.9',
    'pilcha-feminina/flores-de-cabelo/flor-de-cabelo-rosa|Flor de Cabelo Rosa|31.9',
    'pilcha-feminina/flores-de-cabelo/flor-de-cabelo-dupla|Flor de Cabelo Dupla|38.9',
    'pilcha-feminina/jaquetas-e-coletes/colete-feminino-brim|Colete Feminino Brim|239.9',
    'pilcha-feminina/jaquetas-e-coletes/colete-feminino-xadrez|Colete Feminino Xadrez|268.9',
    'pilcha-feminina/jaquetas-e-coletes/jaqueta-feminina-couro|Jaqueta Feminina Couro|311.9',
    'pilcha-feminina/jaquetas-e-coletes/jaqueta-feminina-sarja|Jaqueta Feminina Sarja|371.9',
    'pilcha-feminina/lencos/lenco-prenda-vermelho|Lenço Prenda Vermelho|29.9',
    'pilcha-feminina/lencos/lenco-bordado-branco|Lenço Bordado Branco|32.9',
    'pilcha-feminina/lencos/lenco-xadrez|Lenço Xadrez|38.9',
    'pilcha-feminina/lencos/lenco-seda-estampado|Lenço Seda Estampado|45.9',
    'pilcha-feminina/saias/saia-prenda-rodada|Saia Prenda Rodada|149.9',
    'pilcha-feminina/saias/saia-xadrez|Saia Xadrez|167.9',
    'pilcha-feminina/saias/saia-com-babados|Saia com Babados|194.9',
    'pilcha-feminina/saias/saia-midi-gaucha|Saia Midi Gaúcha|231.9',
    'pilcha-feminina/vestidos/vestido-de-prenda-classico|Vestido de Prenda Clássico|399.9',
    'pilcha-feminina/vestidos/vestido-de-prenda-bordado|Vestido de Prenda Bordado|447.9',
    'pilcha-feminina/vestidos/vestido-de-prenda-xadrez|Vestido de Prenda Xadrez|519.9',
    'pilcha-feminina/vestidos/vestido-de-prenda-debutante|Vestido de Prenda Debutante|619.9',
    'pilcha-infantil/alpargatas-infantis/alpargata-infantil-lona|Alpargata Infantil Lona|29.9',
    'pilcha-infantil/alpargatas-infantis/alpargata-infantil-preta|Alpargata Infantil Preta|32.9',
    'pilcha-infantil/alpargatas-infantis/alpargata-infantil-bordada|Alpargata Infantil Bordada|38.9',
    'pilcha-infantil/alpargatas-infantis/alpargata-infantil-xadrez|Alpargata Infantil Xadrez|45.9',
    'pilcha-infantil/bombachas-infantis/bombacha-infantil-sarja|Bombacha Infantil Sarja|119.9',
    'pilcha-infantil/bombachas-infantis/bombacha-infantil-brim|Bombacha Infantil Brim|133.9',
    'pilcha-infantil/bombachas-infantis/bombacha-infantil-xadrez|Bombacha Infantil Xadrez|155.9',
    'pilcha-infantil/bombachas-infantis/bombacha-infantil-campeira|Bombacha Infantil Campeira|185.9',
    'pilcha-infantil/botas-infantis/bota-infantil-couro|Bota Infantil Couro|199.9',
    'pilcha-infantil/botas-infantis/bota-infantil-cano-curto|Bota Infantil Cano Curto|223.9',
    'pilcha-infantil/botas-infantis/bota-infantil-gaucha|Bota Infantil Gaúcha|259.9',
    'pilcha-infantil/botas-infantis/bota-infantil-com-elastico|Bota Infantil com Elástico|309.9',
    'pilcha-infantil/camisetas-e-camisas-infantis/camiseta-infantil-cuia|Camiseta Infantil Cuia|59.9',
    'pilcha-infantil/camisetas-e-camisas-infantis/camiseta-infantil-brasao|Camiseta Infantil Brasão|66.9',
    'pilcha-infantil/camisetas-e-camisas-infantis/camisa-infantil-xadrez|Camisa Infantil Xadrez|77.9',
    'pilcha-infantil/camisetas-e-camisas-infantis/camisa-infantil-manga-longa|Camisa Infantil Manga Longa|92.9',
    'pilcha-infantil/chapeus-e-boinas/chapeu-infantil-aba-media|Chapéu Infantil Aba Média|69.9',
    'pilcha-infantil/chapeus-e-boinas/chapeu-infantil-preto|Chapéu Infantil Preto|77.9',
    'pilcha-infantil/chapeus-e-boinas/boina-infantil-preta|Boina Infantil Preta|90.9',
    'pilcha-infantil/chapeus-e-boinas/boina-infantil-xadrez|Boina Infantil Xadrez|107.9',
    'pilcha-infantil/faixas-de-cintura/faixa-infantil-vermelha|Faixa Infantil Vermelha|29.9',
    'pilcha-infantil/faixas-de-cintura/faixa-infantil-preta|Faixa Infantil Preta|32.9',
    'pilcha-infantil/faixas-de-cintura/faixa-infantil-bordada|Faixa Infantil Bordada|38.9',
    'pilcha-infantil/faixas-de-cintura/faixa-infantil-xadrez|Faixa Infantil Xadrez|45.9',
    'pilcha-infantil/guaiacas-e-cintos/guaiaca-infantil-couro|Guaiaca Infantil Couro|79.9',
    'pilcha-infantil/guaiacas-e-cintos/guaiaca-infantil-dupla-fivela|Guaiaca Infantil Dupla Fivela|88.9',
    'pilcha-infantil/guaiacas-e-cintos/cinto-infantil-com-tachas|Cinto Infantil com Tachas|103.9',
    'pilcha-infantil/guaiacas-e-cintos/cinto-infantil-simples|Cinto Infantil Simples|123.9',
    'pilcha-infantil/jaquetas-e-coletes/colete-infantil-brim|Colete Infantil Brim|139.9',
    'pilcha-infantil/jaquetas-e-coletes/colete-infantil-xadrez|Colete Infantil Xadrez|156.9',
    'pilcha-infantil/jaquetas-e-coletes/jaqueta-infantil-sarja|Jaqueta Infantil Sarja|181.9',
    'pilcha-infantil/jaquetas-e-coletes/jaqueta-infantil-forrada|Jaqueta Infantil Forrada|216.9',
    'pilcha-infantil/lencos/lenco-infantil-vermelho|Lenço Infantil Vermelho|19.9',
    'pilcha-infantil/lencos/lenco-infantil-branco|Lenço Infantil Branco|21.9',
    'pilcha-infantil/lencos/lenco-infantil-estampado|Lenço Infantil Estampado|25.9',
    'pilcha-infantil/lencos/lenco-infantil-xadrez|Lenço Infantil Xadrez|30.9',
    'pilcha-infantil/ponchos-e-palas-infantis/poncho-infantil-de-la|Poncho Infantil de Lã|129.9',
    'pilcha-infantil/ponchos-e-palas-infantis/pala-infantil-xadrez|Pala Infantil Xadrez|144.9',
    'pilcha-infantil/ponchos-e-palas-infantis/poncho-infantil-bordado|Poncho Infantil Bordado|168.9',
    'pilcha-infantil/ponchos-e-palas-infantis/pala-infantil-lisa|Pala Infantil Lisa|200.9',
    'pilcha-infantil/saias-infantis/saia-infantil-prenda|Saia Infantil Prenda|99.9',
    'pilcha-infantil/saias-infantis/saia-infantil-xadrez|Saia Infantil Xadrez|111.9',
    'pilcha-infantil/saias-infantis/saia-infantil-com-babados|Saia Infantil com Babados|129.9',
    'pilcha-infantil/saias-infantis/saia-infantil-rodada|Saia Infantil Rodada|154.9',
    'pilcha-infantil/vestidos-infantis/vestido-de-prenda-infantil-classico|Vestido de Prenda Infantil Clássico|219.9',
    'pilcha-infantil/vestidos-infantis/vestido-de-prenda-infantil-bordado|Vestido de Prenda Infantil Bordado|245.9',
    'pilcha-infantil/vestidos-infantis/vestido-de-prenda-infantil-xadrez|Vestido de Prenda Infantil Xadrez|285.9',
    'pilcha-infantil/vestidos-infantis/vestido-de-prenda-mirim|Vestido de Prenda Mirim|340.9',
    'chapelaria/chapeus-cury/chapeu-cury-aba-larga|Chapéu Cury Aba Larga|289.9',
    'chapelaria/chapeus-cury/chapeu-cury-aba-media|Chapéu Cury Aba Média|324.9',
    'chapelaria/chapeus-cury/chapeu-cury-pelo-de-lebre|Chapéu Cury Pelo de Lebre|376.9',
    'chapelaria/chapeus-cury/chapeu-cury-campeiro|Chapéu Cury Campeiro|448.9',
    'chapelaria/chapeus-lagomarsino/chapeu-lagomarsino-classico|Chapéu Lagomarsino Clássico|319.9',
    'chapelaria/chapeus-lagomarsino/chapeu-lagomarsino-aba-larga|Chapéu Lagomarsino Aba Larga|357.9',
    'chapelaria/chapeus-lagomarsino/chapeu-lagomarsino-preto-fosco|Chapéu Lagomarsino Preto Fosco|415.9',
    'chapelaria/chapeus-lagomarsino/chapeu-lagomarsino-campeiro|Chapéu Lagomarsino Campeiro|495.9',
    'chapelaria/chapeus-marcatto/chapeu-marcatto-classico|Chapéu Marcatto Clássico|279.9',
    'chapelaria/chapeus-marcatto/chapeu-marcatto-aba-larga|Chapéu Marcatto Aba Larga|312.9',
    'chapelaria/chapeus-marcatto/chapeu-marcatto-palha|Chapéu Marcatto Palha|363.9',
    'chapelaria/chapeus-marcatto/chapeu-marcatto-feltro|Chapéu Marcatto Feltro|433.9',
    'chapelaria/chapeus-pralana/chapeu-pralana-classico|Chapéu Pralana Clássico|259.9',
    'chapelaria/chapeus-pralana/chapeu-pralana-aba-curta|Chapéu Pralana Aba Curta|290.9',
    'chapelaria/chapeus-pralana/chapeu-pralana-feltro-preto|Chapéu Pralana Feltro Preto|337.9',
    'chapelaria/chapeus-pralana/chapeu-pralana-campeiro|Chapéu Pralana Campeiro|402.9',
    'chapelaria/chapeus-rio-branco/chapeu-rio-branco-classico|Chapéu Rio Branco Clássico|299.9',
    'chapelaria/chapeus-rio-branco/chapeu-rio-branco-aba-larga|Chapéu Rio Branco Aba Larga|335.9',
    'chapelaria/chapeus-rio-branco/chapeu-rio-branco-palha|Chapéu Rio Branco Palha|389.9',
    'chapelaria/chapeus-rio-branco/chapeu-rio-branco-feltro-cinza|Chapéu Rio Branco Feltro Cinza|464.9',
    'chapelaria/bones/bone-brasao-rs|Boné Brasão RS|49.9',
    'chapelaria/bones/bone-trucker-gaucho|Boné Trucker Gaúcho|55.9',
    'chapelaria/bones/bone-aba-curva-bordado|Boné Aba Curva Bordado|64.9',
    'chapelaria/bones/bone-de-lona|Boné de Lona|76.9',
    'chapelaria/boinas/boina-preta-tradicional|Boina Preta Tradicional|59.9',
    'chapelaria/boinas/boina-xadrez|Boina Xadrez|66.9',
    'chapelaria/boinas/boina-de-la-branca|Boina de Lã Branca|77.9',
    'chapelaria/boinas/boina-bordada|Boina Bordada|92.9',
    'chapelaria/barbicachos-e-vinchas/barbicacho-de-couro|Barbicacho de Couro|34.9',
    'chapelaria/barbicachos-e-vinchas/barbicacho-trancado|Barbicacho Trançado|38.9',
    'chapelaria/barbicachos-e-vinchas/vincha-bordada|Vincha Bordada|44.9',
    'chapelaria/barbicachos-e-vinchas/vincha-de-la|Vincha de Lã|53.9',
    'chapelaria/palas-ponchos-e-capas/pala-de-la|Pala de Lã|249.9',
    'chapelaria/palas-ponchos-e-capas/poncho-pampa|Poncho Pampa|279.9',
    'chapelaria/palas-ponchos-e-capas/capa-de-la-tradicional|Capa de Lã Tradicional|324.9',
    'chapelaria/palas-ponchos-e-capas/poncho-xadrez|Poncho Xadrez|386.9',
    'chimarrao/bombas/bomba-inox-curva|Bomba Inox Curva|34.9',
    'chimarrao/bombas/bomba-inox-reta|Bomba Inox Reta|38.9',
    'chimarrao/bombas/bomba-mil-furos|Bomba Mil Furos|44.9',
    'chimarrao/bombas/bomba-desmontavel|Bomba Desmontável|53.9',
    'chimarrao/cevadores/cevador-chapa-inox|Cevador Chapa Inox|29.9',
    'chimarrao/cevadores/cevador-aluminio|Cevador Alumínio|32.9',
    'chimarrao/cevadores/cevador-bambu|Cevador Bambu|38.9',
    'chimarrao/cevadores/cevador-plastico-reforcado|Cevador Plástico Reforçado|45.9',
    'chimarrao/cuias/cuia-de-porongo-natural|Cuia de Porongo Natural|49.9',
    'chimarrao/cuias/cuia-de-porongo-pintada|Cuia de Porongo Pintada|55.9',
    'chimarrao/cuias/cuia-de-madeira|Cuia de Madeira|64.9',
    'chimarrao/cuias/cuia-de-ceramica|Cuia de Cerâmica|76.9',
    'chimarrao/cuias-e-bombas-de-ouro-e-prata/cuia-prateada|Cuia Prateada|449.9',
    'chimarrao/cuias-e-bombas-de-ouro-e-prata/cuia-dourada|Cuia Dourada|503.9',
    'chimarrao/cuias-e-bombas-de-ouro-e-prata/bomba-prata-lavrada|Bomba Prata Lavrada|584.9',
    'chimarrao/cuias-e-bombas-de-ouro-e-prata/bomba-banhada-a-ouro|Bomba Banhada a Ouro|696.9',
    'chimarrao/enfeites-de-chimarrao/enfeite-brasao|Enfeite Brasão|19.9',
    'chimarrao/enfeites-de-chimarrao/enfeite-boia|Enfeite Boia|21.9',
    'chimarrao/enfeites-de-chimarrao/enfeite-pingente-coracao|Enfeite Pingente Coração|25.9',
    'chimarrao/enfeites-de-chimarrao/enfeite-pingente-chaleira|Enfeite Pingente Chaleira|30.9',
    'chimarrao/erva-mate/erva-mate-tradicional-1kg|Erva-Mate Tradicional 1kg|22.9',
    'chimarrao/erva-mate/erva-mate-extra-forte-1kg|Erva-Mate Extra Forte 1kg|25.9',
    'chimarrao/erva-mate/erva-mate-suave-1kg|Erva-Mate Suave 1kg|29.9',
    'chimarrao/erva-mate/erva-mate-organica-500g|Erva-Mate Orgânica 500g|34.9',
    'chimarrao/mateiras/mateira-de-couro|Mateira de Couro|119.9',
    'chimarrao/mateiras/mateira-de-lona|Mateira de Lona|133.9',
    'chimarrao/mateiras/mateira-termica-3-pecas|Mateira Térmica 3 Peças|155.9',
    'chimarrao/mateiras/mateira-bolsa-grande|Mateira Bolsa Grande|185.9',
    'chimarrao/porta-cuias/porta-cuia-de-couro|Porta Cuia de Couro|39.9',
    'chimarrao/porta-cuias/porta-cuia-de-madeira|Porta Cuia de Madeira|44.9',
    'chimarrao/porta-cuias/porta-cuia-inox|Porta Cuia Inox|51.9',
    'chimarrao/porta-cuias/porta-cuia-de-mesa|Porta Cuia de Mesa|61.9',
    'chimarrao/porta-ervas/porta-erva-inox|Porta Erva Inox|29.9',
    'chimarrao/porta-ervas/porta-erva-plastico|Porta Erva Plástico|32.9',
    'chimarrao/porta-ervas/porta-erva-madeira|Porta Erva Madeira|38.9',
    'chimarrao/porta-ervas/porta-erva-dosador|Porta Erva Dosador|45.9',
    'chimarrao/termicas/garrafa-termica-1l|Garrafa Térmica 1L|149.9',
    'chimarrao/termicas/garrafa-termica-1-8l|Garrafa Térmica 1,8L|167.9',
    'chimarrao/termicas/garrafa-termica-pressao|Garrafa Térmica Pressão|194.9',
    'chimarrao/termicas/garrafa-termica-capa-de-couro|Garrafa Térmica Capa de Couro|231.9',
    'chimarrao/terere/guampa-para-terere|Guampa para Tereré|54.9',
    'chimarrao/terere/kit-terere-completo|Kit Tereré Completo|60.9',
    'chimarrao/terere/bomba-para-terere|Bomba para Tereré|70.9',
    'chimarrao/terere/garrafa-termica-terere|Garrafa Térmica Tereré|84.9',
    'churrasco/acendedores/acendedor-eletrico|Acendedor Elétrico|24.9',
    'churrasco/acendedores/acendedor-de-pastilhas|Acendedor de Pastilhas|27.9',
    'churrasco/acendedores/acendedor-em-gel|Acendedor em Gel|31.9',
    'churrasco/acendedores/acendedor-a-gas|Acendedor a Gás|38.9',
    'churrasco/afiadores/chaira-de-aco-30cm|Chaira de Aço 30cm|39.9',
    'churrasco/afiadores/chaira-diamantada|Chaira Diamantada|44.9',
    'churrasco/afiadores/pedra-de-afiar-dupla|Pedra de Afiar Dupla|51.9',
    'churrasco/afiadores/afiador-de-ceramica|Afiador de Cerâmica|61.9',
    'churrasco/aventais/avental-de-couro|Avental de Couro|59.9',
    'churrasco/aventais/avental-de-lona|Avental de Lona|66.9',
    'churrasco/aventais/avental-brim-com-bolso|Avental Brim com Bolso|77.9',
    'churrasco/aventais/avental-xadrez|Avental Xadrez|92.9',
    'churrasco/bifeiras/bifeira-inox-pequena|Bifeira Inox Pequena|79.9',
    'churrasco/bifeiras/bifeira-inox-grande|Bifeira Inox Grande|88.9',
    'churrasco/bifeiras/bifeira-de-madeira|Bifeira de Madeira|103.9',
    'churrasco/bifeiras/bifeira-esmaltada|Bifeira Esmaltada|123.9',
    'churrasco/copos/copo-americano-brasao|Copo Americano Brasão|34.9',
    'churrasco/copos/copo-de-chopp|Copo de Chopp|38.9',
    'churrasco/copos/copo-de-aluminio|Copo de Alumínio|44.9',
    'churrasco/copos/copo-inox-termico|Copo Inox Térmico|53.9',
    'churrasco/espetos/espeto-simples-inox|Espeto Simples Inox|89.9',
    'churrasco/espetos/espeto-duplo|Espeto Duplo|100.9',
    'churrasco/espetos/espeto-corrido-para-carne|Espeto Corrido para Carne|116.9',
    'churrasco/espetos/espeto-cabo-de-madeira|Espeto Cabo de Madeira|138.9',
    'churrasco/farinheiras/farinheira-de-madeira|Farinheira de Madeira|29.9',
    'churrasco/farinheiras/farinheira-inox|Farinheira Inox|32.9',
    'churrasco/farinheiras/farinheira-de-couro|Farinheira de Couro|38.9',
    'churrasco/farinheiras/farinheira-de-ceramica|Farinheira de Cerâmica|45.9',
    'churrasco/grelhas/grelha-parrilla|Grelha Parrilla|129.9',
    'churrasco/grelhas/grelha-inox|Grelha Inox|144.9',
    'churrasco/grelhas/grelha-dupla|Grelha Dupla|168.9',
    'churrasco/grelhas/grelha-quadrada-de-ferro|Grelha Quadrada de Ferro|200.9',
    'churrasco/porta-espetos/porta-espetos-de-mesa|Porta Espetos de Mesa|99.9',
    'churrasco/porta-espetos/porta-espetos-de-parede|Porta Espetos de Parede|111.9',
    'churrasco/porta-espetos/porta-espetos-de-madeira|Porta Espetos de Madeira|129.9',
    'churrasco/porta-espetos/porta-espetos-inox|Porta Espetos Inox|154.9',
    'churrasco/tabuas/tabua-de-madeira|Tábua de Madeira|119.9',
    'churrasco/tabuas/tabua-de-bambu|Tábua de Bambu|133.9',
    'churrasco/tabuas/tabua-com-cabo|Tábua com Cabo|155.9',
    'churrasco/tabuas/tabua-grande-para-mesa|Tábua Grande para Mesa|185.9',
    'selaria/badanas/badana-pelego-de-la|Badana Pelego de Lã|69.9',
    'selaria/badanas/badana-sintetica|Badana Sintética|77.9',
    'selaria/badanas/badana-couro-natural|Badana Couro Natural|90.9',
    'selaria/badanas/badana-dupla-face|Badana Dupla Face|107.9',
    'selaria/barrigueiras/barrigueira-de-couro|Barrigueira de Couro|99.9',
    'selaria/barrigueiras/barrigueira-de-la|Barrigueira de Lã|111.9',
    'selaria/barrigueiras/barrigueira-de-nylon|Barrigueira de Nylon|129.9',
    'selaria/barrigueiras/barrigueira-com-argola|Barrigueira com Argola|154.9',
    'selaria/bastos/basto-de-madeira|Basto de Madeira|139.9',
    'selaria/bastos/basto-recoberto|Basto Recoberto|156.9',
    'selaria/bastos/basto-reforcado|Basto Reforçado|181.9',
    'selaria/bastos/basto-campeiro|Basto Campeiro|216.9',
    'selaria/bucais/bucal-de-couro|Buçal de Couro|59.9',
    'selaria/bucais/bucal-de-nylon|Buçal de Nylon|66.9',
    'selaria/bucais/bucal-trancado|Buçal Trançado|77.9',
    'selaria/bucais/bucal-bordado|Buçal Bordado|92.9',
    'selaria/capas-de-cavalo/capa-de-cavalo-impermeavel|Capa de Cavalo Impermeável|149.9',
    'selaria/capas-de-cavalo/capa-de-cavalo-de-la|Capa de Cavalo de Lã|167.9',
    'selaria/capas-de-cavalo/capa-de-cavalo-de-algodao|Capa de Cavalo de Algodão|194.9',
    'selaria/capas-de-cavalo/capa-de-cavalo-termica|Capa de Cavalo Térmica|231.9',
    'selaria/esporas/espora-inox|Espora Inox|119.9',
    'selaria/esporas/espora-com-rosetas|Espora com Rosetas|133.9',
    'selaria/esporas/espora-prateada|Espora Prateada|155.9',
    'selaria/esporas/espora-campeira|Espora Campeira|185.9',
    'selaria/freios/freio-campeiro|Freio Campeiro|129.9',
    'selaria/freios/freio-boca-larga|Freio Boca Larga|144.9',
    'selaria/freios/freio-inox|Freio Inox|168.9',
    'selaria/freios/freio-bridao-inox|Freio Bridão Inox|200.9',
    'selaria/lacos/laco-de-couro-cru|Laço de Couro Cru|79.9',
    'selaria/lacos/laco-trancado|Laço Trançado|88.9',
    'selaria/lacos/laco-de-nylon|Laço de Nylon|103.9',
    'selaria/lacos/laco-pialo|Laço Pialo|123.9',
    'selaria/malas-de-garupa/mala-de-garupa-de-couro|Mala de Garupa de Couro|189.9',
    'selaria/malas-de-garupa/mala-de-garupa-de-lona|Mala de Garupa de Lona|212.9',
    'selaria/malas-de-garupa/mala-de-garupa-pequena|Mala de Garupa Pequena|246.9',
    'selaria/malas-de-garupa/mala-de-garupa-grande-reforcada|Mala de Garupa Grande Reforçada|293.9',
    'selaria/peiteiras/peiteira-de-couro|Peiteira de Couro|89.9',
    'selaria/peiteiras/peiteira-de-la|Peiteira de Lã|100.9',
    'selaria/peiteiras/peiteira-de-nylon|Peiteira de Nylon|116.9',
    'selaria/peiteiras/peiteira-trancada|Peiteira Trançada|138.9',
    'selaria/pelegos/pelego-de-ovelha-natural|Pelego de Ovelha Natural|159.9',
    'selaria/pelegos/pelego-branco|Pelego Branco|178.9',
    'selaria/pelegos/pelego-preto|Pelego Preto|207.9',
    'selaria/pelegos/pelego-tingido-verde|Pelego Tingido Verde|247.9',
    'selaria/redeas-e-cabecadas/redea-de-couro|Rédea de Couro|109.9',
    'selaria/redeas-e-cabecadas/redea-trancada|Rédea Trançada|122.9',
    'selaria/redeas-e-cabecadas/cabecada-de-couro|Cabeçada de Couro|142.9',
    'selaria/redeas-e-cabecadas/cabecada-bordada|Cabeçada Bordada|169.9',
    'selaria/selas/sela-gaucha-tradicional|Sela Gaúcha Tradicional|1299.9',
    'selaria/selas/sela-campeira|Sela Campeira|1455.9',
    'selaria/selas/sela-argentina|Sela Argentina|1689.9',
    'selaria/selas/sela-de-passeio|Sela de Passeio|2014.9',
    'selaria/sinchas-e-sobre-sinchas/sincha-de-couro|Sincha de Couro|169.9',
    'selaria/sinchas-e-sobre-sinchas/sincha-de-la|Sincha de Lã|189.9',
    'selaria/sinchas-e-sobre-sinchas/sobre-sincha-de-couro|Sobre-sincha de Couro|220.9',
    'selaria/sinchas-e-sobre-sinchas/sobre-sincha-de-la|Sobre-sincha de Lã|262.9',
    'selaria/tentos-e-correias-de-esporas/tento-de-couro-cru|Tento de Couro Cru|39.9',
    'selaria/tentos-e-correias-de-esporas/correia-de-espora-de-couro|Correia de Espora de Couro|44.9',
    'selaria/tentos-e-correias-de-esporas/correia-de-espora-bordada|Correia de Espora Bordada|51.9',
    'selaria/tentos-e-correias-de-esporas/tento-trancado|Tento Trançado|61.9',
    'selaria/xergoes/xergao-de-la|Xergão de Lã|119.9',
    'selaria/xergoes/xergao-de-la-xadrez|Xergão de Lã Xadrez|133.9',
    'selaria/xergoes/xergao-de-algodao|Xergão de Algodão|155.9',
    'selaria/xergoes/xergao-reforcado|Xergão Reforçado|185.9'
];


/* ==========================================================
   Busca com sugestões (campo "O que você procura?")
   ========================================================== */

var campoBusca = document.getElementById('campoBusca');
var btnBusca = document.getElementById('btnBusca');
var caixaBusca = null;   // caixa com as sugestões (criada logo abaixo)
var achados = [];        // produtos sugeridos neste momento

// Tira acento e maiúscula: "Chiripá" vira "chiripa"
function semAcento(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Cada palavra digitada precisa ser o começo de alguma palavra do produto
// Ex.: "bo" acha "Bota" e "Bombacha"; "botas" também acha "Bota"
function procurarProdutos(digitado) {
    var busca = semAcento(digitado.trim());
    if (busca.length < 2) { return []; }
    var palavrasBusca = busca.split(' ');
    var lista = [];
    for (var i = 0; i < PRODUTOS.length; i++) {
        var partes = PRODUTOS[i].split('|');                  // [pasta, nome, preço]
        var texto = semAcento(partes[1] + ' ' + partes[0].replace(/[\/-]/g, ' '));
        var palavrasProduto = texto.split(' ');
        var combina = true;
        for (var p = 0; p < palavrasBusca.length; p++) {
            var palavra = palavrasBusca[p];
            if (palavra.length > 3 && palavra.slice(-1) === 's') {
                palavra = palavra.slice(0, -1);               // "botas" vira "bota"
            }
            var achou = false;
            for (var q = 0; q < palavrasProduto.length; q++) {
                if (palavrasProduto[q].indexOf(palavra) === 0) { achou = true; }
            }
            if (!achou) { combina = false; }
        }
        if (combina) {
            lista.push({ pasta: partes[0], nome: partes[1], preco: Number(partes[2]) });
        }
    }
    return lista;
}

// Frases sugeridas: começam com o que foi digitado e completam mais uma palavra
// Ex.: "bota" -> "Bota Couro", "Bota Campeira", "Bota Infantil"
function procurarTermos(digitado) {
    var digitadas = semAcento(digitado.trim()).split(' ');
    for (var d = 0; d < digitadas.length; d++) {
        if (digitadas[d].length > 3 && digitadas[d].slice(-1) === 's') {
            digitadas[d] = digitadas[d].slice(0, -1);             // "botas" vira "bota"
        }
    }
    var n = digitadas.length;       // quantas palavras a pessoa digitou
    var contagem = {};              // frase -> quantos produtos têm essa frase
    var frases = [];

    for (var i = 0; i < PRODUTOS.length; i++) {
        var palavrasNome = PRODUTOS[i].split('|')[1].split(' ');
        for (var inicio = 0; inicio < palavrasNome.length; inicio++) {
            // as palavras do nome, a partir de "inicio", começam com o que foi digitado?
            var combina = true;
            for (var j = 0; j < n; j++) {
                var palavra = palavrasNome[inicio + j];
                if (palavra === undefined || semAcento(palavra).indexOf(digitadas[j]) !== 0) {
                    combina = false;
                    break;
                }
            }
            if (!combina) { continue; }

            // frase = o que foi digitado + mais uma palavra ("de", "com" não contam)
            var fim = inicio + n + 1;
            while (fim < palavrasNome.length && palavrasNome[fim - 1].length <= 3) {
                fim++;
            }
            var frase = palavrasNome.slice(inicio, fim).join(' ');
            if (contagem[frase] === undefined) {
                contagem[frase] = 0;
                frases.push(frase);
            }
            contagem[frase]++;
        }
    }

    // As frases mais comuns vêm primeiro (e não repete o que já está digitado)
    frases.sort(function (a, b) { return contagem[b] - contagem[a] || a.length - b.length; });
    var termos = [];
    for (var k = 0; k < frases.length && termos.length < 5; k++) {
        if (semAcento(frases[k]) !== semAcento(digitado.trim())) {
            termos.push(frases[k]);
        }
    }
    return termos;
}

// Endereço da página do produto: pasta/subpasta/arquivo -> pages/pasta/subpasta.html#arquivo
function linkProduto(pasta) {
    var p = pasta.split('/');
    return raiz + 'pages/' + p[0] + '/' + p[1] + '.html#' + p[2];
}

// Desenha a caixa de sugestões
function mostrarSugestoes() {
    achados = procurarProdutos(campoBusca.value);
    if (achados.length === 0) {
        caixaBusca.style.display = 'none';
        return;
    }
    var html = '<ul class="listaTermos">';
    var termos = procurarTermos(campoBusca.value);
    for (var t = 0; t < termos.length; t++) {
        html += '<li class="termoSug">' + limpar(termos[t]) + '</li>';
    }
    html += '</ul><p class="tituloSugestoes">Produtos sugeridos</p><div class="gradeSugestoes">';
    for (var i = 0; i < achados.length && i < 5; i++) {
        var a = achados[i];
        html += '<a class="produtoSug" href="' + linkProduto(a.pasta) + '">' +
            '<img src="' + raiz + 'img/produtos/' + a.pasta + '.jpg" alt="' + limpar(a.nome) + '" />' +
            '<span>' + limpar(a.nome) + '</span>' +
            '<strong>' + dinheiro(a.preco) + '</strong></a>';
    }
    caixaBusca.innerHTML = html + '</div>';
    caixaBusca.style.display = 'block';
}

// Vai para o primeiro produto da lista (Enter ou botão Buscar)
function irParaPrimeiro() {
    if (achados.length > 0) {
        window.location.href = linkProduto(achados[0].pasta);
    }
}

if (campoBusca && btnBusca) {
    // cria a caixa logo abaixo do campo
    var pBusca = document.getElementById('pBuscaMeio');
    caixaBusca = document.createElement('div');
    caixaBusca.id = 'caixaSugestoes';
    pBusca.appendChild(caixaBusca);

    campoBusca.setAttribute('autocomplete', 'off');
    campoBusca.addEventListener('input', mostrarSugestoes);
    campoBusca.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { irParaPrimeiro(); }
        if (e.key === 'Escape') { caixaBusca.style.display = 'none'; }
    });
    btnBusca.addEventListener('click', irParaPrimeiro);

    // clicar numa palavra sugerida completa o campo
    caixaBusca.addEventListener('click', function (e) {
        if (e.target.className === 'termoSug') {
            campoBusca.value = e.target.textContent;
            mostrarSugestoes();
            campoBusca.focus();
        }
    });
    // clicar fora fecha a caixa
    document.addEventListener('click', function (e) {
        if (!pBusca.contains(e.target)) { caixaBusca.style.display = 'none'; }
    });
}

// Desenhos (ícones) do cabeçalho: usam a cor do texto (currentColor)
var ICONE_USUARIO = '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4.2"/><path d="M3.8 21c0-4.6 3.7-7.4 8.2-7.4s8.2 2.8 8.2 7.4"/></svg>';
var ICONE_SACOLA = '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>';

// Mostra "Minha conta / Acessar" (ou "Olá, Nome / Minha conta" quando está logado)
function atualizarCabecalhoConta() {
    var usuario = usuarioAtual();
    var primeiroNome = usuario ? usuario.nome.split(' ')[0] : '';
    var links = document.querySelectorAll('.linkContaTxt');
    for (var i = 0; i < links.length; i++) {
        if (links[i].closest('#pLinksDir')) {
            // link do cabeçalho: ícone + dois textos
            links[i].innerHTML = '<span class="iconeCabecalho">' + ICONE_USUARIO + '</span>' +
                '<span class="contaTextos"><small>' + (usuario ? 'Olá, ' + limpar(primeiroNome) : 'Minha conta') + '</small>' +
                '<strong>' + (usuario ? 'Minha conta' : 'Acessar') + '</strong></span>';
        } else {
            // link do rodapé: só texto
            links[i].textContent = usuario ? 'Olá, ' + primeiroNome : 'Minha conta';
        }
    }
}

// Troca "Carrinho (0)" pelo ícone de sacola com o número em uma bolinha
function montarCarrinhoCabecalho() {
    var contador = document.getElementById('contadorCarrinho');
    if (!contador) { return; }
    var link = contador.parentNode;
    link.className = 'linkCarrinho';
    link.title = 'Carrinho';
    link.setAttribute('aria-label', 'Carrinho');
    link.innerHTML = '<span class="iconeCabecalho">' + ICONE_SACOLA + '</span>' +
        '<span id="contadorCarrinho">' + contador.textContent + '</span>';
}


atualizarCabecalhoConta();
montarCarrinhoCabecalho();