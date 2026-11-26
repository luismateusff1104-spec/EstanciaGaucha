/* ==========================================================
   Estância Gaúcha - sac.js
   Página "Fale conosco": envio de mensagem e consulta de protocolo.
   As mensagens ficam salvas só neste navegador (simulação).
   ========================================================== */

   function mostrarMsg(id, texto, ok) {
    var el = document.getElementById(id);
    el.innerHTML = texto;
    el.className = 'msg ' + (ok ? 'msgOk' : 'msgErro');
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Coloca o telefone no formato (DDD) 00000-0000 enquanto a pessoa digita
function mascaraTelefone(valor) {
    var n = valor.replace(/\D/g, '').slice(0, 11);     // só números, no máximo 11
    if (n.length === 0) { return ''; }
    if (n.length <= 2) { return '(' + n; }
    if (n.length <= 6) { return '(' + n.slice(0, 2) + ') ' + n.slice(2); }
    if (n.length <= 10) { return '(' + n.slice(0, 2) + ') ' + n.slice(2, 6) + '-' + n.slice(6); }
    return '(' + n.slice(0, 2) + ') ' + n.slice(2, 7) + '-' + n.slice(7);
}

var campoTel = document.getElementById('sTel');
campoTel.addEventListener('input', function () {
    campoTel.value = mascaraTelefone(campoTel.value);
});

// Mostra quantos caracteres já foram escritos na mensagem
var campoMensagem = document.getElementById('sMensagem');
campoMensagem.addEventListener('input', function () {
    document.getElementById('contaMsg').textContent = campoMensagem.value.length;
});

// Se a pessoa está logada, já preenche nome, e-mail e telefone
var usuario = usuarioAtual();
if (usuario) {
    document.getElementById('sNome').value = usuario.nome;
    document.getElementById('sEmail').value = usuario.email;
    campoTel.value = mascaraTelefone(usuario.tel || '');
}

// ---------- Enviar mensagem ----------
document.getElementById('formSac').addEventListener('submit', function (evento) {
    evento.preventDefault();
    var nome = document.getElementById('sNome').value.trim();
    var email = document.getElementById('sEmail').value.trim().toLowerCase();
    var tel = document.getElementById('sTel').value.trim();
    var assunto = document.getElementById('sAssunto').value;
    var pedido = document.getElementById('sPedido').value.trim();
    var mensagem = document.getElementById('sMensagem').value.trim();

    if (nome.length < 3) { mostrarMsg('msgSac', 'Digite seu nome.', false); return; }
    if (!emailValido(email)) { mostrarMsg('msgSac', 'Digite um e-mail válido.', false); return; }
    if (tel !== '' && tel.replace(/\D/g, '').length < 10) { mostrarMsg('msgSac', 'Telefone incompleto. Digite o DDD e o número.', false); return; }
    if (assunto === '') { mostrarMsg('msgSac', 'Escolha o assunto.', false); return; }
    if (mensagem.length < 10) { mostrarMsg('msgSac', 'Escreva sua mensagem (mínimo de 10 caracteres).', false); return; }

    var protocolo = 'SAC' + new Date().getFullYear() + Math.floor(100000 + Math.random() * 900000);
    var lista = lerLista('estanciaSAC');
    lista.push({
        protocolo: protocolo,
        nome: nome,
        email: email,
        tel: tel,
        assunto: assunto,
        pedido: pedido,
        mensagem: mensagem,
        data: new Date().toLocaleString('pt-BR'),
        status: 'Recebida - resposta em até 2 dias úteis'
    });
    salvarLista('estanciaSAC', lista);

    mostrarMsg('msgSac', 'Mensagem enviada! Seu protocolo é <b>' + protocolo + '</b>. Guarde esse número para acompanhar o atendimento.', true);
    document.getElementById('sAssunto').value = '';
    document.getElementById('sPedido').value = '';
    document.getElementById('sMensagem').value = '';
    document.getElementById('contaMsg').textContent = '0';
});

// ---------- Consultar protocolo ----------
document.getElementById('formProtocolo').addEventListener('submit', function (evento) {
    evento.preventDefault();
    var numero = document.getElementById('pProtocolo').value.trim().toUpperCase();
    var lista = lerLista('estanciaSAC');

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].protocolo === numero) {
            mostrarMsg('msgProtocolo',
                'Protocolo <b>' + limpar(lista[i].protocolo) + '</b><br />' +
                'Assunto: ' + limpar(lista[i].assunto) + '<br />' +
                'Enviado em: ' + limpar(lista[i].data) + '<br />' +
                'Situação: ' + limpar(lista[i].status), true);
            return;
        }
    }
    mostrarMsg('msgProtocolo', 'Protocolo não encontrado neste navegador. Confira o número.', false);
});