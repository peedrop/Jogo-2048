$("#cadastro").validate({

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
            minlength: "Usuário deve conter no mínimo 5 caracteres*"
        },

        senha: {
            required: "Esse campo deve ser preenchido*",
            minlength: "Senha deve conter no mínimo 8 caracteres*"
        },

    }

});

function irlogin() {
    window.location.href = "html/Login.html"
}


function armazenar() {
	
	pessoas = JSON.parse(localStorage.getItem('pessoasSession'))
	
		if (pessoas == null){
			var pessoas = new Array();
		}
	
	localStorage.setItem('pessoasSession', JSON.stringify(pessoas));
	
	var pessoa = new Object();
	
	pessoa.usuario = document.getElementById('usuario').value;
	pessoa.senha = document.getElementById('senha').value;
		
	

    if (pessoa.usuario != '' && pessoa.usuario.length >= 5 && pessoa.senha != '' && pessoa.senha.length >= 8) {

        pessoas = JSON.parse(localStorage.getItem('pessoasSession'));

        pessoas.push(pessoa)

        localStorage.setItem('pessoasSession', JSON.stringify(pessoas));

        document.getElementById('usuario').value = "";

        document.getElementById('senha').value = "";

        window.location.href = "html/2048.html"

    }

}
