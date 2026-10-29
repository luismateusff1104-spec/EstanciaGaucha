/* ==========================================================
   Estância Gaúcha - conta.js
   Página "Minha conta": cadastro, login, dados e pedidos.
   Tudo fica salvo só neste navegador (simulação).
   ========================================================== */

var painelEntrar = document.getElementById('painelEntrar');
var painelConta = document.getElementById('painelConta');

function mostrarMsg(id, texto, ok) {
    var el = document.getElementById(id);
    el.textContent = texto;
    el.className = 'msg ' + (ok ? 'msgOk' : 'msgErro');
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mostra a tela certa: entrar/cadastrar ou a conta da pessoa
function desenharConta() {
    var usuario = usuarioAtual();
    if (!usuario) {
        painelEntrar.classList.remove('oculto');
        painelConta.classList.add('oculto');
        atualizarCabecalhoConta();
        return;
    }
    painelEntrar.classList.add('oculto');
    painelConta.classList.remove('oculto');

    document.getElementById('boasVindas').textContent = 'Olá, ' + usuario.nome + '! Aqui você vê seus dados, pedidos e atendimentos.';

    // Preenche o formulário de dados
    var end = usuario.endereco || {};
    document.getElementById('dNome').value = usuario.nome;
    document.getElementById('dEmail').value = usuario.email;
    document.getElementById('dTel').value = usuario.tel || '';
    document.getElementById('dCep').value = end.cep || '';
    document.getElementById('dRua').value = end.rua || '';
    document.getElementById('dNumero').value = end.numero || '';
    document.getElementById('dBairro').value = end.bairro || '';
    document.getElementById('dCidade').value = end.cidade || '';
    document.getElementById('dUf').value = end.uf || '';

    // Pedidos desta pessoa
    var pedidos = lerLista('estanciaPedidos');
    var linhas = '';
    for (var i = pedidos.length - 1; i >= 0; i--) {
        if (pedidos[i].email === usuario.email) {
            linhas += '<tr>' +
                '<td align="center">#' + limpar(pedidos[i].numero) + '</td>' +
                '<td align="center">' + limpar(pedidos[i].data) + '</td>' +
                '<td align="center">' + limpar(pedidos[i].qtd) + '</td>' +
                '<td align="center">' + limpar(pedidos[i].forma) + '</td>' +
                '<td align="center" class="preco">' + dinheiro(Number(pedidos[i].total)) + '</td>' +
                '</tr>';
        }
    }
    document.getElementById('corpoPedidos').innerHTML = linhas ||
        '<tr><td colspan="5" align="center">Você ainda não fez nenhum pedido.</td></tr>';

    // Atendimentos (SAC) desta pessoa
    var sac = lerLista('estanciaSAC');
    var linhas2 = '';
    for (var j = sac.length - 1; j >= 0; j--) {
        if (sac[j].email === usuario.email) {
            linhas2 += '<tr>' +
                '<td align="center">' + limpar(sac[j].protocolo) + '</td>' +
                '<td align="center">' + limpar(sac[j].assunto) + '</td>' +
                '<td align="center">' + limpar(sac[j].status) + '</td>' +
                '</tr>';
        }
    }
    document.getElementById('corpoAtendimentos').innerHTML = linhas2 ||
        '<tr><td colspan="3" align="center">Nenhum atendimento ainda.</td></tr>';

    atualizarCabecalhoConta();
}

// ---------- Criar conta ----------
document.getElementById('formCadastro').addEventListener('submit', function (evento) {
    evento.preventDefault();
    var nome = document.getElementById('cNome').value.trim();
    var email = document.getElementById('cEmail').value.trim().toLowerCase();
    var tel = document.getElementById('cTel').value.trim();
    var senha = document.getElementById('cSenha').value;
    var senha2 = document.getElementById('cSenha2').value;

    if (nome.length < 3) { mostrarMsg('msgCadastro', 'Digite seu nome completo.', false); return; }
    if (!emailValido(email)) { mostrarMsg('msgCadastro', 'Digite um e-mail válido.', false); return; }
    if (senha.length < 6) { mostrarMsg('msgCadastro', 'A senha precisa ter no mínimo 6 caracteres.', false); return; }
    if (senha !== senha2) { mostrarMsg('msgCadastro', 'As senhas não são iguais.', false); return; }

    var usuarios = lerLista('estanciaUsuarios');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            mostrarMsg('msgCadastro', 'Já existe uma conta com esse e-mail. Faça login.', false);
            return;
        }
    }
    usuarios.push({ nome: nome, email: email, tel: tel, senha: embaralharSenha(senha), endereco: {} });
    salvarLista('estanciaUsuarios', usuarios);
    localStorage.setItem('estanciaSessao', email);
    this.reset();
    desenharConta();
});

// ---------- Entrar ----------
document.getElementById('formLogin').addEventListener('submit', function (evento) {
    evento.preventDefault();
    var email = document.getElementById('lEmail').value.trim().toLowerCase();
    var senha = document.getElementById('lSenha').value;
    var usuarios = lerLista('estanciaUsuarios');

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email && usuarios[i].senha === embaralharSenha(senha)) {
            localStorage.setItem('estanciaSessao', email);
            this.reset();
            desenharConta();
            return;
        }
    }
    mostrarMsg('msgLogin', 'E-mail ou senha incorretos.', false);
});

// ---------- Salvar meus dados ----------
document.getElementById('formDados').addEventListener('submit', function (evento) {
    evento.preventDefault();
    var email = localStorage.getItem('estanciaSessao');
    var usuarios = lerLista('estanciaUsuarios');
    var nome = document.getElementById('dNome').value.trim();
    if (nome.length < 3) { mostrarMsg('msgDados', 'Digite seu nome completo.', false); return; }

    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            usuarios[i].nome = nome;
            usuarios[i].tel = document.getElementById('dTel').value.trim();
            usuarios[i].endereco = {
                cep: document.getElementById('dCep').value.trim(),
                rua: document.getElementById('dRua').value.trim(),
                numero: document.getElementById('dNumero').value.trim(),
                bairro: document.getElementById('dBairro').value.trim(),
                cidade: document.getElementById('dCidade').value.trim(),
                uf: document.getElementById('dUf').value.trim().toUpperCase()
            };
        }
    }
    salvarLista('estanciaUsuarios', usuarios);
    atualizarCabecalhoConta();
    mostrarMsg('msgDados', 'Dados salvos com sucesso!', true);
});

// ---------- Sair ----------
document.getElementById('btnSair').addEventListener('click', function () {
    localStorage.removeItem('estanciaSessao');
    desenharConta();
});

desenharConta();
