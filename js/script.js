var canvas = document.getElementById('canvas'); // variavel no id canvas
var ctx = canvas.getContext('2d');
var tamanhoinicial = document.getElementById('tamanho');
var mudartamanho = document.getElementById('mudar-tamanho');
var pontuacaolabel = document.getElementById('pontuacao');
var pontuacao = 0;
var pontuacao_total = 0;
var tamanho = 4;
var largura = canvas.width / tamanho - 6;
var cells = [];
var fontSize;
var perder = false;
var total_seg;
var total_min;
var cronometro;
var modal_gameover = document.querySelector('#modal_gameover')
console.log(perder)
comecar();

function jogarnovamente(){
    window.location.href = "../html/2048.html"
}
function irranking(){
	window.location.href = "../ranking/tabelaPessoa.html"
}

mudartamanho.onclick = function () {
    if (tamanhoinicial.value >= 2 && tamanhoinicial.value <= 20) {
        tamanho = tamanhoinicial.value;
        largura = canvas.width / tamanho - 6;
        console.log(tamanhoinicial.value); // imprimir tamanho inicial
        canvasClean();
        comecar();
    }
}

function cell(linha, coluna) {
    this.value = 0;
    this.x = coluna * largura + 5 * (coluna + 1);
    this.y = linha * largura + 5 * (linha + 1);
}

