let order = [];
let clickdOrder = [];
let score = 0;
let points = document.querySelector('#points')

//0 - verde; 1 - vermelho; 2 - amarelo; 3 - azul
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

//cria ordem das cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickdOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 200);
}

//checa se os botões clicados são os mesmos da ordem gerada
let checkOrder = () => {
    for(let i in clickdOrder){
        if(clickdOrder[i] != order[i]){
            gameOver();
            return;
        }
    }
    if(clickdOrder.length == order.length){
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        score++;
        points.innerHTML = `${score}`
        setTimeout(() => {
            nextLevel();
        }, 1000)
    }
}

//Função para o clique do usuario
let click = (color) => {
    clickdOrder[clickdOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250)
}

//Função para retornar a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    }else if(color == 1){
        return red;
    }else if(color == 2){
        return yellow;
    }else if(color == 3){
        return blue;
    }
}

//Função de proximo nível
let nextLevel = () =>{
    shuffleOrder();
}

//Função para game over
let gameOver = () =>{
    alert(`Você predeu o jogo!\nSua pontuação foi: ${score}\nClique em Jogar para iniciar um novo jogo.`);
    order = [];
    clickdOrder = [];

}

//Função para iniciar o jog
let playGame = () => {
    score = 0;
    points.innerHTML = `${score}`
    nextLevel();
}

//Função de clique nas cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

