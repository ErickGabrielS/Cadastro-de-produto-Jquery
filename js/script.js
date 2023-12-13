const menu = $("#menu");
const conteudo = $("#conteudo");
const modal1 = $("#modal1");
const modal2 = $("#modal2");
const modal3 = $("#modal3");
const close1 = $("#close1");
const close2 = $("#close2");
const close3 = $("#close3");
const form1 = $("#form1");
const form2 = $("#form2");
const form3 = $("#form3");
const salvar1 = $("#salvar1");
const salvar2 = $("#salvar2");
const salvar3 = $("#salvar3");
const excluir1 = $("#excluir1");
const excluir2 = $("#excluir2");
const excluir3 = $("#excluir3");
const contentmenu = $(".contentmenu")
const login = $("#login");
const usuarioInput = $("#usuarioInput");
const senhaInput = $("#senhaInput");
const entrar = $("#entrar");
const sair = $("#sair");
const erro = $("#erro");
const usuario = "admin";
const senha = "1234";
var lista1 = [
    { nome: "Ana", email: "ana@gmail.com", telefone: "9999-9999", endereco: "Rua A, 10" },
    { nome: "Bruno", email: "bruno@hotmail.com", telefone: "8888-8888", endereco: "Rua B, 20" },
    { nome: "Carla", email: "carla@yahoo.com", telefone: "7777-7777", endereco: "Rua C, 30" },
    { nome: "Daniel", email: "daniel@outlook.com", telefone: "6666-6666", endereco: "Rua D, 40" }
];
var lista2 = [
    { nome: "Camiseta", preco: 50.00, quantidade: 10, categoria: "Vestes superior" },
    { nome: "Blusa Moletom", preco: 40.00, quantidade: 8, categoria: "Vestes superior" },
    { nome: "Calça", preco: 60.00, quantidade: 12, categoria: "Vestes inferior" },
    { nome: "Shorts", preco: 25.00, quantidade: 15, categoria: "Vestes inferior" }
];
var lista3 = [
    { nome: "Pedido 1", data: "2023-12-01", status: "Pago", valor: 100.00 },
    { nome: "Pedido 2", data: "2023-12-02", status: "Pendente", valor: 200.00 },
    { nome: "Pedido 3", data: "2023-12-03", status: "Cancelado", valor: 300.00 },
    { nome: "Pedido 4", data: "2023-12-04", status: "Entregue", valor: 400.00 }
];
$("#user").text(usuario)


function autenticar() {
    menu.css("display", "none")
    let usuarioDigitado = usuarioInput.val();
    let senhaDigitada = senhaInput.val();
    if (usuarioDigitado === usuario && senhaDigitada === senha) {
        login.css("display","none");
        menu.css("display","flex");
        menu.css("background-color","#dcdcdc")
        menu.css("justify-content","space-between")
        contentmenu.css("display","inline")
        conteudo.css("display","grid");
        $("h1").text("Selecione a Lista Desejada")
        erro.css("display","none");
    } else {
        erro.css("display","flex");
    }
}

function deslogar() {
    login.css("display","flex");
    menu.css("display","none");
    conteudo.css("display","none");
    modal1.css("display","none");
    modal2.css("display","none");
    modal3.css("display","none");
    usuarioInput.val("");
    senhaInput.val("");
}

entrar.click(function() {
    autenticar();
});

sair.click(function() {
    deslogar();
});

login.keypress(function(event) {
    if (event.which === 13) {
        autenticar();
    }
});


function listarDados(lista, modal) {

    conteudo.empty();
    
    let tabela = $("<table></table>");
    
    let cabecalho = $("<tr></tr>");
    for (let chave in lista[0]) {
        let celula = $("<th></th>").text(chave);
        cabecalho.append(celula);
    }
    tabela.append(cabecalho);
    for (let objeto of lista) {
        let linha = $("<tr></tr>");
        for (let chave in objeto) {
            let celula = $("<td></td>").text(objeto[chave]);
            linha.append(celula);
        }
        linha.click(function() {
            abrirModal(objeto, modal);
        });
        tabela.append(linha);
    }
    conteudo.append(tabela);
}

function abrirModal(objeto, modal) {
    let form = modal.find("form");
    for (let chave in objeto) {
        form.find("#" + chave).val(objeto[chave]);
    }
    modal.css("display", "grid");
}

function fecharModal(modal) {
    let Modal = $(modal);
    Modal.css("display", "none")
}

$(".close").on("click", function() {
    fecharModal();
});

$("#lista1").click(function() {
    listarDados(lista1, modal1);
});

$("#lista2").click(function() {
    listarDados(lista2, modal2);
});

$("#lista3").click(function() {
    listarDados(lista3, modal3);
});

close1.click(function() {
    fecharModal(modal1);
});

close2.click(function() {
    fecharModal(modal2);
});

close3.click(function() {
    fecharModal(modal3);
});

function criarDados(lista, modal) {
    let form = modal.find("form");
    let objeto = {};
    for (let chave in lista[0]) {
        objeto[chave] = form.find("#" + chave).val();
    }
    lista.push(objeto);
    fecharModal(modal);
    listarDados(lista, modal);
}

function editarDados(lista, modal) {
    let form = modal.find("form");
    let objeto = lista.find(item => item.nome === form.find("#nome").val());
    for (let chave in objeto) {
        objeto[chave] = form.find("#" + chave).val();
    }
    fecharModal(modal);
    listarDados(lista, modal);
}

function excluirDados(lista, modal) {
    let form = modal.find("form");
    let indice = lista.findIndex(item => item.nome === form.find("#nome").val());
    lista.splice(indice, 1);
    fecharModal(modal);
    listarDados(lista, modal);
}

salvar1.click(function(event) {
    event.preventDefault();
    if (form1.find("#nome").val() === "") {
        criarDados(lista1, modal1);
    } else {
        editarDados(lista1, modal1);
    }
});

salvar2.click(function(event) {
    event.preventDefault();
    if (form2.find("#nome").val() === "" ) {
        criarDados(lista2, modal2);
    } else {
        editarDados(lista2, modal2);
    }
});

salvar3.click(function(event) {
    event.preventDefault();
    if (form3.find("#nome").val() === "") {
        criarDados(lista3, modal3);
    } else {
        editarDados(lista3, modal3);
    }
});

excluir1.click(function() {
    excluirDados(lista1, modal1);
});

excluir2.click(function() {
    excluirDados(lista2, modal2);
});

excluir3.click(function() {
    excluirDados(lista3, modal3);
});

