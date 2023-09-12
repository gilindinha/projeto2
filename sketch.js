//aqui estou criando e configurando a bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 17;
let raio = diametro/2;

//aqui estou criando e configurando minha raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//aqui estou criando a raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponenente;

//aqui estou configurando a velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variavel de verificação de colisão da biblioteca
let colidiu = false;

//variaveis de pontos criação do placar
let meusPontos=0;
let pontosDoOponente=0;

//variaveis sons do jogo inserir sons no jogo
let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = (loadSound("trilha.mp3"));
  ponto = (loadSound("ponto.mp3"));
  raquetada = (loadSound("raquetada.mp3"));
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0, 0, 0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  
  function mostraBolinha() {
    fill("whrite");
    circle(xBolinha, yBolinha, diametro);
  }
  
  function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
  }
  
  function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
      velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeYBolinha *= -1;
    }
  }
  function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
  }


  function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW) && yRaquete >= 0) {
      yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW) && yRaquete <= 310) {
      yRaquete += 10;
    }
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete (x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
  
  
function movimentaRaqueteOponente(){
  if (keyIsDown("87") && yRaqueteOponente >= 0) {
      yRaqueteOponente -= 10;
    }
    if (keyIsDown("83") && yRaqueteOponente <= 310) {
      yRaqueteOponente += 10;
    }
}

function incluirPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
  
}
//implementado mais não funcionou
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 10
    }
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}