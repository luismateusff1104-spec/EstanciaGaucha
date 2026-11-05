/* ==========================================================
   Estância Gaúcha - destaques.js
   Carrossel dos "Produtos em destaque" (página inicial):
   passa sozinho de tempos em tempos e tem setas para voltar/avançar.
   ========================================================== */

   var janela = document.getElementById('janelaCarrossel');
   var trilho = document.getElementById('trilhoCarrossel');
   
   if (janela && trilho) {
   
       var cards = trilho.children;      // os cards de produto
       var indice = 0;                   // posição atual (0 = primeiro card)
       var temporizador;                 // guarda o "relógio" do automático
       var TEMPO = 3000;                 // tempo entre cada passada (3 segundos)
   
       // Calcula quanto o trilho anda por vez e até onde pode ir
       function medidas() {
           var passo = janela.offsetWidth;                        // plano B: 1 card por vez
           if (cards.length > 1) {
               passo = cards[1].offsetLeft - cards[0].offsetLeft; // distância de um card ao próximo
           }
           var visiveis = Math.max(1, Math.round(janela.offsetWidth / passo));
           var maximo = Math.max(0, cards.length - visiveis);
           return { passo: passo, maximo: maximo };
       }
   
       // Move o trilho para o card de número "novo"
       function irPara(novo) {
           var m = medidas();
           if (novo > m.maximo) { novo = 0; }          // passou do fim: volta ao começo
           if (novo < 0) { novo = m.maximo; }          // passou do começo: vai para o fim
           indice = novo;
           trilho.style.transform = 'translateX(-' + (indice * m.passo) + 'px)';
       }
   
       function proximo()  { irPara(indice + 1); }
       function anterior() { irPara(indice - 1); }
   
       // Liga e desliga a passada automática
       function parar()   { clearInterval(temporizador); }
       function iniciar() { parar(); temporizador = setInterval(proximo, TEMPO); }
   
       // Setas
       document.getElementById('setaDir').addEventListener('click', function () {
           proximo();
           iniciar();   // reinicia a contagem depois do clique
       });
       document.getElementById('setaEsq').addEventListener('click', function () {
           anterior();
           iniciar();
       });
   
       // Com o mouse em cima, o carrossel para (para a pessoa conseguir clicar)
       document.getElementById('carrossel').addEventListener('mouseenter', parar);
       document.getElementById('carrossel').addEventListener('mouseleave', iniciar);
   
       // Se a tela mudar de tamanho, ajusta a posição
       window.addEventListener('resize', function () {
           irPara(indice);
       });
   
       iniciar();
   }