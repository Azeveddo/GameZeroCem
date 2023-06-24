let palpites = [];
let jogadorAtual = 1;
let numeroAlvo;
let ultimosPalpites = [];

document.addEventListener('DOMContentLoaded', function() {
  const gridNumeros = document.getElementById('gridNumeros');

  for (let i = 1; i <= 100; i++) {
    const numero = document.createElement('div');
    numero.className = 'rounded-lg text-center h-8 w-8 my-3 bg-white hover:bg-red-500';
    numero.innerText = i;
    numero.id = i;
    numero.addEventListener('click', lidarPalpite);
    gridNumeros.appendChild(numero);
  }
});

function lidarPalpite(event){
  const modoGame = document.getElementById('modoGame'); 
  const palpite = parseInt(event.target.textContent);
  modoGame.innerText = "De o seu palpite!";
  

  if(palpites.includes(palpite)){
    alert("Esse número ta fora, BEBA!");
    reiniciarJogo();
    return;
  }
  palpites.push(palpite);

  if(jogadorAtual === 1) {
    numeroAlvo = palpite;
    jogadorAtual++;
  }
  else {
    if(palpite < numeroAlvo){
      desabilitarNumerosAntes(palpite);
    }
    else if(palpite > numeroAlvo){
      desabilitarNumerosDepois(palpite);
    }
    else{
      desabilitarPalpites();
      setTimeout(() => {
        alert("ACERTOUUUU MISERAVI!!!!!!!");
        reiniciarJogo();
      }, 600);
    }
    if (ultimosPalpites[0] === numeroAlvo - 1 && ultimosPalpites[1] === numeroAlvo + 1) {
      desabilitarPalpites();
      setTimeout(() => {
        alert("NÚMERO FOI IMPRENSADO!");
        reiniciarJogo();
      }, 600);
    }
    
    jogadorAtual++;
  }
}

function desabilitarNumerosAntes(palpite){
  const numeros = document.querySelectorAll('#gridNumeros div');
  numeros.forEach((numeroElemento) => {
    const numero = parseInt(numeroElemento.textContent);
    if(numero <= palpite){
      numeroElemento.removeEventListener('click', lidarPalpite); 
      numeroElemento.className = 'rounded-lg text-center h-8 w-8 my-3 bg-red-500';
      ultimosPalpites[0] = palpite; 
    }
  });
}

function desabilitarNumerosDepois(palpite){
  const numeros = document.querySelectorAll('#gridNumeros div');
  numeros.forEach((numeroElemento) =>{
    const numero = parseInt(numeroElemento.textContent);
    if(numero >= palpite){
      numeroElemento.removeEventListener('click', lidarPalpite);
      numeroElemento.className = 'rounded-lg text-center h-8 w-8 my-3 bg-red-500';
      ultimosPalpites[1] = palpite;
    }
  })
}

function desabilitarPalpites(){
  const numeros = document.querySelectorAll('#gridNumeros div');
  numeros.forEach((numeroElemento) => {
    numeroElemento.removeEventListener('click', lidarPalpite);
  });
}

function reiniciarJogo() {
  palpites = [];
  jogadorAtual = 1;
  numeroAlvo = null;
  ultimosPalpites = [];

  const numeros = document.querySelectorAll('#gridNumeros div');
  numeros.forEach((numeroElemento) => {
    numeroElemento.addEventListener('click', lidarPalpite);
    numeroElemento.className = 'rounded-lg text-center h-8 w-8 my-3 bg-white hover:bg-red-500';
  });
}
