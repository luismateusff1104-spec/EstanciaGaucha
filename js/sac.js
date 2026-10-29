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

// Se a pessoa está logada, já preenche nome, e-mail e telefone
var usuario = usuarioAtual();
if (usuario) {
    document.getElementById('sNome').value = usuario.nome;
    document.getElementById('sEmail').value = usuario.email;
    document.getElementById('sTel').value = usuario.tel || '';
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
