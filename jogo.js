var timerId = null; //variavel que armazena a chamada da funcao timeout

function iniciaJogo(){

	var url = window.location.search;
	
	var nivel = url.replace("?", "");

	var tempo_segundos = 0;


	
	if(nivel == 1){
		//facil - 120s
		tempo_segundos = 120;
	}

	if(nivel == 2){
		//normal - 60s
		tempo_segundos = 60;
	}

	if(nivel == 3){
		//dificil - 30s
		tempo_segundos = 30;
	}

	//inserindo segundos em span

	document.getElementById("cronometro").innerHTML = tempo_segundos;

	//quantidade de balões
	var qtd_baloes = 80;
	Cria_baloes(qtd_baloes);

	//quantidade de balões inteiros
	document.getElementById("baloes_inteiros").innerHTML = qtd_baloes;
	//quantidade de balões estourados
	document.getElementById("baloes_estourados").innerHTML = 0;

	Contagem_tempo(tempo_segundos + 1);
}


function Contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a funcao de execucao do settimeout
		Game_over();
	return false;

	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("Contagem_tempo("+segundos+")", 1000); //chama a funcao e executa em 1000ms = 1s
}

function Cria_baloes(qtd_baloes) {
	for(var i = 1; i <= qtd_baloes; i++){
		var balao = document.createElement("img");
		balao.src = "imagens/balao_azul_pequeno.png";
		balao.style.margin = "10px";
		balao.id = 'b'+i; 
		balao.onclick = function(){ estourar(this); };
		
		document.getElementById("cenario").appendChild(balao);
	}
}

function Game_over(){
	 remove_eventos_baloes();
	alert("Fim de jogo, você não conseguiu estourar todos os balões a tempo!");
}

function estourar(e){
	
	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","")
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	Pontuacao(-1);
}

function Pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	Situacao_jogo(baloes_inteiros);

}

function Situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabéns! Você conseguiu estourar todos os balões a tempo!');
		Parar_jogo();
	}
}

function Parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}