function createCells() {
    var i, j;
    for (i = 0; i < tamanho; i++) {
        cells[i] = [];
        for (j = 0; j < tamanho; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
}

function desenhar_cedula(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, largura, largura);
    switch (cell.value) {
        case 0:
            ctx.fillStyle = '#A9A9A9';
            break;
        case 2:
            ctx.fillStyle = '#D2691E';
            break;
        case 4:
            ctx.fillStyle = '#FF7F50';
            break;
        case 8:
            ctx.fillStyle = '#ffbf00';
            break;
        case 16:
            ctx.fillStyle = '#bfff00';
            break;
        case 32:
            ctx.fillStyle = '#40ff00';
            break;
        case 64:
            ctx.fillStyle = '#00bfff';
            break;
        case 128:
            ctx.fillStyle = '#FF7F50';
            break;
        case 256:
            ctx.fillStyle = '#0040ff';
            break;
        case 512:
            ctx.fillStyle = '#ff0080';
            break;
        case 1024:
            ctx.fillStyle = '#D2691E';
            break;
        case 2048:
            ctx.fillStyle = '#FF7F50';
            break;
        case 4096:
            ctx.fillStyle = '#ffbf00';
            break;
        default:
            ctx.fillStyle = '#ff0080';
    }
    ctx.fill();
    if (cell.value) {
        fontSize = largura / 2;
        ctx.font = fontSize + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(cell.value, cell.x + largura / 2, cell.y + largura / 2 + largura / 7);
    }
}

function canvasClean() {
    ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
    if (!perder) {
        if (event.keyCode === 38 || event.keyCode === 87) {
            mover_cima();
        } else if (event.keyCode === 39 || event.keyCode === 68) {
            moveDireita();
        } else if (event.keyCode === 40 || event.keyCode === 83) {
            movebaixo();
        } else if (event.keyCode === 37 || event.keyCode === 65) {
            moveEsquerda();
        }
        pontuacaolabel.innerHTML = pontuacao;
    }
}

function comecar() {
    createCells();
    desenhar_todas_cedulas();
    unircedulas();
	unircedulas();
    pontuacaolabel.innerHTML = '0';
    segundos = 0;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");
	console.log(perder)

	cronometro = setInterval(function () {
		if(perder == false){
			segundos++;
			seg = segundos;
			min = 0;
			while (seg >= 60) {
				min++;
				seg -= 60;
			}
			if (min<10) m.innerHTML = "0" + min;
			else m.innerHTML = min;
			if (seg<10) s.innerHTML = "0" + seg;
			else s.innerHTML = seg;
			
			total_seg = seg;
			total_min = min;
		}
		
	}, 1000);
}
function salvarDados(){
	
	pontuacao_total = pontuacao;
	
	var dadoscadastro = new Array();

    dadoscadastro = JSON.parse(localStorage.getItem('pessoasSession'));
	
	 for (var i = 0; i < dadoscadastro.length; i++) {
       usuario = dadoscadastro[i].usuario;
    }
	
	dados = JSON.parse(localStorage.getItem('dadosjogo'))
	
		if (dados == null){
			var dados = new Array();
		}
	
	localStorage.setItem('dadosjogo', JSON.stringify(dados));
	
	var dado = new Object();
	
	dado.usuario = usuario;
	dado.pontuacao = pontuacao_total;
	dado.total_min = total_min;
    dado.total_seg = total_seg;
	
    dados = JSON.parse(localStorage.getItem('dadosjogo'));

    dados.push(dado)

    localStorage.setItem('dadosjogo', JSON.stringify(dados));


	}

function gameover() {
    canvas.style.opacity = '0.5'; // ficar transparente
    perder = true;
	console.log(perder)
    modal_gameover.style.zIndex = 10;
	salvarDados();
}

function desenhar_todas_cedulas() {
    var i, j;
    for (i = 0; i < tamanho; i++) {
        for (j = 0; j < tamanho; j++) {
            desenhar_cedula(cells[i][j]);
        }
    }
}

function unircedulas() {
    var countFree = 0;
    var i, j;
    for (i = 0; i < tamanho; i++) {
        for (j = 0; j < tamanho; j++) {
            if (!cells[i][j].value) {
                countFree++;
            }
        }
    }
    if (!countFree) {
        gameover();
        return;
    }
    while (true) {
        var linha = Math.floor(Math.random() * tamanho);
        var coluna = Math.floor(Math.random() * tamanho);
        if (!cells[linha][coluna].value) {
            cells[linha][coluna].value = 2 * Math.ceil(Math.random() * 2);
            desenhar_todas_cedulas();
            return;
        }
    }
}

function moveDireita() {
    var i, j;
    var coluna;
    for (i = 0; i < tamanho; i++) {
        for (j = tamanho - 2; j >= 0; j--) {
            if (cells[i][j].value) {
                coluna = j;
                while (coluna + 1 < tamanho) {
                    if (!cells[i][coluna + 1].value) {
                        cells[i][coluna + 1].value = cells[i][coluna].value;
                        cells[i][coluna].value = 0;
                        coluna++;
                    } else if (cells[i][coluna].value == cells[i][coluna + 1].value) {
                        cells[i][coluna + 1].value *= 2;
                        pontuacao += cells[i][coluna + 1].value;
                        cells[i][coluna].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    unircedulas();
}

function moveEsquerda() {
    var i, j;
    var coluna;
    for (i = 0; i < tamanho; i++) {
        for (j = 1; j < tamanho; j++) {
            if (cells[i][j].value) {
                coluna = j;
                while (coluna - 1 >= 0) {
                    if (!cells[i][coluna - 1].value) {
                        cells[i][coluna - 1].value = cells[i][coluna].value;
                        cells[i][coluna].value = 0;
                        coluna--;
                    } else if (cells[i][coluna].value == cells[i][coluna - 1].value) {
                        cells[i][coluna - 1].value *= 2;
                        pontuacao += cells[i][coluna - 1].value;
                        cells[i][coluna].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    unircedulas();
}

function mover_cima() {
    var i, j, linha;
    for (j = 0; j < tamanho; j++) {
        for (i = 1; i < tamanho; i++) {
            if (cells[i][j].value) {
                linha = i;
                while (linha > 0) {
                    if (!cells[linha - 1][j].value) {
                        cells[linha - 1][j].value = cells[linha][j].value;
                        cells[linha][j].value = 0;
                        linha--;
                    } else if (cells[linha][j].value == cells[linha - 1][j].value) {
                        cells[linha - 1][j].value *= 2;
                        pontuacao += cells[linha - 1][j].value;
                        cells[linha][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    unircedulas();
}

function movebaixo() {
    var i, j, linha;
    for (j = 0; j < tamanho; j++) {
        for (i = tamanho - 2; i >= 0; i--) {
            if (cells[i][j].value) {
                linha = i;
                while (linha + 1 < tamanho) {
                    if (!cells[linha + 1][j].value) {
                        cells[linha + 1][j].value = cells[linha][j].value;
                        cells[linha][j].value = 0;
                        linha++;
                    } else if (cells[linha][j].value == cells[linha + 1][j].value) {
                        cells[linha + 1][j].value *= 2;
                        pontuacao += cells[linha + 1][j].value;
                        cells[linha][j].value = 0;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    unircedulas();
}
