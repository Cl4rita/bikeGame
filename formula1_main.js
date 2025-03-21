let des = document.getElementById('des').getContext('2d')

let bikeModel = new Obj(225,450,50,80,'./img/beginningBikeBG.png')
let bike = new Carro(225,550,60,100,'./img/bikeNoBG_1.png')
let bg = new Carro(0,0,500,700,'./img/garden.jpeg')
let stone = new Carro2(400,-40,45,100,'./img/stoneNoBG.png')
let wood = new Carro2(200,-280,45,100,'./img/logWoodNoBG.png')

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let t4 = new Text()
let t5 = new Text()
let t6 = new Text()
let t7 = new Text()
let t8 = new Text()

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume = 0.8
motor.loop = true
batida.volume = 0.8

let jogar = true
let jogo = false
let faseAtual = 1

document.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    if(e.key === 'a'){
        bike.dir -= 5
    }else if(e.key === 'd'){
        bike.dir += 5
    }
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'a'){
        bike.dir = 0
    }else if(e.key === 'd'){
        bike.dir = 0
    }
})
document.addEventListener('keypress', (e)=>{
    if(e.key === 'g'){
        jogo = true
        // som1.play()
        // motor.pause()
    }else if(e.key === 'p'){
        bike.dir = 0
        jogo = false
        // som1.pause()
        // som2.play()
    }
})
function game_over(){
    if(bike.vida <=0){
        jogar = false
        motor.pause()
        faseAtual = 1
        // música com o jogo parado
    }
}

function pontos(){
    if(bike.point(stone)){
        bike.pts +=1
    }else if(bike.point(wood)){
        bike.pts += 1
    }
    if(bike.pts >= 10 && faseAtual === 1){
        faseAtual = 2
        alert("Fase 2!")
    }else if (bike.pts >= 30 && faseAtual === 2){
        faseAtual = 3
        alert("Fase 3!")
    }else if(bike.pts >= 50  && faseAtual === 3){
        alert("Parabéns! Completasse o jogo.")
        desenharInicio()
    }
}

function colisao(){
    if(bike.colid(stone)){
        bike.vida -= 1
        stone.recomeca()
        batida.play()
    }else if(bike.colid(wood)){
        bike.vida -= 1
        wood.recomeca()
        batida.play()
    } 
}
function desenharInicio(){
    bikeModel.draw()
    t6.des_text('Bem-vinda(o) ',125,340,'pink','46px Times')
    t6.des_text('Para mover, clique A e D ',170,250,'white','16px Times')
    t7.des_text('Evite encostar nos obstáculos ',170,400,'red','16px Times')
}
function desenha(){
    t1.des_text('Pontos: ',360,22,'pink','26px Times')
    t2.des_text(bike.pts,442,24,'red','26px Times')
    t3.des_text('Vida: ',40,24,'pink','26px Times')
    t4.des_text(bike.vida,100,24,'red','26px Times')

    if(jogar){
        bg.des_car_img()
        t1.des_text('Pontos: ',360,22,'pink','26px Times')
        t2.des_text(bike.pts,442,24,'red','26px Times')
        t3.des_text('Vida: ',40,24,'pink','26px Times')
        t4.des_text(bike.vida,100,24,'red','26px Times')
        stone.des_car_img()
        wood.des_car_img()
        bike.des_car_img()
    }else{
        t5.des_text('Game Over',140,340,'red','46px Times')
        t8.des_text('Aperte F5 e tente novamente',135,540,'pink','20px Times')
    }  
}
function atualiza(){
    if(jogar){
        motor.play()
        stone.mov_carro2()
        wood.mov_carro2()
        bike.mov_carro()
        bike.anim('bikeNoBG_')
        pontos()
        colisao()
        game_over()
    }
    if (faseAtual === 2) {
        stone.y += 7
        wood.y += 7
    } else if (faseAtual === 3) {
        stone.y += 10
        wood.y += 10
    }
}
function main(){
    if(jogo == false){
        des.clearRect(0,0,500,700)
        desenharInicio()
        requestAnimationFrame(main)
    }else if(jogo == true){
        des.clearRect(0,0,500,700)
        desenha()
        atualiza()
        requestAnimationFrame(main)
    }
}

main()