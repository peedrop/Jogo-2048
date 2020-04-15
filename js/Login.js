function ircadastro() {
    $(location).attr('href', '../index.html');
}

function validar() {

    var pessoas = new Array();

    pessoas = JSON.parse(localStorage.getItem('pessoasSession'));

    var pessoa = new Object();

    pessoa.usuario = document.getElementById('usuario').value;

    pessoa.senha = document.getElementById('senha').value;

    var teste = false;

    for (var i = 0; i < pessoas.length; i++) {
        if ((pessoas[i].usuario == pessoa.usuario) && (pessoas[i].senha == pessoa.senha)) {
            teste = true;
        }
    }

    if (teste == true) {
        $(location).attr('href', '2048.html');
    } else {
        alert("Usuário ou senha incorretos*")
    }

}


$("#login").validate({

    rules: {
        usuario: {
            required: true,
            minlength: 5
        },

        senha: {
            required: true,
            minlength: 8
        },

    },

    messages: {

        usuario: {
            required: "Esse campo deve ser preenchido*",
            minlength: "Usuário incorreto*"
        },

        senha: {
            required: "Esse campo deve ser preenchido*",
            minlength: "Senha incorreta*"
        }

    },

    submitHandler: validar
});
